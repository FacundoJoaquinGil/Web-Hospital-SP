import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useForm } from "../hooks";
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom';
import "../Css/profesionales.css"

const Profecionales = () => {
  const navigate = useNavigate();

  const initialForm = {
    prestador: "",
    clinica: "",
    especialidad: "",
    horarios: "",
    dni: "",
    matricula: "",
    email: "",
    telefono: "",
    direccion: "",
    fechaNacimiento: "",
    genero: "",
    formacion: "",
    experiencia: "",
    obrasSociales: "",
    tipoProfesional: "",
    estado: "activo"
  };

  const { valuesForm, onInputChange } = useForm(initialForm);
  const {
    prestador,
    clinica,
    especialidad,
    horarios,
    dni,
    matricula,
    email,
    telefono,
    direccion,
    fechaNacimiento,
    genero,
    formacion,
    experiencia,
    obrasSociales,
    tipoProfesional,
    estado
  } = valuesForm;

  const [profesionales, setProfesionales] = useState();
  const [toggleMostrarTabla, setToggleMostrarTabla] = useState(true);

  const mostrarProfesionales = () => {
    axios.get("http://localhost:8000/profesionales/").then((resp) => {
      setProfesionales(resp.data)
    });
  };

  useEffect(() => {
    mostrarProfesionales();
  }, []);

  const agregarProfesionales = async () => {
    try {
      const existeProfesional = profesionales.some((profesional) => 
        parseInt(profesional.dni) === parseInt(dni) || 
        profesional.matricula === matricula
      );
      
      if (existeProfesional) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "El profesional con este DNI o matrícula ya existe",
        });
        return;
      }
  
      await axios.post(
        "http://localhost:8000/profesionales/agregarProfesionales",
        valuesForm
      );

      Swal.fire({
        title: "¡Profesional agregado!",
        text: "El profesional ha sido agregado correctamente",
        icon: "success"
      });

      navigate('/CartillaMedica');
      
    } catch (error) {
      console.log("Error al agregar profesional", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Hubo un error al agregar el profesional",
      });
    }
  };

  const onSubmit = (event) => {
    event.preventDefault();
    agregarProfesionales();
  };

  return (
    <>
      <div className="body-agregar-profesional">
        <div className="agregar-profesional-contenedor">
          <h1 className="usuarios-gestion-title">Datos del profesional</h1>
          <p className="usuarios-gestion-desc">Agrega o edita la información de los profesionales del sistema hospitalario</p>
  
          <form className="agregar-profesional-formulario" onSubmit={onSubmit}>
            <div className="form-section">
              <h4>Información Personal</h4>
              <div>
                <label className="agregar-profesional-label">Nombre Completo:</label>
                <input
                  type="text"
                  className="agregar-profesional-input"
                  name="prestador"
                  onChange={onInputChange}
                  value={prestador}
                  required
                />
              </div>

              <div>
                <label className="agregar-profesional-label">DNI:</label>
                <input
                  type="number"
                  className="agregar-profesional-input"
                  name="dni"
                  onChange={onInputChange}
                  value={dni}
                  placeholder="Solo números"
                  required
                />
              </div>

              <div>
                <label className="agregar-profesional-label">Fecha de Nacimiento:</label>
                <input
                  type="date"
                  className="agregar-profesional-input"
                  name="fechaNacimiento"
                  onChange={onInputChange}
                  value={fechaNacimiento}
                  required
                />
              </div>

              <div>
                <label className="agregar-profesional-label">Género:</label>
                <select
                  className="agregar-profesional-input"
                  name="genero"
                  onChange={onInputChange}
                  value={genero}
                  required
                >
                  <option value="">Seleccione...</option>
                  <option value="masculino">Masculino</option>
                  <option value="femenino">Femenino</option>
                  <option value="otro">Otro</option>
                </select>
              </div>
            </div>

            <div className="form-section">
              <h4>Información Profesional</h4>
              <div>
                <label className="agregar-profesional-label">Matrícula Profesional:</label>
                <input
                  type="text"
                  className="agregar-profesional-input"
                  name="matricula"
                  onChange={onInputChange}
                  value={matricula}
                  required
                />
              </div>

              <div>
                <label className="agregar-profesional-label">Tipo de Profesional:</label>
                <select
                  className="agregar-profesional-input"
                  name="tipoProfesional"
                  onChange={onInputChange}
                  value={tipoProfesional}
                  required
                >
                  <option value="">Seleccione...</option>
                  <option value="medico">Médico</option>
                  <option value="enfermero">Enfermero/a</option>
                  <option value="kinesiologo">Kinesiólogo/a</option>
                  <option value="nutricionista">Nutricionista</option>
                  <option value="psicologo">Psicólogo/a</option>
                  <option value="odontologo">Odontólogo/a</option>
                  <option value="otro">Otro</option>
                </select>
              </div>

              <div>
                <label className="agregar-profesional-label">Especialidad:</label>
                <input
                  type="text"
                  className="agregar-profesional-input"
                  name="especialidad"
                  onChange={onInputChange}
                  value={especialidad}
                  required
                />
              </div>

              <div>
                <label className="agregar-profesional-label">Formación Académica:</label>
                <textarea
                  className="agregar-profesional-input"
                  name="formacion"
                  onChange={onInputChange}
                  value={formacion}
                  placeholder="Ingrese títulos, especializaciones, etc."
                  required
                />
              </div>

              <div>
                <label className="agregar-profesional-label">Experiencia Laboral:</label>
                <textarea
                  className="agregar-profesional-input"
                  name="experiencia"
                  onChange={onInputChange}
                  value={experiencia}
                  placeholder="Ingrese experiencia relevante"
                  required
                />
              </div>
            </div>

            <div className="form-section">
              <h4>Información de Contacto</h4>
              <div>
                <label className="agregar-profesional-label">Email:</label>
                <input
                  type="email"
                  className="agregar-profesional-input"
                  name="email"
                  onChange={onInputChange}
                  value={email}
                  required
                />
              </div>

              <div>
                <label className="agregar-profesional-label">Teléfono:</label>
                <input
                  type="tel"
                  className="agregar-profesional-input"
                  name="telefono"
                  onChange={onInputChange}
                  value={telefono}
                  required
                />
              </div>

              <div>
                <label className="agregar-profesional-label">Dirección:</label>
                <input
                  type="text"
                  className="agregar-profesional-input"
                  name="direccion"
                  onChange={onInputChange}
                  value={direccion}
                  required
                />
              </div>
            </div>

            <div className="form-section">
              <h4>Información Laboral</h4>
              <div>
                <label className="agregar-profesional-label">Clínica/Hospital:</label>
                <input
                  type="text"
                  className="agregar-profesional-input"
                  name="clinica"
                  onChange={onInputChange}
                  value={clinica}
                  required
                />
              </div>

              <div>
                <label className="agregar-profesional-label">Horarios de Atención:</label>
                <input
                  type="text"
                  className="agregar-profesional-input"
                  name="horarios"
                  onChange={onInputChange}
                  value={horarios}
                  placeholder="Ej: Lunes a Viernes 8:00 a 16:00"
                  required
                />
              </div>

              <div>
                <label className="agregar-profesional-label">Obras Sociales:</label>
                <input
                  type="text"
                  className="agregar-profesional-input"
                  name="obrasSociales"
                  onChange={onInputChange}
                  value={obrasSociales}
                  placeholder="Ingrese las obras sociales que acepta"
                  required
                />
              </div>

              <div>
                <label className="agregar-profesional-label">Estado:</label>
                <select
                  className="agregar-profesional-input"
                  name="estado"
                  onChange={onInputChange}
                  value={estado}
                  required
                >
                  <option value="activo">Activo</option>
                  <option value="inactivo">Inactivo</option>
                  <option value="licencia">En Licencia</option>
                </select>
              </div>
            </div>
  
            <div className="body-botones-profesional">
              <button
                className="boton-agregar"
                type="submit"
              >
                Agregar Profesional
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Profecionales;
