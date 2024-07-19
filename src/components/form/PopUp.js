import { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

function PopUp({btn, id}) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [ticket, setTicket] = useState();
    const [messages, setmessages] = useState([]);

    const [to, setTo] = useState();
    const [from, setFrom] = useState();

    
    useEffect(()=>{
        axios.get(`http://localhost:3001/ticket/${id}`)
        .then( async (response) => {
            //console.log(response.data)
            await setTicket(response.data)
        }).catch((err) => console.log(err))

    },[])    
    
    
    console.log('ticket: ',ticket)

    return ( 
        
        <>
        
        <Button variant="primary" onClick={handleShow}>
            {btn}
        </Button>
        {ticket ? (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
            <Modal.Title>{ticket.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <small>Created in {ticket.date_reg} for {ticket.to}</small>
                <h6>From: {ticket.from}</h6>
                <h6>To: {ticket.to}</h6>
                <h6>
                    <label>Description</label>
                    <p>{ticket.description}</p>
                </h6>
                
                <hr></hr>
                
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
                Close
            </Button>
            <Button variant="primary" onClick={handleClose}>
                Save Changes
            </Button>
            </Modal.Footer>
        </Modal>
        ) : '' }
        </>
        
     );
}

export default PopUp;