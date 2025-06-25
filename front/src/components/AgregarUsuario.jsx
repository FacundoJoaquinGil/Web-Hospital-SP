import { useState, useEffect } from 'react';
import "../Css/agregrarUsuario.css";
import axios from "axios";
import Swal from 'sweetalert2';
import PropTypes from 'prop-types';

export const AgregarUsuario = ({ handleToggleUser }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [rol, setRol] = useState("Usuario");
  const [estado, setEstado] = useState("Activo");
  const [usuarios, setUsuarios] = useState();

  const handleCancelar = () => {
    handleToggleUser();
  };

  const getUsuarios = ()=>{
    axios.get("http://localhost:8000/login")
      .then((resp) => {
        setUsuarios(resp.data)
      })
  }

  useEffect(() => {
    getUsuarios()
  }, [])

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const usuarioExistente = usuarios.find((usuario) => usuario.nomUser === username);
    if (usuarioExistente) {
      Swal.fire({
        icon: "warning",
        title: "Usuario existente",
        html: `
          <b>Ya existe un usuario con este nombre.</b><br>
          Por favor, elija un nombre de usuario diferente.<br><br>
          <i class="fa-solid fa-user-exclamation" style="color:#6b9c7a;font-size:2rem;"></i>
        `,
        confirmButtonText: "Entendido",
        confirmButtonColor: "#6b9c7a",
        timer: 4000,
        timerProgressBar: true,
      });
      return; 
    }
    try {
      await axios.post("http://localhost:8000/agentes/registrar", {
        user: username,
        pass: password,
        email,
        rol,
        estado
      });
      Swal.fire({
        icon: "success",
        title: "Usuario creado",
        html: `
          <b>El usuario ha sido agregado correctamente.</b><br>
          El nuevo usuario ya está disponible en el sistema.<br><br>
          <i class="fa-solid fa-user-plus" style="color:#6b9c7a;font-size:2rem;"></i>
        `,
        showConfirmButton: false,
        timer: 2500,
        timerProgressBar: true,
      });
      handleToggleUser();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error al crear usuario",
        html: `
          <b>Ocurrió un error al crear el usuario.</b><br>
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
      <h2 className="usuarios-gestion-title" style={{fontSize: '2rem', marginBottom: '0.5rem'}}>Agregar Nuevo Usuario</h2>
      <p className="usuarios-gestion-desc" style={{marginBottom: '2rem'}}>Completa los datos para agregar un nuevo usuario al sistema</p>
      <div className="form-doc-grid">
        <div>
          <label className="agregar-profesional-label">Nombre de Usuario</label>
          <input type="text" className="agregar-profesional-input" name="username" value={username} onChange={e => setUsername(e.target.value)} placeholder="Ingrese el nombre de usuario" required />
        </div>
        <div>
          <label className="agregar-profesional-label">Correo Electrónico</label>
          <input type="email" className="agregar-profesional-input" name="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="usuario@email.com" required />
        </div>
        <div>
          <label className="agregar-profesional-label">Contraseña</label>
          <input type="password" className="agregar-profesional-input" name="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Ingrese la contraseña" required />
        </div>
        <div>
          <label className="agregar-profesional-label">Rol</label>
          <select className="agregar-profesional-input" name="rol" value={rol} onChange={e => setRol(e.target.value)}>
            <option>Usuario</option>
            <option>Administrador</option>
            <option>Médico</option>
            <option>Enfermero</option>
            <option>Farmacéutico</option>
          </select>
        </div>
        <div>
          <label className="agregar-profesional-label">Estado</label>
          <select className="agregar-profesional-input" name="estado" value={estado} onChange={e => setEstado(e.target.value)}>
            <option>Activo</option>
            <option>Inactivo</option>
          </select>
        </div>
      </div>
      <div style={{display: 'flex', gap: '1rem', justifyContent: 'flex-end', marginTop: '2.2rem'}}>
        <button type="button" className="usuarios-gestion-add-btn" style={{background: '#e0e0e0', color: '#346548'}} onClick={handleCancelar}>
          Cancelar
        </button>
        <button type="submit" className="usuarios-gestion-add-btn" style={{display:'flex',alignItems:'center',gap:'0.7rem',background:'#346548'}}>
          <i className="fa-solid fa-plus"></i> Guardar Usuario
        </button>
      </div>
    </form>
  );
};

AgregarUsuario.propTypes = {
  handleToggleUser: PropTypes.func.isRequired,
};

export default AgregarUsuario;
