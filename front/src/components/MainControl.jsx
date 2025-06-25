import AdminUsuarios from "./AdminUsuarios";
import { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import AdminDocumentos from "./AdminDocumentos";
import Profecionales from "./Profecionales";
import AdminNoticias from "./AdminNoticias";
import AdminHorarios from "./AdminHorarios";
import '../Css/PanelControl.css';

export const MainControl = () => {
  const [activeComponent, setActiveComponent] = useState("usuarios");
  const { userNombre } = useContext(UserContext);

  const menuItems = [
    { id: "usuarios", label: "Usuarios", icon: "fa-users", count: 247, component: <AdminUsuarios /> },
    { id: "documentos", label: "Documentos", icon: "fa-file-alt", count: 1834, component: <AdminDocumentos /> },
    { id: "profesionales", label: "Agregar Profesional", icon: "fa-user-plus", count: null, component: <Profecionales /> },
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
                    {item.count !== null && (
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
