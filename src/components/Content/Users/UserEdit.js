
import Input from '../../form/Input';
import SubmitButton from '../../form/SubmitButton';
import Title from '../../layout/Title';
import styles from '../../form/form.module.css'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function UserEdit() {
    
    const [user, setUser] = useState([]);
    const navigate = useNavigate();

    const {id} = useParams()

    useEffect(()=>{
        axios.get(`http://localhost:3001/user/${id}`)
        .then((response)=>{
           
            setUser(response.data)
        })
        .catch((err)=>console.log(err))
    },[])

    function handlechange(e) {
        setUser({...user,[e.target.name] : e.target.value});
    }

    const handleSubmit = (e) => {
        e.preventDefault();
       // console.log(user);

        axios.put(`http://localhost:3001/user/${id}`, {
            name:user.name,
            email:user.email,
        })
        .then((response)=>{
            //mensagem de inserido com sucesso!
            console.log(response.data.msg)
            if(response.data.msg=="Atualizado com sucesso!"){
                alert('Atualizado com sucesso!');
                navigate('/users');
            }
            //navigate para pagina de listar usuarios
            //navigate('/users');
        })
        .catch((err)=>console.log(err))
    }
    
    //console.log(user)

    return (  
        <>
        <Title Title='Editar Usuario'/>
        <div className={styles.div_form}>
        <form onSubmit={handleSubmit}>
            <Input text='Nome' type='text' name='name' handleOnChange={handlechange} value={user.name}/>
            <Input text='Email' type='email' name='email' handleOnChange={handlechange} value={user.email}/>

            <SubmitButton text='Editar'/>
        </form>
        </div>
        </>
    );
}

export default UserEdit
