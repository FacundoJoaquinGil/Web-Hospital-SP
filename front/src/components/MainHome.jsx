import hospital from "../assets/hospital.png";
import profesionales from "../assets/profesionales.png";
import administrativos from "../assets/administrativos.png";
import informacion from "../assets/informacion.png";
import calendario from "../assets/calendario.png";
import test from "../assets/test.png";
import "../Css/mainHome.css";
import { Carrousel } from "./Carrousel";
import { Container, Row, Col, Card } from "react-bootstrap";
import { useEffect, useState } from "react";

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

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
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

      {/* Noticias y Eventos
      <Container className="news-section py-5">
        <h2 className="section-title">Noticias y Eventos</h2>
        <Row className="g-4">
          <Col xs={12} md={4}>
            <Card className="noticia-card h-100" data-aos="fade-up">
              <div className="card-img-container">
                <img src={dengue1} alt="Síntomas del Dengue" />
              </div>
              <Card.Body className="text-center">
                <Card.Title>Síntomas del Dengue</Card.Title>
                <Card.Text>
                  Conoce los síntomas y medidas preventivas contra el dengue.
                </Card.Text>
                <a href="https://www.instagram.com/p/Cz_R8YIu5mU/?img_index=1"
                   target="_blank"
                   rel="noopener noreferrer"
                   className="btn-noticia">
                  Más Información
                </a>
              </Card.Body>
            </Card>
          </Col>

          <Col xs={12} md={4}>
            <Card className="noticia-card h-100" data-aos="fade-up" data-aos-delay="100">
              <div className="card-img-container">
                <img src={capacdengue} alt="Capacitación Dengue" />
              </div>
              <Card.Body className="text-center">
                <Card.Title>Capacitación Dengue</Card.Title>
                <Card.Text>
                  Capacitación para profesionales sobre prevención y tratamiento del dengue.
                </Card.Text>
                <a href="https://www.instagram.com/p/Cz_QUSJu5rn/"
                   target="_blank"
                   rel="noopener noreferrer"
                   className="btn-noticia">
                  Más Información
                </a>
              </Card.Body>
            </Card>
          </Col>

          <Col xs={12} md={4}>
            <Card className="noticia-card h-100" data-aos="fade-up" data-aos-delay="200">
              <div className="card-img-container">
                <img src={diabetes3} alt="Día Mundial de la Diabetes" />
              </div>
              <Card.Body className="text-center">
                <Card.Title>Día Mundial de la Diabetes</Card.Title>
                <Card.Text>
                  Conmemoración y actividades de concientización sobre la diabetes.
                </Card.Text>
                <a href="https://www.instagram.com/p/CzozN1TO849/"
                   target="_blank"
                   rel="noopener noreferrer"
                   className="btn-noticia">
                  Más Información
                </a>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container> */}

      {/* Sección de Servicios Rápidos */}
      <section className="mhqs-quick-services">
        <div className="mhqs-wrapper">
          <h2 className="mhqs-title">Servicios Rápidos</h2>
          <p className="mhqs-subtitle">
            Accede rápidamente a la información que necesitas sobre nuestros
            servicios médicos
          </p>

          <div className="mhqs-grid" data-aos="fade-down">
            {/* Tarjeta 1 */}
            <div className="mhqs-card">
              <div className="mhqs-card-header">
                <div className="mhqs-icon">
                  <i className="fas fa-clock"></i>
                </div>
                <div className="mhqs-badges">
                  <span className="mhqs-badge mhqs-badge-primary">24/7</span>
                  <span className="mhqs-badge mhqs-badge-secondary">
                    Urgencias
                  </span>
                </div>
              </div>
              <div className="mhqs-card-body">
                <h3 className="mhqs-card-title">Horarios de Atención</h3>
                <p className="mhqs-description">
                  Consulta los horarios de atención de todas nuestras
                  especialidades médicas.
                </p>
                <p className="mhqs-secondary">
                  Encuentra información detallada sobre horarios de consultas,
                  especialidades disponibles y servicios de emergencia las 24
                  horas.
                </p>
                <div className="mhqs-features">
                  <div className="mhqs-feature">
                    <i className="fas fa-check-circle"></i>{" "}
                    <span>Consultas programadas</span>
                  </div>
                  <div className="mhqs-feature">
                    <i className="fas fa-check-circle"></i>{" "}
                    <span>Atención de emergencia</span>
                  </div>
                </div>
              </div>
              <div className="mhqs-card-footer">
                <a href="/HoraAtencion" className="mhqs-btn">
                  <i className="fas fa-calendar-alt"></i> Ver Horarios
                </a>
              </div>
            </div>

            {/* Tarjeta 2 */}
            <div className="mhqs-card">
              <div className="mhqs-card-header">
                <div className="mhqs-icon">
                  <i className="fas fa-user-md"></i>
                </div>
                <div className="mhqs-badges">
                  <span className="mhqs-badge mhqs-badge-success">
                    Certificados
                  </span>
                  <span className="mhqs-badge mhqs-badge-info">
                    15+ Especialidades
                  </span>
                </div>
              </div>
              <div className="mhqs-card-body">
                <h3 className="mhqs-card-title">Profesionales</h3>
                <p className="mhqs-description">
                  Conoce nuestro equipo de profesionales médicos y sus
                  especialidades.
                </p>
                <p className="mhqs-secondary">
                  Nuestro equipo está conformado por médicos especialistas con
                  amplia experiencia y certificaciones internacionales.
                </p>
                <div className="mhqs-features">
                  <div className="mhqs-feature">
                    <i className="fas fa-check-circle"></i>{" "}
                    <span>Médicos especialistas</span>
                  </div>
                  <div className="mhqs-feature">
                    <i className="fas fa-check-circle"></i>{" "}
                    <span>Certificaciones vigentes</span>
                  </div>
                </div>
              </div>
              <div className="mhqs-card-footer">
                <a href="/CartillaMedica" className="mhqs-btn">
                  <i className="fas fa-users"></i> Ver Profesionales
                </a>
              </div>
            </div>

            {/* Tarjeta 3 */}
            <div className="mhqs-card">
              <div className="mhqs-card-header">
                <div className="mhqs-icon">
                  <i className="fas fa-building"></i>
                </div>
                <div className="mhqs-badges">
                  <span className="mhqs-badge mhqs-badge-warning">Lun-Vie</span>
                  <span className="mhqs-badge mhqs-badge-secondary">
                    Gestión
                  </span>
                </div>
              </div>
              <div className="mhqs-card-body">
                <h3 className="mhqs-card-title">Horarios Administrativos</h3>
                <p className="mhqs-description">
                  Información sobre horarios de atención administrativa.
                </p>
                <p className="mhqs-secondary">
                  Realiza trámites administrativos, solicita información sobre
                  seguros, pagos y autorizaciones.
                </p>
                <div className="mhqs-features">
                  <div className="mhqs-feature">
                    <i className="fas fa-check-circle"></i>{" "}
                    <span>Trámites y gestiones</span>
                  </div>
                  <div className="mhqs-feature">
                    <i className="fas fa-check-circle"></i>{" "}
                    <span>Información de seguros</span>
                  </div>
                </div>
              </div>
              <div className="mhqs-card-footer">
                <a href="/HorarioAdm" className="mhqs-btn">
                  <i className="fas fa-clipboard-list"></i> Ver Horarios
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sección de Información Importante */}
      <section className="mhii-important-info" data-aos="fade-down">
        <div className="mhii-wrapper">
          <h2 className="mhii-title">Información Importante</h2>
          <p className="mhii-subtitle">
            Accede a información esencial sobre servicios de salud y recursos disponibles
          </p>

          <div className="mhii-grid">
            {/* Tarjeta 1 - Nodos de Vacunación */}
            <div className="mhii-card">
              <div className="mhii-card-header">
                <div className="mhii-icon">
                  <i className="fas fa-syringe"></i>
                </div>
                <div className="mhii-badges">
                  <span className="mhii-badge mhii-badge-success">Gratuito</span>
                  <span className="mhii-badge mhii-badge-primary">Salud Pública</span>
                </div>
              </div>
              <div className="mhii-card-body">
                <h3 className="mhii-card-title">Nodos de Vacunación</h3>
                <p className="mhii-description">
                  Encuentra los puntos de vacunación más cercanos a tu ubicación.
                </p>
                <p className="mhii-secondary">
                  Accede a información actualizada sobre centros de vacunación, horarios de atención y calendario de vacunas disponibles en la provincia.
                </p>
                <div className="mhii-features">
                  <div className="mhii-feature">
                    <i className="fas fa-check-circle"></i>{" "}
                    <span>Ubicaciones cercanas</span>
                  </div>
                  <div className="mhii-feature">
                    <i className="fas fa-check-circle"></i>{" "}
                    <span>Horarios actualizados</span>
                  </div>
                </div>
              </div>
              <div className="mhii-card-footer">
                <a
                  href="https://msptucuman.gov.ar/nodos-de-vacunacion/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mhii-btn"
                >
                  <i className="fas fa-map-marker-alt"></i> Ver Nodos
                </a>
              </div>
            </div>

            {/* Tarjeta 2 - Nodos de Testeos */}
            <div className="mhii-card">
              <div className="mhii-card-header">
                <div className="mhii-icon">
                  <i className="fas fa-vial"></i>
                </div>
                <div className="mhii-badges">
                  <span className="mhii-badge mhii-badge-info">COVID-19</span>
                  <span className="mhii-badge mhii-badge-secondary">Testeos</span>
                </div>
              </div>
              <div className="mhii-card-body">
                <h3 className="mhii-card-title">Nodos de Testeos</h3>
                <p className="mhii-description">
                  Ubicaciones para realizarte test de COVID-19 y otras enfermedades.
                </p>
                <p className="mhii-secondary">
                  Encuentra centros de testeo cercanos para diagnóstico de COVID-19 y otras enfermedades infecciosas con resultados rápidos.
                </p>
                <div className="mhii-features">
                  <div className="mhii-feature">
                    <i className="fas fa-check-circle"></i>{" "}
                    <span>Test COVID-19</span>
                  </div>
                  <div className="mhii-feature">
                    <i className="fas fa-check-circle"></i>{" "}
                    <span>Resultados rápidos</span>
                  </div>
                </div>
              </div>
              <div className="mhii-card-footer">
                <a
                  href="https://msptucuman.gov.ar/nodos-de-testeo/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mhii-btn"
                >
                  <i className="fas fa-search"></i> Ver Nodos
                </a>
              </div>
            </div>

            {/* Tarjeta 3 - Información General */}
            <div className="mhii-card">
              <div className="mhii-card-header">
                <div className="mhii-icon">
                  <i className="fas fa-info-circle"></i>
                </div>
                <div className="mhii-badges">
                  <span className="mhii-badge mhii-badge-warning">Actualizado</span>
                  <span className="mhii-badge mhii-badge-info">Recursos</span>
                </div>
              </div>
              <div className="mhii-card-body">
                <h3 className="mhii-card-title">Información General</h3>
                <p className="mhii-description">
                  Accede a información importante sobre servicios y programas de salud.
                </p>
                <p className="mhii-secondary">
                  Portal oficial con información actualizada sobre programas de salud, servicios disponibles y recursos para la población.
                </p>
                <div className="mhii-features">
                  <div className="mhii-feature">
                    <i className="fas fa-check-circle"></i>{" "}
                    <span>Programas de salud</span>
                  </div>
                  <div className="mhii-feature">
                    <i className="fas fa-check-circle"></i>{" "}
                    <span>Información oficial</span>
                  </div>
                </div>
              </div>
              <div className="mhii-card-footer">
                <a
                  href="https://msptucuman.gov.ar/la-poblacion/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mhii-btn"
                >
                  <i className="fas fa-external-link-alt"></i> Más Información
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default MainHome;
