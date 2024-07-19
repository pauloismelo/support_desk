import { useEffect, useState } from "react";
import Title from "../../layout/Title";
import axios from "axios";
import { useAuth } from "../../../hooks/useAuth";
import IconRemove from "../../form/IconRemove";
import { FaMagnifyingGlass } from "react-icons/fa6";

import { useNavigate } from "react-router-dom";

import PopUp from "../../form/PopUp";

function Tickets() {
    
    const {user} = useAuth();
    const [tickets, setTickets] = useState([]);
    const navigate = useNavigate()

    useEffect(()=>{
        axios.get(`http://localhost:3001/tickets/${user}`)
        .then((response)=>{
            //console.log(response.data)
            setTickets(response.data)
        })
        .catch(
            (err)=> console.log(err)
        )
    })

    function RemoveTicket(id){
        axios.delete(`http://localhost:3001/tickets/${id}`)
        .then((response)=>{
            setTickets(tickets.filter((item) => item.id !== id))
            //Chamar mensagem
            alert('Ticket removido com sucesso!');
            navigate('/tickets');
        })
        .catch((err)=> console.log(err))
    }
    
    return ( 
    
        <>
        <Title Title="Tickets" btnText='Create New' btnLink='/tickets/add'/>
        <table>
            <thead>
                <tr>
                    <th>Title</th>
                    <th>From</th>
                    <th>To</th>
                    <th>Register</th>
                    <th>View</th>
                    <th>Remove</th>
                </tr>
            </thead>
            {tickets.length>0 ? (
                <tbody>
                {
                tickets.map((value)=>(
                
                    <tr key={value.id}>
                        <td>{value.title}</td>
                        <td>{value.from_person}</td>
                        <td>{value.to_person}</td>
                        <td>{value.date_reg}</td>
                        <td>
                            <PopUp btn={<FaMagnifyingGlass/>} id={value.id}/>
                            
                        </td>
                        <td>
                            <IconRemove id={value.id} handleRemove={RemoveTicket}/>
                        </td>
                    </tr>
                
                ))}
                </tbody>
            )
            :
            <tbody>
                <tr>
                    <td colSpan='6'>No tickets find!</td>
                </tr>
            </tbody>}
            
        </table>
    </> );
}

export default Tickets;