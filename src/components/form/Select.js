import styles from './form.module.css'

function Select({text, name, placeholder, value, handleOnChange, options}) {
    return ( 
        <div className={styles.form_control}>
        <label htmlFor={name}>{text}:</label>
        <select name={name} id={name} onChange={handleOnChange} required value={value}>
            <option value="" key="0">{placeholder}</option>
            {options!=null ?
            options.map((option)=>(
                <option value={option.id} key={option.id} >{option.name}</option>
            ))
            : ''}

        
        </select>
    
        </div>
        );
}

export default Select;