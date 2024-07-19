import styles from './form.module.css'

function TextArea({text, type, name, placeholder, value, handleOnChange}) {
    return ( 
        <div className={styles.form_control}>
        <label htmlFor={name}>{text}:</label>
        <textarea name={name} id={name} placeholder={placeholder} onChange={handleOnChange} rows="5">
            {value}
        </textarea>
        </div>
        );
}

export default TextArea;