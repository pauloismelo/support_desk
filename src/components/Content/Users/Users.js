import Title from '../../layout/Title';
import styles from './Users.module.css'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { FaPencil } from "react-icons/fa6";
import { Link, useNavigate } from 'react-router-dom';
import IconRemove from '../../form/IconRemove';

function Users() {

    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    
    
    function RemoveUser(id){
        axios.delete(`http://localhost:3001/user/${id}`)
        .then((response)=>{
            setUsers(users.filter((item) => item.id !== id))
            //Chamar mensagem
            alert('Usuario removido com sucesso!');
            navigate('/users');
        })
        .catch((err)=> console.log(err))
    }
    

    useEffect(()=>{
        axios.get('http://localhost:3001/users/')
        .then((response)=>{
            setUsers(response.data)
        })
        .catch((err)=> console.log())
    },[])


    return ( 
    <>
        <Title Title='Users' btnText='Create New' btnLink='/Users/add'/>

        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Register</th>
                    <th>Edit</th>
                    <th>Remove</th>
                </tr>
            </thead>
            {users.length>0 ? (
                <tbody>
                {
                users.map((value)=>(
                
                    <tr key={value.id}>
                        <td>{value.name}</td>
                        <td>{value.email}</td>
                        <td>{value.date_reg}</td>
                        <td>
                            <Link to={`/user/edit/${value.id}`}>
                                <FaPencil />
                            </Link>
                        </td>
                        <td>
                            <IconRemove id={value.id} handleRemove={RemoveUser}/>
                        </td>
                    </tr>
                
                ))}
                </tbody>
            )
            :
            <tbody>
                <tr>
                    <td colSpan='5'>No users find!</td>
                </tr>
            </tbody>}
            
        </table>
        
    </> );
}

export default Users;