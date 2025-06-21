import "../Css/footer.css";
import logo from "../assets/logo1.png";

export const Footer = () => {
  return (
	<footer className="footer-medicenter">
	<div className="footer-medicenter__container">
	  <div className="footer-medicenter__column">
		<h2 className="footer-medicenter__title">
		  <img 
			src={logo} 
			height="30" 
			alt="Logo Hospital San Pablo" 
			style={{ 
			  marginRight: "8px",
			  filter: "brightness(0) invert(1)"
			}} 
		  />
		  Hospital San Pablo
		</h2>
		<p className="footer-medicenter__text">
		  Brindando atención médica de calidad con más de 20 años de experiencia. Tu salud es nuestra prioridad.
		</p>
		<p className="footer-medicenter__certification">
		  <i className="fas fa-shield-alt"></i> Certificado ISO 9001
		</p>
		<p className="footer-medicenter__certification">
		  <i className="fas fa-map-marker-alt"></i> Acreditación Nacional
		</p>
	  </div>

	  <div className="footer-medicenter__column">
		<h3 className="footer-medicenter__subtitle">Servicios</h3>
		<ul>
		  <li>Consulta General</li>
		  <li>Especialidades</li>
		  <li>Emergencias 24/7</li>
		  <li>Laboratorio</li>
		  <li>Diagnóstico por Imágenes</li>
		</ul>
	  </div>

	  <div className="footer-medicenter__column">
		<h3 className="footer-medicenter__subtitle">Información</h3>
		<ul>
		  <li>Horarios de Atención</li>
		  <li>Nuestros Profesionales</li>
		  <li>Obras Sociales</li>
		  <li>Solicitar Turno</li>
		  <li>Contacto</li>
		</ul>
	  </div>

	  <div className="footer-medicenter__column">
		<h3 className="footer-medicenter__subtitle">Desarrolladores</h3>
		<ul>
		  <li><a target="_blank" href="https://github.com/FacundoJoaquinGil"><i className="fab fa-github"></i> Joaquin Gil</a></li>
		  <li><a href="#"><i className="fab fa-github"></i> Franco Cornejo</a></li>
		  <li><a href="#"><i className="fab fa-github"></i> Matias Bordenave</a></li>
		  <li><a target="_blank" href="https://github.com/Enzogz98"><i className="fab fa-github"></i> Enzo Gonzalez</a></li>
		</ul>
	  </div>
	</div>

	<div className="footer-medicenter__bottom">
	  <p>© 2024 Hospital San Pablo. Todos los derechos reservados.</p>
	  <div className="footer-medicenter__links">
		<a href="#">Política de Privacidad</a>
		<a href="#">Términos de Uso</a>
	  </div>
	</div>
  </footer>
);
};

export default Footer;
