import "../Css/mainhistoria.css";
import hospital1 from "../assets/hospsanp1.jpeg";
import hospital2 from "../assets/hospitalSPB.jpg";

export const MainHistoria = () => {
  return (
    <section className="historia-section">
      <div className="historia-container">
        <h1 className="historia-titulo">Historia del Hospital de San Pablo</h1>

        <div className="historia-content">
          <article className="historia-texto" data-aos="fade-right">
            <p>
              Alrededor de la primera organización política creada en el territorio
              argentino, comienza el proceso de integración territorial de la región
              que hoy ocupa San Pablo. Por ese entonces habitaban en esa tierras los
              Lules, pueblo originario proveniente del desprendimiento de otras
              tribus pertenecientes a los Guaraníes, los Tonocotés y los Juríes.
            </p>
            <p>
              En el año 1592, Juan Ramires de Velazco, adjudica a Melian de Leguizamo
              las tierras que se extendían desde el Río Ulipampa (hoy Río Lules),
              hasta la ciudad de San Miguel de Tucumán. En 1670, la nieta de
              Leguizamo, Jordana de Trejo Leguizamo, vende estas tierras a los
              Jesuitas, quienes para tener referencia denominan a este lugar &quot;El
              bosque de San Pablo&quot;.
            </p>
            <p>
              En 1767, cuando son expulsados los Jesuitas de los dominios de Carlos III,
              estos territorios son rematados y adquiridos por Domingo de Ayala. Con Ayala
              se asocia para explotar estas tierras del lugar llamado El Obraje, incluyendo
              la zona boscosa de la ladera del cerro.
            </p>
            <p>
              El Pueblo de San Pablo queda fundado al levantarse las primeras casas para
              el personal trabajador del Ingenio, aproximadamente en el año 1860, 30 años
              después de haberse puesto en funcionamiento el Ingenio Azucarero San Pablo.
            </p>
          </article>

          <div className="historia-galeria" data-aos="fade-left">
            <div className="galeria-item">
              <img src={hospital1} alt="Hospital de San Pablo" />
              <p>El Hospital de San Pablo, situado en el histórico departamento de Lules, es un pilar de salud y bienestar para la comunidad local, brindando atención y esperanza a sus habitantes.</p>
            </div>

            <div className="galeria-item">
              <img src={hospital2} alt="Consultorio Materno Infantil" />
              <p>El Consultorio Materno Infantil de San Pablo es un espacio dedicado a la atención integral de madres y niños, brindando servicios especializados. Comprometido con el bienestar de la comunidad, este centro se destaca por su calidez y profesionalismo en el acompañamiento de las familias de la región.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MainHistoria;
