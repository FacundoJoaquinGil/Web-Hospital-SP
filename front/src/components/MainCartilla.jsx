import { useState, useEffect, useContext } from "react";
import "../Css/MainCartilla.css";
import axios from "axios";
import { UserContext } from "../context/UserContext";
import Swal from 'sweetalert2';

export const MainCartilla = () => {
  const [busqueda, setBusqueda] = useState("");
  const [profesionales, setProfesionales] = useState([]);
  const [profesionalesFiltrados, setProfesionalesFiltrados] = useState([]);
  const { userNombre } = useContext(UserContext);
  const [paginaActual, setPaginaActual] = useState(1);
  const profesionalesPorPagina = 10;

  // Calcular los profesionales a mostrar según la página actual
  const indiceUltimo = paginaActual * profesionalesPorPagina;
  const indicePrimero = indiceUltimo - profesionalesPorPagina;
  const profesionalesPagina = profesionalesFiltrados.slice(indicePrimero, indiceUltimo);
  const totalPaginas = Math.ceil(profesionalesFiltrados.length / profesionalesPorPagina);

  // Cambiar de página
  const irAPagina = (numero) => setPaginaActual(numero);
  const paginaAnterior = () => setPaginaActual((prev) => Math.max(prev - 1, 1));
  const paginaSiguiente = () => setPaginaActual((prev) => Math.min(prev + 1, totalPaginas));

  // Reiniciar a la primera página cuando cambia la búsqueda o el filtrado
  useEffect(() => {
    setPaginaActual(1);
  }, [busqueda, profesionalesFiltrados.length]);

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

  return (
    <div className="MainCartilla">
      <div className="col-xl-10 m-auto">
        <div className="divBusqueda">
          <form className="cartilla-buscador-form" onSubmit={e => {
            e.preventDefault();
            const textoBusqueda = busqueda.toLowerCase();
            if (!textoBusqueda) {
              setProfesionalesFiltrados(profesionales);
              return;
            }
            const resultadosFiltrados = profesionales.filter((profesional) =>
              profesional.especialidad.toLowerCase().includes(textoBusqueda)
            );
            setProfesionalesFiltrados(resultadosFiltrados);
          }}>
            <input
              type="text"
              placeholder="Buscar doctores, servicios, turnos..."
              className="cartilla-buscador-input"
              value={busqueda}
              onChange={e => setBusqueda(e.target.value)}
            />
            {busqueda && (
              <button
                type="button"
                className="cartilla-buscador-clear"
                aria-label="Limpiar búsqueda"
                onClick={() => {
                  setBusqueda("");
                  setProfesionalesFiltrados(profesionales);
                }}
              >
                <svg width="22" height="22" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="11" cy="11" r="10" fill="#f3f6f4"/><path d="M8 8l6 6M14 8l-6 6" stroke="#6b9c7a" strokeWidth="2" strokeLinecap="round"/></svg>
              </button>
            )}
            <button className="cartilla-buscador-btn" type="submit">
              <svg width="18" height="18" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="8" cy="8" r="7" stroke="#fff" strokeWidth="2"/><path d="M17 17l-3-3" stroke="#fff" strokeWidth="2" strokeLinecap="round"/></svg>
              <span>Buscar</span>
            </button>
          </form>
        </div>
        
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th>
                  Especialidad
                </th>
                <th>
                  Prestador
                </th>
                <th>
                  Clínica
                </th>
                <th>
                  Horarios
                </th>
                {userNombre === "admin" && (
                  <th>Acciones</th>
                )}
              </tr>
            </thead>

            <tbody>
              {profesionalesFiltrados.length > 0 ? (
                profesionalesPagina.map((profesional) => (
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
        {/* Controles de paginación */}
        {totalPaginas > 1 && (
          <div className="cartilla-paginacion-container">
            <button className="cartilla-paginacion-btn" onClick={paginaAnterior} disabled={paginaActual === 1}>
              Anterior
            </button>
            {Array.from({ length: totalPaginas }, (_, i) => (
              <button
                key={i + 1}
                className={`cartilla-paginacion-btn cartilla-paginacion-num${paginaActual === i + 1 ? ' cartilla-paginacion-btn-activo' : ''}`}
                onClick={() => irAPagina(i + 1)}
              >
                {i + 1}
              </button>
            ))}
            <button className="cartilla-paginacion-btn" onClick={paginaSiguiente} disabled={paginaActual === totalPaginas}>
              Siguiente
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MainCartilla;
