import { useState, useEffect, useContext } from "react";
import "../Css/MainCartilla.css";
import axios from "axios";
import { UserContext } from "../context/UserContext";
import Swal from 'sweetalert2';

export const MainCartilla = ({ pageProfesionales }) => {
  const [busqueda, setBusqueda] = useState("");
  const [ordenColumna, setOrdenColumna] = useState(null);
  const [ordenAscendente, setOrdenAscendente] = useState(true);
  const [profesionales, setProfesionales] = useState([]);
  const [profesionalesFiltrados, setProfesionalesFiltrados] = useState([]);
  const { userNombre } = useContext(UserContext);

  const mostrarProfesionales = () => {
    axios.get("http://localhost:8000/profesionales/").then((resp) => {
      setProfesionales(resp.data);
      setProfesionalesFiltrados(resp.data); 
    });
  };

  useEffect(() => {
    mostrarProfesionales();
  }, []);

  const borrarProfesional = async (id) => {
    if (userNombre === "admin") {
      try {
        const result = await Swal.fire({
          title: '¿Estás seguro?',
          text: "Esta acción no se puede deshacer",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Sí, eliminar',
          cancelButtonText: 'Cancelar'
        });

        if (result.isConfirmed) {
          await axios.delete(`http://localhost:8000/profesionales/borrarProfesional/${id}`);
          Swal.fire({
            icon: "success",
            title: "Profesional eliminado correctamente",
            showConfirmButton: false,
            timer: 1500
          });
          mostrarProfesionales();
        }
      } catch (error) {
        console.error("Error al eliminar el profesional:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "No se pudo eliminar el profesional"
        });
      }
    }
  };

  const handleBusqueda = (e) => {
    const textoBusqueda = e.target.value.toLowerCase();
    setBusqueda(textoBusqueda);

    const resultadosFiltrados = profesionales.filter((profesional) =>
      profesional.especialidad.toLowerCase().includes(textoBusqueda)
    );

    setProfesionalesFiltrados(resultadosFiltrados);
  };

  const ordenarTabla = (columna) => {
    const nuevosPrestadores = [...profesionalesFiltrados];
    nuevosPrestadores.sort((a, b) => {
      const valorA = a[columna].toString().toLowerCase();
      const valorB = b[columna].toString().toLowerCase();
      return ordenAscendente
        ? valorA.localeCompare(valorB)
        : valorB.localeCompare(valorA);
    });

    setProfesionalesFiltrados(nuevosPrestadores);
    setOrdenColumna(columna);
    setOrdenAscendente(!ordenAscendente);
  };

  return (
    <div className="MainCartilla">
      <div className="col-xl-10 m-auto">
        <div className="divBusqueda">
          <input
            type="text"
            placeholder="Buscar por especialidad 🔎"
            className="input-buscar"
            value={busqueda}
            onChange={handleBusqueda} 
          />
        </div>
        
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th onClick={() => ordenarTabla("especialidad")}>
                  Especialidad {ordenColumna === "especialidad" && (ordenAscendente ? "▲" : "▼")}
                </th>
                <th onClick={() => ordenarTabla("prestador")}>
                  Prestador {ordenColumna === "prestador" && (ordenAscendente ? "▲" : "▼")}
                </th>
                <th onClick={() => ordenarTabla("clinica")}>
                  Clínica {ordenColumna === "clinica" && (ordenAscendente ? "▲" : "▼")}
                </th>
                <th onClick={() => ordenarTabla("horario")}>
                  Horarios {ordenColumna === "horario" && (ordenAscendente ? "▲" : "▼")}
                </th>
                {userNombre === "admin" && (
                  <th>Acciones</th>
                )}
              </tr>
            </thead>

            <tbody>
              {profesionalesFiltrados.length > 0 ? (
                profesionalesFiltrados.map((profesional) => (
                  <tr key={profesional.idProfesionales}>
                    <td>{profesional.especialidad}</td>
                    <td>{profesional.prestador}</td>
                    <td>{profesional.clinica}</td>
                    <td>{profesional.horarios}</td>
                    {userNombre === "admin" && (
                      <td>
                        <button
                         className="btn btn-warning text-white"
                          onClick={() => ""}
                        >
                          Editar
                        </button>
                        <button
                          className="btn btn-danger"
                          onClick={() => borrarProfesional(profesional.idProfesionales)}
                        >
                          Eliminar
                        </button>
                      </td>
                    )}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={userNombre === "admin" ? "5" : "4"}>
                    No se encontraron profesionales
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MainCartilla;
