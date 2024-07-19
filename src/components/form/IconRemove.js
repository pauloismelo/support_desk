import { FaRegTrashCan } from "react-icons/fa6";
import styles from './form.module.css'

function IconRemove({id, handleRemove}) {
    
    const remove = (e) =>{
        e.preventDefault()

        handleRemove(id)
    }
    
    
    return ( 
        <div className={styles.div_icon}>
            <FaRegTrashCan onClick={remove} />   
        </div>
        
     );
}

export default IconRemove;