import { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import Input from '../form/Input';
import SubmitButton from '../form/SubmitButton';
import styles from './Login.module.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
    
    const [user, setUser] = useState([]);
    const navigate = useNavigate();

    const { login } = useAuth();

    function handlechange(e) {
        setUser({...user,[e.target.name] : e.target.value});
    }

    const handleSubmit = async (e)=>{
        e.preventDefault();

        try {
            axios.post(`http://localhost:3001/login`,user)
            .then(async (response)=> {
                //console.log(response)
                if (response.data.token){
                    const TokenUser = response.data.token;
                    //console.log(TokenUser)
                    await login( TokenUser );
                    alert('Usuario logado com sucesso!');
                    navigate('/');
                }else{
                    alert('Conta nao encontrada.\nTente novamente!');
                }
                
            })
            .catch((err) => console.log(err));
        } catch (error) {
            
        }
    }


    return ( 
        <div className={styles.login_container}>
            <form onSubmit={handleSubmit} className={styles.quadro_login}>
                <Input text='Email' type='email' name='email' placeholder='Insert your email' handleOnChange={handlechange}/>
                <Input text='Password' type='password' name='password' placeholder='Insert your password' handleOnChange={handlechange}/>

                <SubmitButton text='Entrar'/>
            </form>
        </div>
     );
}

export default Login;