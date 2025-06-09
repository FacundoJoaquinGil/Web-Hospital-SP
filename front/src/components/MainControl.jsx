import { Button } from "react-bootstrap";
import AdminUsuarios from "./AdminUsuarios";
import { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import Documentos from "./Documentos";
import Profecionales from "./Profecionales";
import AdminNoticias from "./AdminNoticias";
import '../Css/PanelControl.css';

export const MainControl = () => {
  const [activeComponent, setActiveComponent] = useState("usuarios");
  const { userNombre } = useContext(UserContext);

  const menuItems = [
    { id: "usuarios", label: "Usuarios", component: <AdminUsuarios /> },
    { id: "documentos", label: "Documentos", component: <Documentos /> },
    { id: "profesionales", label: "Agregar Profesional", component: <Profecionales /> },
    { id: "noticias", label: "Gestionar Noticias", component: <AdminNoticias /> }
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
              {menuItems.map((item) => (
                <Button
                  key={item.id}
                  className={`panel-control-btn ${activeComponent === item.id ? "panel-control-btn-active" : ""}`}
                  onClick={() => setActiveComponent(item.id)}
                >
                  {item.label}
                </Button>
              ))}
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
