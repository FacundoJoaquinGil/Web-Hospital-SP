import Carousel from "react-bootstrap/Carousel";
import Button from "react-bootstrap/Button";
import hospital1 from "../assets/hospsanp1.jpeg";
import capsnsdp from "../assets/capsNuestraSraDelPilar.jpg";
import capsvdr from "../assets/CapsVillaDelRosario.jpg";

import "../Css/carousel.css";

export const Carrousel = () => {
  return (
    <div className="carousel-section">
      <Carousel className="hero-carousel" fade interval={2000}>
        <Carousel.Item>
          <div className="carousel-image-container">
            <img src={hospital1} alt="Hospital San Pablo" className="carousel-image" />
            <div className="carousel-overlay">
              <Carousel.Caption>
                <h2>Hospital de San Pablo</h2>
                <p>Brindando atención médica de calidad a nuestra comunidad</p>
                <Button variant="light" size="lg" className="btn">Conocenos</Button>
              </Carousel.Caption>
            </div>
          </div>
        </Carousel.Item>
        <Carousel.Item>
          <div className="carousel-image-container">
            <img src={capsnsdp} alt="CAPS Nuestra Sra. Del Pilar" className="carousel-image" />
            <div className="carousel-overlay">
              <Carousel.Caption>
                <h2>CAPS Nuestra Sra. Del Pilar</h2>
                <p>Atención primaria de la salud cerca de tu hogar</p>
                <Button variant="light" size="lg" className="btn">Ver Servicios</Button>
              </Carousel.Caption>
            </div>
          </div>
        </Carousel.Item>
        <Carousel.Item>
          <div className="carousel-image-container">
            <img src={capsvdr} alt="CAPS Villa del Rosario" className="carousel-image" />
            <div className="carousel-overlay">
              <Carousel.Caption>
                <h2>CAPS Villa del Rosario</h2>
                <p>Comprometidos con tu salud y bienestar</p>
                <Button variant="light" size="lg" className="btn">Más Información</Button>
              </Carousel.Caption>
            </div>
          </div>
        </Carousel.Item>
      </Carousel>
    </div>
  );
};
