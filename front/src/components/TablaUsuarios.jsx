import { useContext } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { UserContext } from "../context/UserContext";
import "../Css/tablaUsuarios.css";
import PropTypes from "prop-types";

export const TablaUsuarios = ({
  usuarios = [],
  handleToggleEditar,
  getUsuarios,
}) => {
  const { userId, setUserIdEdit } = useContext(UserContext);

  const handleEditar = (id) => {
    handleToggleEditar(id);
    setUserIdEdit(id);
  };

  const handleDelete = async (id) => {
    try {
      if (parseInt(id) === parseInt(userId)) {
        Swal.fire({
          icon: "warning",
          title: "Acción no permitida",
          html: `
            <b>No puedes borrarte a ti mismo.</b><br>
            Por seguridad, no es posible eliminar tu propia cuenta de usuario.<br><br>
            <i class="fa-solid fa-shield-halved" style="color:#6b9c7a;font-size:2rem;"></i>
          `,
          confirmButtonText: "Entendido",
          confirmButtonColor: "#6b9c7a",
          timer: 4000,
          timerProgressBar: true,
        });
      } else {
        await axios.delete(`http://localhost:8000/login/${id}`);
        Swal.fire({
          icon: "success",
          title: "Usuario eliminado",
          html: `
            <b>El usuario ha sido eliminado correctamente.</b><br>
            La operación se completó con éxito.<br><br>
            <i class="fa-solid fa-check-circle" style="color:#6b9c7a;font-size:2rem;"></i>
          `,
          showConfirmButton: false,
          timer: 2500,
          timerProgressBar: true,
        });
        getUsuarios();
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error inesperado",
        html: `
          <b>Ocurrió un error al eliminar el usuario.</b><br>
          Por favor, intente nuevamente más tarde.<br><br>
          <i class="fa-solid fa-triangle-exclamation" style="color:#dc3545;font-size:2rem;"></i>
        `,
        confirmButtonText: "Intentar de nuevo",
        confirmButtonColor: "#6b9c7a",
        timer: 5000,
        timerProgressBar: true,
      });
    }
  };

  // Función para obtener la inicial del usuario
  const getInitial = (nombre) => nombre?.charAt(0)?.toUpperCase() || "U";

  // Colores de badge por rol
  const badgeColors = {
    Administrador: "badge-admin",
    Recepcionista: "badge-recepcionista",
    Médico: "badge-medico",
    Enfermero: "badge-enfermero",
    Secretaria: "badge-secretaria",
    Contador: "badge-contador",
    Farmacéutico: "badge-farmaceutico",
    Laboratorista: "badge-laboratorista",
  };

  // Simulación de último acceso (en real, vendría del backend)
  const getUltimoAcceso = (usuario) => usuario.ultimoAcceso || "Hace 1 hora";

  return (
    <div className="usuarios-table-wrapper">
      <div className="usuarios-table-header">
        <h2 className="usuarios-table-title">Lista de Usuarios</h2>
        <p className="usuarios-table-subtitle">
          {usuarios.length} usuarios encontrados
        </p>
      </div>
      <div className="usuarios-table-scroll">
        <table className="usuarios-table">
          <thead>
            <tr>
              <th>Usuario</th>
              <th>Rol</th>
              <th>Último Acceso</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.length > 0 ? (
              usuarios.map((usuario) => (
                <tr key={usuario.usersid}>
                  <td>
                    <div className="usuarios-table-usercell">
                      <span className="usuarios-table-avatar">
                        {getInitial(usuario.nomUser)}
                      </span>
                      <span className="usuarios-table-username">
                        {usuario.nomUser}
                      </span>
                    </div>
                  </td>
                  <td>
                    <span className={`usuarios-table-badge ${badgeColors[usuario.rol] || ""}`}>
                      {usuario.rol}
                    </span>
                  </td>
                  <td>
                    <span className="usuarios-table-lastaccess">
                      {getUltimoAcceso(usuario)}
                    </span>
                  </td>
                  <td>
                    <div className="usuarios-table-actions">
                      <button className="usuarios-table-action-btn view" title="Ver">
                        <i className="fa-solid fa-eye"></i>
                      </button>
                      <button className="usuarios-table-action-btn edit" title="Editar" onClick={() => handleEditar(usuario.usersid)}>
                        <i className="fa-solid fa-pen-to-square"></i>
                      </button>
                      <button className="usuarios-table-action-btn delete" title="Eliminar" onClick={() => handleDelete(usuario.usersid)}>
                        <i className="fa-solid fa-trash"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" style={{ textAlign: "center" }}>
                  No se encontraron usuarios
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

TablaUsuarios.propTypes = {
  usuarios: PropTypes.array,
  handleToggleEditar: PropTypes.func,
  getUsuarios: PropTypes.func,
};

export default TablaUsuarios;
