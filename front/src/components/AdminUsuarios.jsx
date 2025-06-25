import { useEffect, useState } from "react";
import { AgregarUsuario } from "./AgregarUsuario";
import { TablaUsuarios } from "./TablaUsuarios";
import { EditarAgente } from "./EditarAgente";
import axios from "axios";

export const AdminUsuarios = () => {
  const [toggleUser, setToggleUser] = useState(false);
  const [toggleEditar, setToggleEditar] = useState(false);

  const [usuarios, setUsuarios] = useState([]);
  const [filtro, setFiltro] = useState("");
  const [usuariosFiltrados, setUsuariosFiltrados] = useState([]);

  const getUsuarios = () => {
    axios
      .get("http://localhost:8000/login")
      .then((resp) => {
        setUsuarios(resp.data);
        setUsuariosFiltrados(resp.data);
      })
      .catch((error) => console.error("Error al obtener usuarios", error));
  };

  useEffect(() => {
    getUsuarios();
  }, []);

  useEffect(() => {
    const resultado = usuarios.filter((usuario) =>
      usuario.nomUser.toLowerCase().includes(filtro.toLowerCase())
    );
    setUsuariosFiltrados(resultado);
  }, [filtro, usuarios]);

  const handleToggleUser = () => {
    setToggleUser(false);
    getUsuarios();
  };

  const handleToggleEditar = () => {
    setToggleUser(true);
    setToggleEditar(false);
  };

  return (
    <div className="usuarios-gestion-wrapper">
      <div className="usuarios-gestion-header">
        <div>
          <h1 className="usuarios-gestion-title">Gestión de Usuarios</h1>
          <p className="usuarios-gestion-desc">Administra los usuarios del sistema hospitalario</p>
        </div>
        <button
          className="usuarios-gestion-add-btn"
          onClick={() => {
            setToggleUser(true);
            setToggleEditar(true);
          }}
        >
          <i className="fa-solid fa-plus"></i> Agregar Usuario
        </button>
      </div>
      <div className="usuarios-gestion-toolbar">
        <div className="usuarios-gestion-searchbox">
          <i className="fa-solid fa-magnifying-glass"></i>
          <input
            type="text"
            className="usuarios-gestion-search-input"
            placeholder="Buscar por nombre de usuarios ..."
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
        {toggleUser ? (
          <div className="pb-3">
            {toggleEditar ? (
              <AgregarUsuario handleToggleUser={handleToggleUser} />
            ) : (
              <EditarAgente
                handleToggleEditar={handleToggleEditar}
                handleToggleUser={handleToggleUser}
              />
            )}
          </div>
        ) : (
          <TablaUsuarios
            usuarios={usuariosFiltrados}
            handleToggleEditar={handleToggleEditar}
            getUsuarios={getUsuarios}
          />
        )}
      </div>
    </div>
  );
};

export default AdminUsuarios;
