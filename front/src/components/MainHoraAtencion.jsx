import { useState, useEffect } from "react";
import "../Css/MainHoraAtencion.css"
import axios from "axios";

const CLINICAS = [
  "Hospital San Pablo",
  "Nuestra Sra. Del Pilar",
  "CAPS Villa del Rosario"
];

export const MainHoraAtencion = () => {
  const [profesionales, setProfesionales] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [clinicaActual, setClinicaActual] = useState(0);
  const [fadeKey, setFadeKey] = useState(0);

  useEffect(() => {
    axios.get("http://localhost:8000/profesionales/")
      .then((resp) => {
        setProfesionales(resp.data);
        setCargando(false);
      })
      .catch(() => setCargando(false));
  }, []);

  // Filtrar profesionales por clínica seleccionada
  const clinicaNombre = CLINICAS[clinicaActual];
  const profesionalesClinica = profesionales.filter(
    (prof) => prof.clinica && prof.clinica.toLowerCase().includes(clinicaNombre.toLowerCase())
  );

  const handlePrev = () => {
    setClinicaActual((prev) => (prev === 0 ? CLINICAS.length - 1 : prev - 1));
    setFadeKey(fadeKey + 1);
  };
  const handleNext = () => {
    setClinicaActual((prev) => (prev === CLINICAS.length - 1 ? 0 : prev + 1));
    setFadeKey(fadeKey + 1);
  };

  return (
    <div className="container-HA">
      <div className="vacioHA" />
      <div className="encabezado">
        <h1>Horarios de Atención</h1>
      </div>

      <div className="tablaHospitalSP">
        <div className="tabla1">
          <div className="clinica-nav-container">
            <button onClick={handlePrev} aria-label="Anterior" className="clinica-nav-btn">
              <i className="fa-solid fa-chevron-left"></i>
            </button>
            <h2 className="clinica-nav-title">{clinicaNombre}</h2>
            <button onClick={handleNext} aria-label="Siguiente" className="clinica-nav-btn">
              <i className="fa-solid fa-chevron-right"></i>
            </button>
          </div>
          <h3>GUARDIAS DE LUNES A DOMINGOS</h3>
          {cargando ? (
            <p style={{textAlign: 'center'}}>Cargando...</p>
          ) : (
            <table className="clinica-fade" key={fadeKey}>
              <thead>
                <tr>
                  <th>Especialidad</th>
                  <th>Prestador</th>
                  <th>Clínica</th>
                  <th>Horarios</th>
                </tr>
              </thead>
              <tbody>
                {profesionalesClinica.length > 0 ? (
                  profesionalesClinica.map((prof, idx) => (
                    <tr key={prof.idProfesionales || idx}>
                      <td>{prof.especialidad}</td>
                      <td>{prof.prestador}</td>
                      <td>{prof.clinica}</td>
                      <td>{prof.horarios}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" style={{textAlign: 'center', color: '#888'}}>No hay profesionales cargados para esta clínica</td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default MainHoraAtencion;