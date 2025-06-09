import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useForm } from "../hooks";
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom';
import "../Css/profesionales.css"

const Profecionales = () => {

  const navigate = useNavigate();

  const initialForm = { prestador: "", clinica: "", especialidad: "", horarios: "", dni: "" };

  const { valuesForm, onInputChange } = useForm(initialForm);
  const { prestador, clinica, especialidad, horarios, dni } = valuesForm;


  const [ profesionales, setProfesionales ] = useState();
  const [ toggleMostrarTabla, setToggleMostrarTabla ] = useState(true);

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
      const existeProfesional = profesionales.some((profesional) => parseInt(profesional.dni) === parseInt(dni));
      
      if (existeProfesional) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "El profesional con este DNI ya existe",
        });
        return; 
      }
  
      const response = await axios.post(
        "http://localhost:8000/profesionales/agregarProfesionales",
        {
          prestador: prestador,
          clinica: clinica,
          especialidad: especialidad,
          horarios: horarios,
          dni: dni,
        }
      );

      Swal.fire({
        title: "Felicidades!",
        text: "Profesional agregado correctamente",
        icon: "success"
      });

      navigate('/CartillaMedica');
      
    } catch (error) {
      console.log("Error al agregar profesional", error);
    }
  };
  

  const onSubmit = (event) => {
    event.preventDefault()
    console.log(valuesForm)
  };

  return (
    <>
      <div className="body-agregar-profesional">
        <div className="agregar-profesional-contenedor">
          <h3 className="agregar-profesional-titulo">Datos del profesional</h3>
  
          <form className="agregar-profesional-formulario" onSubmit={onSubmit}>
            <div>
              <label className="agregar-profesional-label">Prestador:</label>
              <input
                type="text"
                className="agregar-profesional-input"
                name="prestador"
                onChange={onInputChange}
                value={prestador}
              />
            </div>
  
            <div>
              <label className="agregar-profesional-label">Clinica:</label>
              <input
                type="text"
                className="agregar-profesional-input"
                name="clinica"
                onChange={onInputChange}
                value={clinica}
              />
            </div>
  
            <div>
              <label className="agregar-profesional-label">Especialidad:</label>
              <input
                type="text"
                className="agregar-profesional-input"
                name="especialidad"
                onChange={onInputChange}
                value={especialidad}
              />
            </div>
  
            <div>
              <label className="agregar-profesional-label">Horarios:</label>
              <input
                type="text"
                className="agregar-profesional-input"
                name="horarios"
                onChange={onInputChange}
                value={horarios}
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
                placeholder="solo numeros"
              />
            </div>
  
            <br />
            <div className="body-botones-profesional">
              <button
                className="boton-agregar"
                type="submit"
                onClick={agregarProfesionales}
              >
                Agregar
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
  
};

export default Profecionales;
