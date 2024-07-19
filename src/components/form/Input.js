import styles from './form.module.css'

function Input({text, type, name, placeholder, value, handleOnChange}) {
    return ( 
        <div className={styles.form_control}>
        <label htmlFor={name}>{text}:</label>
        <input type={type} name={name} id={name} placeholder={placeholder}  value={value} onChange={handleOnChange} />
        </div>
        );
}

export default Input;