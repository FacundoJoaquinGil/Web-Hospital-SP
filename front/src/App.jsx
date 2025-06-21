import Home from "./pages/Home";
import { Routes, Route } from "react-router";
import Historia from "./pages/Historia";
import Noticias from "./pages/Noticias";
import CartillaMedica from "./pages/CartillaMedica";
import Nosotros from "./pages/Nosotros";
import HorarioAtencion from "./pages/HorarioAtencion";
import HorarioAdm from "./pages/HorarioAdm";
import Login from "./pages/Login";
import Registro from "./pages/Registro";
import { PanelControl } from "./pages/PanelControl";
import { UserProvider } from './context/UserProvider.jsx';
import { Error404 } from "./components/Error404.jsx";

export function App() {
  return (
    <UserProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Historia" element={<Historia />} />
        <Route path="/Noticias" element={<Noticias />} />
        <Route path="/CartillaMedica" element={<CartillaMedica />} />
        <Route path="/quienes-somos" element={<Nosotros />} />
        <Route path="/HoraAtencion" element={<HorarioAtencion />} />
        <Route path="/HorarioAdm" element={<HorarioAdm />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/panelControl" element={<PanelControl />} />
        <Route path="/*" element={<Error404></Error404>}></Route>
      </Routes>
    </UserProvider>
  );
}

