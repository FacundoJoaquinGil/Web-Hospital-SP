import AdminUsuarios from "./AdminUsuarios";
import { useContext, useState, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import AdminDocumentos from "./AdminDocumentos";
import Profecionales from "./Profecionales";
import AdminNoticias from "./AdminNoticias";
import AdminHorarios from "./AdminHorarios";
import '../Css/PanelControl.css';
import axios from "axios";

// Nuevo componente para gestión de profesionales
const AdminProfesionales = () => {
  const [profesionales, setProfesionales] = useState([]);
  const [filtro, setFiltro] = useState("");
  const [profesionalesFiltrados, setProfesionalesFiltrados] = useState([]);
  const [paginaActual, setPaginaActual] = useState(1);
  const profesionalesPorPagina = 10;

  // Obtener profesionales
  const getProfesionales = () => {
    axios.get("http://localhost:8000/profesionales/")
      .then((resp) => {
        setProfesionales(resp.data);
        setProfesionalesFiltrados(resp.data);
      })
      .catch((error) => console.error("Error al obtener profesionales", error));
  };

  useEffect(() => {
    getProfesionales();
  }, []);

  useEffect(() => {
    const resultado = profesionales.filter((profesional) =>
      profesional.prestador.toLowerCase().includes(filtro.toLowerCase())
    );
    setProfesionalesFiltrados(resultado);
    setPaginaActual(1);
  }, [filtro, profesionales]);

  // Paginación
  const indiceUltimo = paginaActual * profesionalesPorPagina;
  const indicePrimero = indiceUltimo - profesionalesPorPagina;
  const profesionalesPagina = profesionalesFiltrados.slice(indicePrimero, indiceUltimo);
  const totalPaginas = Math.ceil(profesionalesFiltrados.length / profesionalesPorPagina);
  const irAPagina = (numero) => setPaginaActual(numero);
  const paginaAnterior = () => setPaginaActual((prev) => Math.max(prev - 1, 1));
  const paginaSiguiente = () => setPaginaActual((prev) => Math.min(prev + 1, totalPaginas));

  return (
    <div className="usuarios-gestion-wrapper">
      <div className="usuarios-gestion-header">
        <div>
          <h1 className="usuarios-gestion-title">Gestión de Profesionales</h1>
          <p className="usuarios-gestion-desc">Administra los profesionales del sistema hospitalario</p>
        </div>
        <button
          className="usuarios-gestion-add-btn"
          onClick={() => {
            // Aquí puedes agregar la lógica para mostrar el formulario de agregar profesional si lo implementas
          }}
        >
          <i className="fa-solid fa-user-plus"></i> Agregar Profesional
        </button>
      </div>
      <div className="usuarios-gestion-toolbar">
        <div className="usuarios-gestion-searchbox">
          <i className="fa-solid fa-magnifying-glass"></i>
          <input
            type="text"
            className="usuarios-gestion-search-input"
            placeholder="Buscar por nombre de profesional ..."
            value={filtro}
            onChange={(e) => setFiltro(e.target.value)}
          />
          {filtro && (
            <button
              type="button"
              className="clear-search-btn"
              onClick={() => setFiltro('')}
              aria-label="Limpiar búsqueda"
            >
              ×
            </button>
          )}
        </div>
        <div className="usuarios-gestion-toolbar-actions">
          <button className="usuarios-gestion-toolbar-btn">
            <i className="fa-solid fa-filter"></i> Filtros
          </button>
          <button className="usuarios-gestion-toolbar-btn">
            <i className="fa-solid fa-download"></i> Exportar
          </button>
        </div>
      </div>
      <div className="usuarios-gestion-content">
        {/* Aquí puedes agregar lógica para mostrar formularios de agregar/editar profesional */}
        <div className="usuarios-table-wrapper">
          <div className="usuarios-table-header">
            <h2 className="usuarios-table-title">Lista de Profesionales</h2>
            <p className="usuarios-table-subtitle">
              {profesionalesFiltrados.length} profesionales encontrados
            </p>
          </div>
          <div className="usuarios-table-scroll">
            <table className="usuarios-table">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Especialidad</th>
                  <th>Clínica</th>
                  <th>Horarios</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {profesionalesPagina.length > 0 ? (
                  profesionalesPagina.map((profesional) => (
                    <tr key={profesional.idProfesionales}>
                      <td>{profesional.prestador}</td>
                      <td>{profesional.especialidad}</td>
                      <td>{profesional.clinica}</td>
                      <td>{profesional.horarios}</td>
                      <td>
                        <div className="usuarios-table-actions">
                          <button className="usuarios-table-action-btn edit" title="Editar">
                            <i className="fa-solid fa-pen-to-square"></i>
                          </button>
                          <button className="usuarios-table-action-btn delete" title="Eliminar">
                            <i className="fa-solid fa-trash"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" style={{ textAlign: "center" }}>
                      No se encontraron profesionales
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
            {/* Paginación */}
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
      </div>
    </div>
  );
};

export const MainControl = () => {
  const [activeComponent, setActiveComponent] = useState("usuarios");
  const { userNombre } = useContext(UserContext);

  // Estados para los contadores dinámicos
  const [usuariosCount, setUsuariosCount] = useState(null);
  const [documentosCount, setDocumentosCount] = useState(null);
  const [profesionalesCount, setProfesionalesCount] = useState(null);

  useEffect(() => {
    // Obtener cantidad de usuarios
    axios.get("http://localhost:8000/login")
      .then(resp => setUsuariosCount(resp.data.length))
      .catch(() => setUsuariosCount(null));
    // Obtener cantidad de documentos
    axios.get("http://localhost:8000/documentos")
      .then(resp => setDocumentosCount(resp.data.length))
      .catch(() => setDocumentosCount(null));
    // Obtener cantidad de profesionales
    axios.get("http://localhost:8000/profesionales/")
      .then(resp => setProfesionalesCount(resp.data.length))
      .catch(() => setProfesionalesCount(null));
  }, []);

  const menuItems = [
    { id: "usuarios", label: "Usuarios", icon: "fa-users", count: usuariosCount, component: <AdminUsuarios /> },
    { id: "documentos", label: "Documentos", icon: "fa-file-alt", count: documentosCount, component: <AdminDocumentos /> },
    // { id: "profesionales", label: "Agregar Profesional", icon: "fa-user-plus", count: null, component: <Profecionales /> }, // Oculto temporalmente
    { id: "gestionar-profesionales", label: "Gestionar Profesionales", icon: "fa-user-doctor", count: profesionalesCount, component: <AdminProfesionales /> },
    { id: "noticias", label: "Gestionar Noticias", icon: "fa-newspaper", count: 45, component: <AdminNoticias /> },
    { id: "horarios", label: "Gestionar Horarios", icon: "fa-clock", count: null, component: <AdminHorarios /> }
  ];

  return (
    <div className="panel-control-main">
      <h1 className="panel-control-title">
        Bienvenido <span>{userNombre}</span>
      </h1>
      
      <h3 className="panel-control-subtitle">Panel de Control</h3>
      
      <div className="panel-control-container">
        <div className="row">
          <div className="col-xl-4">
            <div className="menu-buttons">
              <ul className="panel-menu-list">
                {menuItems.map((item) => (
                  <li
                    key={item.id}
                    className={`panel-menu-item${activeComponent === item.id ? " panel-menu-item-active" : ""}`}
                    onClick={() => setActiveComponent(item.id)}
                  >
                    <span className="panel-menu-icon">
                      <i className={`fa-solid ${item.icon}`}></i>
                    </span>
                    <span className="panel-menu-label">{item.label}</span>
                    {item.count !== null && item.count !== undefined && (
                      <span className="panel-menu-badge">{item.count}</span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="col-xl-8">
            {menuItems.find(item => item.id === activeComponent)?.component}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainControl;
