import Title from "../../layout/Title";
import Input from "../../form/Input";
import styles from '../../form/form.module.css'
import { useEffect, useState } from "react";
import SubmitButton from "../../form/SubmitButton";
import TextArea from "../../form/TextArea";
import Select from "../../form/Select";
import axios from "axios";
import { useAuth } from "../../../hooks/useAuth";
import { useNavigate } from "react-router-dom";



function TicketAdd() {
    const {user} = useAuth();

    const [data, setData] = useState([]);
    const [to, setTo] = useState([]);

    const navigate = useNavigate();

    useEffect(()=>{
        axios.get(`http://localhost:3001/to/${user}`)
        .then((response)=>{
            //console.log(response)
            setTo(response.data)
        })
        .catch((err)=>console.log(err))
    },[])
    
    function handlechange(e){
        setData({...data, [e.target.name]: e.target.value})
    }
    
    const handleSubmit = (e) =>{
        e.preventDefault();
        //chama funcao 
        axios.post('http://localhost:3001/ticket/', {
            title:data.title,
            description:data.description,
            to:data.to,
            token: user,
            
        })
        .then((response)=>{
            if (response.data.msg=='Inserido com sucesso!'){
                alert('Ticket Cadastrado com sucesso!');
                navigate('/tickets');
            }else{
                //mensagem de inserido com sucesso!
                alert('Algo deu errado! Tente novamente');
                //navigate para pagina de listar usuarios
               
                
            }
            
        })
        .catch((err)=>console.log(err))
    }

    //console.log(data)
    
    return ( 
        <>
        <Title Title="New ticket"/>
        <div className={styles.div_form}>
            <form onSubmit={handleSubmit}>
                <Input text='Title' type='text' name='title' placeholder='title of ticket' handleOnChange={handlechange}/>

                <TextArea text='Description' type='text' name='description' placeholder='Description of ticket' handleOnChange={handlechange}/>
                <Select text='to' name='to' placeholder='Select who will answer' handleOnChange={handlechange} options={to} />

                
                <SubmitButton text='Create User'/>
            </form>
        </div>
        </>
     );
}

export default TicketAdd;