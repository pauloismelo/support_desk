
import Input from '../../form/Input';
import SubmitButton from '../../form/SubmitButton';
import Title from '../../layout/Title';
import styles from '../../form/form.module.css'
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '../../../hooks/useAuth';

function UserAdd() {
    
    const {user_token} = useAuth();

    const [user, setUser] = useState([]);
    const navigate = useNavigate();


    //console.log(token)
    function handlechange(e) {
        setUser({...user,[e.target.name] : e.target.value});
    }

    const handleSubmit = (e) => {
        e.preventDefault();
       // console.log(user);

        axios.post('http://localhost:3001/user/', {
            name:user.name,
            email:user.email,
            password:user.password,
            token: user_token,
            
        })
        .then((response)=>{
            if (response.data.msg=='Email utilizado!'){
                alert('Esse email ja foi utilizado!\nTente novamente.');
            }else{
                //mensagem de inserido com sucesso!
                alert('Usuario cadastrado com sucesso!');
                //navigate para pagina de listar usuarios
                navigate('/users');
            }
            
        })
        .catch((err)=>console.log(err))
    }
    

    return (  
        <>
        <Title Title='Adicionar Usuario'/>
        <div className={styles.div_form}>
        <form onSubmit={handleSubmit}>
            <Input text='Nome' type='text' name='name' placeholder='Insira o seu nome' handleOnChange={handlechange}/>
            <Input text='Email' type='email' name='email' placeholder='Insira o seu email' handleOnChange={handlechange}/>
            <Input text='Senha' type='password' name='password' placeholder='Insira a sua senha' handleOnChange={handlechange}/>

            <SubmitButton text='Create User'/>
        </form>
        </div>
        </>
    );
}

export default UserAdd
