import "../Css/MainHoraAtencion.css"

export const MainHoraAtencion = () => {
  const horarios = [
    { especialidad: "Clínica", dias: "Lunes a Viernes", horarios: "07:00 a 18:00" },
    { especialidad: "Oftalmología", dias: "Jueves", horarios: "12:30 a 16:00" },
    { especialidad: "Psicología", dias: "Lunes a Viernes", horarios: "07:00 a 13:00" },
    { especialidad: "Odontología", dias: "Lunes a Viernes", horarios: "07:00 a 19:00" },
    { especialidad: "Endocrinología", dias: "Lunes, Martes, Miércoles y Viernes", horarios: "07:00 a 13:00" },
    { especialidad: "Kinesiología", dias: "Lunes a Viernes", horarios: "07:00 a 13:00" },
    { especialidad: "Nutrición", dias: "Lunes a Viernes", horarios: "07:00 a 13:00" },
    { especialidad: "Pediatría", dias: "Lunes a Viernes", horarios: "07:00 a 19:00" },
    { especialidad: "Ginecología", dias: "Lunes, Miércoles y Viernes", horarios: "07:00 a 13:00" },
    { especialidad: "Radiología", dias: "Lunes a Viernes", horarios: "07:00 a 17:00" },
    { especialidad: "Ecografías", dias: "Lunes, Martes, Jueves y Viernes", horarios: "07:00 a 13:00" },
    { especialidad: "Urología", dias: "Lunes", horarios: "07:00 a 13:00" }
  ];

  return (
    <div className="container-HA">
      <div className="vacioHA" />
      <div className="encabezado">
        <h1>Horarios de Atención</h1>
      </div>

      <div className="tablaHospitalSP">
        <div className="tabla1">
          <h2>Hospital de San Pablo</h2>
          <h3>GUARDIAS DE LUNES A DOMINGOS</h3>
          <table>
            <thead>
              <tr>
                <th>Especialidad</th>
                <th>Días</th>
                <th>Horarios</th>
              </tr>
            </thead>
            <tbody>
              {horarios.map((horario, index) => (
                <tr key={index}>
                  <td>{horario.especialidad}</td>
                  <td>{horario.dias}</td>
                  <td>{horario.horarios}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MainHoraAtencion;