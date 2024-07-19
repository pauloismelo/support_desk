
import Title from '../layout/Title';
import styles from './Home.module.css'
import imghome from '../../img/home.jpg'

function Home() {
    
    return ( 
        
        <>
        <Title Title='Home'/>
        <div className={styles.home_img}>
            <img src={imghome}/>
        </div>
        
        </>
     );
}

export default Home;