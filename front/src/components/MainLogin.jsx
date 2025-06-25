import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Css/MainLogin.css";
import axios from "axios";
import { UserContext } from "../context/UserContext";
import { useForm } from "../hooks/useForm";
import Swal from "sweetalert2";
import logo1 from "../assets/logo1.png";
import logo2 from "../assets/logo2.png";

export const MainLogin = () => {
  const navigate = useNavigate();
  const { handleLogear, getUser, getUserId } = useContext(UserContext);
  const { valuesForm, onInputChange } = useForm({
    usuario: "",
    contraseña: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8000/login/login", valuesForm)
      .then((resp) => {
        handleLogear(true);
        getUser(valuesForm.usuario);
        getUserId(resp.data.userId);
        Swal.fire({
          icon: "success",
          title: "Acceso concedido",
          html: `<b>Bienvenido, ${valuesForm.usuario}.</b><br>Ha ingresado correctamente al sistema.<br><img src="${logo2}" alt="Logo" style="margin-top:18px;max-width:90px;display:block;margin-left:auto;margin-right:auto;" />`,
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true,
          customClass: {
            title: 'swal2-title',
            popup: 'swal2-popup'
          }
        });
        navigate("/", { replace: true });
      })
      .catch(() => {
        Swal.fire({
          icon: "warning",
          title: "Acceso denegado",
          html: `
            <b>Usuario o contraseña incorrectos.</b><br>
            Por favor, verifique sus datos e intente nuevamente.<br><br>
            <a href="#" style="color:#6b9c7a;text-decoration:none;">¿Olvidó su contraseña?</a>
          `,
          confirmButtonText: "Intentar de nuevo",
          confirmButtonColor: "#6b9c7a",
          timer: 4000,
          timerProgressBar: true,
        });
      });
  };

  return (
    <div className="login-main-wrapper" >
      <div className="login-card-container" data-aos="flip-left">
        {/* Panel Izquierdo */}
        <div className="login-left-panel">
          <div className="login-logo-box">
            <div className="login-logo-icon">
              <img src={logo1} alt="Logo Hospital San Pablo" style={{ width: 32, height: 32, objectFit: 'contain', display: 'block' }} />
            </div>
            <div className="login-logo-title">
              <h1>Hospital San Pablo</h1>
              <span className="login-logo-sub">Sistema Operativo Hospitalario</span>
            </div>
          </div>
          <div className="login-area-title">Área Operativa</div>
          <div className="login-area-desc">Acceso seguro para personal médico y administrativo autorizado</div>
          <div className="login-help-card">
            <div className="login-help-title">¿Necesita ayuda?</div>
            <ul className="login-help-list">
              <li><a href="#contactar-it" className="login-help-link"><span className="login-help-icon"><i className="fa-solid fa-building"></i></span> Contactar IT</a></li>
              <li><a href="#soporte-tecnico" className="login-help-link"><span className="login-help-icon"><i className="fa-solid fa-user-gear"></i></span> Soporte Técnico</a></li>
              <li><a href="#politicas-seguridad" className="login-help-link"><span className="login-help-icon"><i className="fa-solid fa-shield"></i></span> Políticas de Seguridad</a></li>
            </ul>
          </div>
          {/* Alerta de seguridad debajo de la tarjeta de ayuda */}
          <div className="login-security-alert">
            <span className="login-security-alert-icon">
              <i className="fa-solid fa-circle-exclamation"></i>
            </span>
            <span>
            La funcionalidad para registrar profesionales está actualmente restringida a usuarios con permisos de administrador.
            </span>
          </div>
        </div>
        {/* Panel Derecho */}
        <div className="login-right-panel">
          <form className="login-form" onSubmit={handleSubmit} autoComplete="off">
            <h2 className="login-form-title">Iniciar Sesión</h2>
            <p className="login-form-desc">Ingrese sus credenciales para acceder al sistema</p>
            <div className="login-form-group">
              <label htmlFor="login-usuario" className="login-form-label">Usuario</label>
              <div className="login-form-inputbox">
                <i className="fa-regular fa-user" style={{ color: '#7a8c7f', fontSize: '1.2rem', marginRight: '0.7rem' }}></i>
                <input
                  id="login-usuario"
                  className="login-form-input"
                  type="text"
                  name="usuario"
                  placeholder="Nombre de usuario"
                  onChange={onInputChange}
                  autoComplete="username"
                  required
                />
              </div>
            </div>
            <div className="login-form-group">
              <label htmlFor="login-password" className="login-form-label">Contraseña</label>
              <div className="login-form-inputbox">
                <i className="fa-solid fa-lock" style={{ color: '#7a8c7f', fontSize: '1.2rem', marginRight: '0.7rem' }}></i>
                <input
                  id="login-password"
                  className="login-form-input"
                  type={showPassword ? "text" : "password"}
                  name="contraseña"
                  placeholder="********"
                  onChange={onInputChange}
                  autoComplete="current-password"
                  required
                />
                <span onClick={handleTogglePassword} style={{ cursor: 'pointer', marginLeft: '0.7rem' }}>
                  {showPassword ? (
                    <i className="fa-regular fa-eye-slash" style={{ color: '#7a8c7f', fontSize: '1.2rem' }}></i>
                  ) : (
                    <i className="fa-regular fa-eye" style={{ color: '#7a8c7f', fontSize: '1.2rem' }}></i>
                  )}
                </span>
              </div>
            </div>
            <div className="login-form-options">
              <label className="login-form-remember">
                <input type="checkbox" /> Recordar sesión
              </label>
              <a href="#" className="login-form-forgot">¿Olvidó su contraseña?</a>
            </div>
            <button type="submit" className="login-form-submit">
              <i className="fa-solid fa-shield" style={{ marginRight: '0.7rem' }}></i> Acceder al Sistema
            </button>
            <button type="button" className="login-form-back" onClick={() => navigate("/")}>
              <i className="fa-solid fa-house"></i> Volver al inicio
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MainLogin;
