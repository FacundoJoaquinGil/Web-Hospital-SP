import "../Css/MainNoticias.css";
import fichamedica from "../assets/fichamedica.jpeg";
import cancermama from "../assets/cancermama.jpg";
import carnet from "../assets/carnetvacunacion.jpg";
import labdengue from "../assets/labdengue.jpg";
import ruta from "../assets/ruta-embarazada.jpg";
import libro from "../assets/manual-diabetes.jpg";
import { Container, Row, Col, Card } from "react-bootstrap";

export const MainNoticias = () => {
  const noticias = [
    {
      imagen: fichamedica,
      titulo: "Ficha Médica Escolar",
      descripcion: "Accede al formulario de ficha médica escolar para el ingreso a instituciones educativas.",
      link: "https://msptucuman.gov.ar/ficha-medica-escolar/"
    },
    {
      imagen: cancermama,
      titulo: "Ubicaciones de Mamógrafos",
      descripcion: "Conoce los centros de salud donde puedes realizarte una mamografía.",
      link: "https://msptucuman.gov.ar/ubicaciones-de-mamografos/"
    },
    {
      imagen: carnet,
      titulo: "Carnet de Vacunación",
      descripcion: "Solicita tu carnet de vacunación digital de manera rápida y segura.",
      link: "https://srv08.siprosa.gob.ar/caps/carnetemitirplus.aspx"
    },
    {
      imagen: labdengue,
      titulo: "Resultados de Estudios",
      descripcion: "Consulta los resultados de tus estudios de dengue y COVID-19 de forma online.",
      link: "https://msptucuman.gov.ar/aplicativo-para-visualizar-resultados-de-estudios-de-dengue-y-covid-19/"
    },
    {
      imagen: libro,
      titulo: "Manual de Diabetes",
      descripcion: "Guía completa sobre diabetes para padres y cuidadores.",
      link: "https://msptucuman.gov.ar/manual-de-diabetes-para-padres/"
    },
    {
      imagen: ruta,
      titulo: "Ruta de la Embarazada",
      descripcion: "Información sobre el seguimiento del embarazo y cuidados del recién nacido.",
      link: "https://msptucuman.gov.ar/ruta-de-la-embarazada-y-el-nino/"
    }
  ];

  return (
    <div className="noticias-section">
      <Container>
        <div className="noticias-header">
          <h1>Noticias y Servicios</h1>
          <p>Mantente informado sobre los servicios y programas de salud disponibles</p>
        </div>
        
        <Row className="g-4">
          {noticias.map((noticia, index) => (
            <Col key={index} xs={12} md={6} lg={4}>
              <Card className="noticia-card" data-aos="fade-up" data-aos-delay={index * 100}>
                <div className="card-img-container">
                  <Card.Img variant="top" src={noticia.imagen} />
                </div>
                <Card.Body>
                  <Card.Title>{noticia.titulo}</Card.Title>
                  <Card.Text>{noticia.descripcion}</Card.Text>
                  <a
                    href={noticia.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-noticia"
                  >
                    <i className="fas fa-external-link-alt"></i> Más Información
                  </a>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default MainNoticias;
