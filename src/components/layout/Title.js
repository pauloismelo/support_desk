import { Link } from 'react-router-dom';
import styles from './Title.module.css'

function Title({Title, btnText, btnLink}) {
    return (  
        
        <>
        <div className={styles.title_container}>
            <h1>{Title}</h1>
            {btnText ? (
                <Link to={btnLink}>
                <button>{btnText}</button>
                </Link>
            ) : ''}
        </div>
        <hr/>
        </>
    );
}

export default Title;