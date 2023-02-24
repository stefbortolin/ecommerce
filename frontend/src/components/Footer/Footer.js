import './Footer.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faInstagram, faTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons'



export default function Footer () {
 
    return (
      <footer className="pie-pagina">
        <FontAwesomeIcon icon="fa-solid fa-ghost" />
        <div className="grupo-1">
            <div className="box">
                <figure>
                    <a href="#">
                      <h3 className="title-footer">ECOMMERCE</h3>
                    </a>
                </figure>
            </div>
            <div className="box">
                <h2>SOBRE NOSOTROS</h2>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio, ipsa?</p>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio, ipsa?</p>
            </div>
            <div className="box">
                <h2>SEGUINOS</h2>
                <div className="red-social">
                    <a href="#"><FontAwesomeIcon icon={faFacebook} /></a>
                    <a href="#"><FontAwesomeIcon icon={faInstagram} /></a>
                    <a href="#"><FontAwesomeIcon icon={faTwitter} /></a>
                    <a href="#"><FontAwesomeIcon icon={faYoutube} /></a>
                </div>
            </div>
        </div>
        <div className="grupo-2">
            <small>&copy; 2023 <b>Ecommerce</b> - Todos los Derechos Reservados.</small>
        </div>
    </footer>
    )
}
