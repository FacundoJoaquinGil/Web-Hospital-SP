import { useContext } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { UserContext } from "../context/UserContext";

export const TablaUsuarios = ({
  usuarios,
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
          icon: "error",
          title: "Error",
          text: "No puedes borrarte a ti mismo!",
        });
      } else {
        await axios.delete(`http://localhost:8000/login/${id}`);
        Swal.fire({
          icon: "success",
          title: "Usuario borrado correctamente",
        });
        getUsuarios();
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Ocurrió un error inesperado :(",
      });
    }
  };

  return (
    <div>
      <table
        className="table table-hover table-condensed table-bordered bootstrap-datatable dataTable table-dark"
        id="tablausuarios"
        aria-describedby="tablausuarios_info"
      >
        <thead className="">
          <tr>
            <td style={{ fontWeight: "bold", color: "white" }}>Usuarios</td>
            <td style={{ fontWeight: "bold", color: "white" }}>Acciones</td>
            <td style={{ fontWeight: "bold", color: "white" }}></td>
          </tr>
        </thead>
        <tbody>
          {usuarios.length > 0 ? (
            usuarios.map((usuario) => (
              <tr key={usuario.usersid}>
                <td style={{ fontWeight: "bold", color: "white" }}>
                  {usuario.nomUser}
                </td>
                <td>
                  <button
                    className="btn btn-warning btn-sm me-2 text-white"
                    onClick={() => handleEditar(usuario.usersid)}
                  >
                    Editar
                  </button>
                </td>
                <td>
            
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(usuario.usersid)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" style={{ color: "white", textAlign: "center" }}>
                No se encontraron usuarios
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
