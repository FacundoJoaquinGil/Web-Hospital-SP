import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import "../Css/AdminHorarios.css";

export const AdminHorarios = () => {
  const [horarios, setHorarios] = useState([]);
  const [filtro, setFiltro] = useState("");
  const [horariosFiltrados, setHorariosFiltrados] = useState([]);
  const [toggleAgregar, setToggleAgregar] = useState(false);
  const [nuevoHorario, setNuevoHorario] = useState({
    especialidad: "",
    dias: "",
    horarios: ""
  });

  const getHorarios = () => {
    axios
      .get("http://localhost:8000/horarios")
      .then((resp) => {
        setHorarios(resp.data);
        setHorariosFiltrados(resp.data);
      })
      .catch((error) => console.error("Error al obtener horarios:", error));
  };

  useEffect(() => {
    getHorarios();
  }, []);

  useEffect(() => {
    const resultado = horarios.filter((horario) =>
      horario.especialidad.toLowerCase().includes(filtro.toLowerCase())
    );
    setHorariosFiltrados(resultado);
  }, [filtro, horarios]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNuevoHorario({
      ...nuevoHorario,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8000/horarios", nuevoHorario)
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Horario agregado",
          text: "El horario se ha agregado correctamente",
          timer: 2000,
          showConfirmButton: false
        });
        getHorarios();
        setToggleAgregar(false);
        setNuevoHorario({
          especialidad: "",
          dias: "",
          horarios: ""
        });
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "No se pudo agregar el horario",
          timer: 2000,
          showConfirmButton: false
        });
        console.error("Error al agregar horario:", error);
      });
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "No podrás revertir esta acción",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar"
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://localhost:8000/horarios/${id}`)
          .then(() => {
            Swal.fire({
              icon: "success",
              title: "Horario eliminado",
              text: "El horario se ha eliminado correctamente",
              timer: 2000,
              showConfirmButton: false
            });
            getHorarios();
          })
          .catch((error) => {
            Swal.fire({
              icon: "error",
              title: "Error",
              text: "No se pudo eliminar el horario",
              timer: 2000,
              showConfirmButton: false
            });
            console.error("Error al eliminar horario:", error);
          });
      }
    });
  };

  return (
    <div className="admin-horarios-container">
      <div className="admin-horarios-header">
        <input
          type="text"
          className="search-input"
          placeholder="Buscar por especialidad..."
          value={filtro}
          onChange={(e) => setFiltro(e.target.value)}
        />
        <button
          className="btn-agregar"
          onClick={() => setToggleAgregar(!toggleAgregar)}
        >
          {toggleAgregar ? "Cancelar" : "Agregar Horario"}
        </button>
      </div>

      {toggleAgregar && (
        <form onSubmit={handleSubmit} className="form-horario">
          <div className="form-group">
            <label>Especialidad:</label>
            <input
              type="text"
              name="especialidad"
              value={nuevoHorario.especialidad}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Días:</label>
            <input
              type="text"
              name="dias"
              value={nuevoHorario.dias}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Horarios:</label>
            <input
              type="text"
              name="horarios"
              value={nuevoHorario.horarios}
              onChange={handleInputChange}
              required
            />
          </div>
          <button type="submit" className="btn-submit">
            Guardar Horario
          </button>
        </form>
      )}

      <div className="horarios-list">
        <table className="table">
          <thead>
            <tr>
              <th>Especialidad</th>
              <th>Días</th>
              <th>Horarios</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {horariosFiltrados.map((horario) => (
              <tr key={horario.id}>
                <td>{horario.especialidad}</td>
                <td>{horario.dias}</td>
                <td>{horario.horarios}</td>
                <td>
                  <button
                    className="btn-eliminar"
                    onClick={() => handleDelete(horario.id)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminHorarios; 