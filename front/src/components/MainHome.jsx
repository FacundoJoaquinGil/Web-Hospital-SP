import hospital from "../assets/hospital.png";
import profesionales from "../assets/profesionales.png";
import administrativos from "../assets/administrativos.png";
import informacion from "../assets/informacion.png";
import calendario from "../assets/calendario.png";
import test from "../assets/test.png";
import dengue1 from "../assets/dengue1.jpg";
import capacdengue from "../assets/capacdengue.jpg";
import diabetes3 from "../assets/diabetes3.jpg";
import "../Css/mainHome.css";
import { Carrousel } from "./Carrousel";
import { Container, Row, Col, Card } from 'react-bootstrap';
import { useEffect, useState } from 'react';

export const MainHome = () => {
  const [showScrollArrow, setShowScrollArrow] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setShowScrollArrow(false);
      } else {
        setShowScrollArrow(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <main className="main-container">
      {/* Hero Section con Carrusel */}
      <section className="hero-section">
        <Container fluid className="px-0">
          <Carrousel />
        </Container>
        {showScrollArrow && (
          <div className="scroll-arrow">
            <div className="arrow">
              <div className="arrow-line"></div>
              <div className="arrow-line second"></div>
            </div>
          </div>
        )}
      </section>

      {/* Noticias y Eventos */}
      <Container className="news-section py-5">
        <h2 className="section-title">Noticias y Eventos</h2>
        <Row className="g-4">
          <Col xs={12} md={4}>
            <Card className="news-card h-100" data-aos="fade-up">
              <Card.Img variant="top" src={dengue1} className="news-image" />
              <Card.Body>
                <Card.Title>Síntomas del Dengue</Card.Title>
                <Card.Text>
                  Conoce los síntomas y medidas preventivas contra el dengue.
                </Card.Text>
                <a href="https://www.instagram.com/p/Cz_R8YIu5mU/?img_index=1"
                   target="_blank"
                   rel="noopener noreferrer"
                   className="btn">
                  Más Información
                </a>
              </Card.Body>
            </Card>
          </Col>

          <Col xs={12} md={4}>
            <Card className="news-card h-100" data-aos="fade-up" data-aos-delay="100">
              <Card.Img variant="top" src={capacdengue} className="news-image" />
              <Card.Body>
                <Card.Title>Capacitación Dengue</Card.Title>
                <Card.Text>
                  Capacitación para profesionales sobre prevención y tratamiento del dengue.
                </Card.Text>
                <a href="https://www.instagram.com/p/Cz_QUSJu5rn/"
                   target="_blank"
                   rel="noopener noreferrer"
                   className="btn">
                  Más Información
                </a>
              </Card.Body>
            </Card>
          </Col>

          <Col xs={12} md={4}>
            <Card className="news-card h-100" data-aos="fade-up" data-aos-delay="200">
              <Card.Img variant="top" src={diabetes3} className="news-image" />
              <Card.Body>
                <Card.Title>Día Mundial de la Diabetes</Card.Title>
                <Card.Text>
                  Conmemoración y actividades de concientización sobre la diabetes.
                </Card.Text>
                <a href="https://www.instagram.com/p/CzozN1TO849/"
                   target="_blank"
                   rel="noopener noreferrer"
                   className="btn">
                  Más Información
                </a>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* Sección de Servicios Rápidos */}
      <section className="quick-services py-5">
        <Container>
          
          <h2 className="section-title">Servicios Rápidos</h2>
          <Row className="g-4">
            <Col xs={12} md={6} lg={4}>
              <Card className="service-card h-100" data-aos="fade-up">
                <Card.Body className="text-center">
                  <img src={hospital} alt="Horarios" className="service-icon mb-3" />
                  <Card.Title>Horarios de Atención</Card.Title>
                  <Card.Text>Consulta los horarios de atención de todas nuestras especialidades médicas.</Card.Text>
                  <a href="/HoraAtencion" className="btn">Ver Horarios</a>
                </Card.Body>
              </Card>
            </Col>

            <Col xs={12} md={6} lg={4}>
              <Card className="service-card h-100" data-aos="fade-up" data-aos-delay="100">
                <Card.Body className="text-center">
                  <img src={profesionales} alt="Profesionales" className="service-icon mb-3" />
                  <Card.Title>Profesionales</Card.Title>
                  <Card.Text>Conoce nuestro equipo de profesionales médicos y sus especialidades.</Card.Text>
                  <a href="/CartillaMedica" className="btn">Ver Profesionales</a>
                </Card.Body>
              </Card>
            </Col>

            <Col xs={12} md={6} lg={4}>
              <Card className="service-card h-100" data-aos="fade-up" data-aos-delay="200">
                <Card.Body className="text-center">
                  <img src={administrativos} alt="Administrativo" className="service-icon mb-3" />
                  <Card.Title>Horarios Administrativos</Card.Title>
                  <Card.Text>Información sobre horarios de atención administrativa.</Card.Text>
                  <a href="/HorarioAdm" className="btn">Ver Horarios</a>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Sección de Información Importante */}
      <section className="important-info py-5 bg-light">
        <Container>
          <h2 className="section-title">Información Importante</h2>
          <Row className="g-4">
            <Col xs={12} md={6} lg={4}>
              <Card className="info-card h-100" data-aos="fade-up">
                <Card.Body className="text-center">
                  <img src={calendario} alt="Vacunación" className="info-icon mb-3" />
                  <Card.Title>Nodos de Vacunación</Card.Title>
                  <Card.Text>Encuentra los puntos de vacunación más cercanos a tu ubicación.</Card.Text>
                  <a href="https://msptucuman.gov.ar/nodos-de-vacunacion/" 
                     target="_blank" 
                     rel="noopener noreferrer" 
                     className="btn">
                    Ver Nodos
                  </a>
                </Card.Body>
              </Card>
            </Col>

            <Col xs={12} md={6} lg={4}>
              <Card className="info-card h-100" data-aos="fade-up" data-aos-delay="100">
                <Card.Body className="text-center">
                  <img src={test} alt="Testeos" className="info-icon mb-3" />
                  <Card.Title>Nodos de Testeos</Card.Title>
                  <Card.Text>Ubicaciones para realizarte test de COVID-19 y otras enfermedades.</Card.Text>
                  <a href="https://msptucuman.gov.ar/nodos-de-testeo/" 
                     target="_blank" 
                     rel="noopener noreferrer" 
                     className="btn">
                    Ver Nodos
                  </a>
                </Card.Body>
              </Card>
            </Col>

            <Col xs={12} md={6} lg={4}>
              <Card className="info-card h-100" data-aos="fade-up" data-aos-delay="200">
                <Card.Body className="text-center">
                  <img src={informacion} alt="Información" className="info-icon mb-3" />
                  <Card.Title>Información General</Card.Title>
                  <Card.Text>Accede a información importante sobre servicios y programas de salud.</Card.Text>
                  <a href="https://msptucuman.gov.ar/la-poblacion/" 
                     target="_blank" 
                     rel="noopener noreferrer" 
                     className="btn">
                    Más Información
                  </a>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>
    </main>
  );
};

export default MainHome;
