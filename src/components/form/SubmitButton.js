import styles from './form.module.css'

function SubmitButton({text}) {
    return ( 
        <div className={styles.form_control}>
            <button type="submit">
                {text}
            </button>
        </div>
     );
}

export default SubmitButton;