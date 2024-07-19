import styles from './header.module.css'
import logo from './../../img/logo.png'
import { useAuth } from '../../hooks/useAuth';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

import axios from 'axios';
import { use } from 'bcrypt/promises';


function Header() {
    const { logout } = useAuth();
    const {user} = useAuth();
    const [userName, setUserName] = useState();

    useEffect(()=>{
        axios.get(`http://localhost:3001/userlogged/${user}`)
        .then( (response)=>{
            setUserName(response.data[0].name)
        })
        .catch((err)=> console.log())
    },[])
    
    const handleLogout = () => {
        logout();
    };
    
    //console.log(user)
    return (  
        <div className={styles.header_container}>
            <img src={logo}/>
            {(user!=null) ?
            <div className={styles.menu}>
                <div className={styles.item}>
                    <Link to="/">Home</Link>
                </div>
                <div className={styles.item}>
                    <Link to="/users">Users</Link>
                </div>
                <div className={styles.item}>
                    <Link to="/tickets">Tickets</Link>
                </div>
                <div className={styles.user}>{userName}</div>
                <div className={styles.logoff} onClick={handleLogout}>
                    Sair
                </div>
            </div>
            : ''}
            
           
        </div>
    );
}

export default Header;