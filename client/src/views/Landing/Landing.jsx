import styles from './Landing.module.css';
import { Link } from 'react-router-dom'
const Landing = () =>{
    return (

        <div className={styles.container}>   
        <Link to="/home"> {/* Utiliza Link para redirigir al usuario a /home */}
          <button className={styles.button}>INGRESAR</button>
        </Link>
      </div>

    );

}

export default Landing;