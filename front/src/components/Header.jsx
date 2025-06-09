import { useContext, useState } from "react";
import logo from "../assets/logo1.png";
import "../Css/header.css";
import Nav from "react-bootstrap/Nav";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import { UserContext } from "../context/UserContext";
import { Container } from "react-bootstrap";

export const Header = () => {
  const { logeado, handleLogear, setUserNombre } = useContext(UserContext);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();

 
  const handleScroll = () => {
    if (window.scrollY > 50) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };


  window.addEventListener("scroll", handleScroll);

  const handleLogout = () => {

    localStorage.removeItem('user');
    localStorage.removeItem('userId');
    localStorage.removeItem('userNombre');
    handleLogear(false);
    setUserNombre("");

    navigate("/");
  };

  return (
    <header className={`header ${isScrolled ? "scrolled" : ""}`}>
      <Navbar expand="xl" className="custom-navbar">
        <Container fluid>
          <div className="logo-container">
            <Link to="/" className="logo-link">
              <img
                src={logo}
                height="50"
                className="logo-img"
                alt="Logo Hospital San Pablo"
              />
            </Link>
          </div>

          <Navbar.Toggle
            aria-controls="basic-navbar-nav"
            className="custom-toggler"
          />

          <Navbar.Collapse id="basic-navbar-nav" className="contenedor-links">
            <Nav className="nav-links">
              <NavLink to="/" className="nav-link">
                Inicio
              </NavLink>
              <NavLink to="/Historia" className="nav-link">
                Historia
              </NavLink>
              <NavLink to="/noticias" className="nav-link">
                Noticias
              </NavLink>
              <NavLink to="/CartillaMedica" className="nav-link">
                Profesionales
              </NavLink>
              <NavLink to="/HoraAtencion" className="nav-link">
                Horarios
              </NavLink>

              {logeado ? (
                <>
                  <div>
                    <NavLink
                      to="/panelControl"
                      className="nav-link"
                      id="button"
                    >
                      Panel de Control
                    </NavLink>
                  </div>
                  <div>
                    <button
                      id="button"
                      className="nav-link logout-button"
                      onClick={handleLogout}
                    >
                      Salir
                    </button>
                  </div>
                </>
              ) : (
                <div>
                  <Nav.Link
                    href="/Login"
                    id="button"
                    className="nav-link login-link"
                  >
                    Iniciar Sesión
                  </Nav.Link>
                </div>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
