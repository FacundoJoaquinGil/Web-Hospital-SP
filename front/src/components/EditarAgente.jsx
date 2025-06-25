import { useContext, useState, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import axios from "axios";
import "../Css/agregrarUsuario.css";
import Swal from 'sweetalert2';
import PropTypes from 'prop-types';

export const EditarAgente = ({ handleToggleUser }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { userIdEdit } = useContext(UserContext);

  const handleCancelar = () => {
    handleToggleUser();
  };

  const getUsuario = async () => {
    const url = "http://localhost:8000/login/usuario/";
    try {
      const resp = await axios.get(url + userIdEdit);
      const userData = resp.data || {};
      setUsername(userData.nomUser || "");
      setPassword(userData.pass || "");
    } catch (err) {
      console.error("Error al obtener usuario:", err);
    }
  };

  useEffect(() => {
    getUsuario();
  }, [userIdEdit]);

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = "http://localhost:8000/agentes/editarUsuario";
      const updatedUser = {
        usersid: userIdEdit,
        nomUser: username,
        pass: password,
      };
      await axios.put(url, updatedUser);
      Swal.fire({
        icon: "success",
        title: "Usuario actualizado",
        html: `
          <b>El usuario ha sido editado correctamente.</b><br>
          Los cambios han sido guardados en el sistema.<br><br>
          <i class="fa-solid fa-user-pen" style="color:#6b9c7a;font-size:2rem;"></i>
        `,
        showConfirmButton: false,
        timer: 2500,
        timerProgressBar: true,
      });
      handleToggleUser();
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Error al actualizar",
        html: `
          <b>Ocurrió un error al intentar actualizar el usuario.</b><br>
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

  return (
    <form className="form-doc-nuevo" onSubmit={handleOnSubmit} style={{maxWidth: 600, margin: '0 auto', background: '#fff', borderRadius: 16, padding: '2.5rem 2rem', boxShadow: '0 2px 8px rgba(44,101,72,0.07)'}}>
      <h2 className="usuarios-gestion-title" style={{fontSize: '2rem', marginBottom: '0.5rem'}}>Editar Usuario</h2>
      <p className="usuarios-gestion-desc" style={{marginBottom: '2rem'}}>Modifica los datos del usuario seleccionado</p>
      <div className="form-doc-grid">
        <div>
          <label className="agregar-profesional-label">Nombre de Usuario</label>
          <input type="text" className="agregar-profesional-input" name="username" value={username} onChange={e => setUsername(e.target.value)} placeholder="Ingrese el nombre de usuario" required />
        </div>
        <div>
          <label className="agregar-profesional-label">Contraseña</label>
          <input type="password" className="agregar-profesional-input" name="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Ingrese la contraseña" required />
        </div>
      </div>
      <div style={{display: 'flex', gap: '1rem', justifyContent: 'flex-end', marginTop: '2.2rem'}}>
        <button type="button" className="usuarios-gestion-add-btn" style={{background: '#e0e0e0', color: '#346548'}} onClick={handleCancelar}>
          Cancelar
        </button>
        <button type="submit" className="usuarios-gestion-add-btn" style={{display:'flex',alignItems:'center',gap:'0.7rem',background:'#346548'}}>
          <i className="fa-solid fa-pen-to-square"></i> Guardar Cambios
        </button>
      </div>
    </form>
  );
};

EditarAgente.propTypes = {
  handleToggleUser: PropTypes.func.isRequired,
};

export default EditarAgente;
