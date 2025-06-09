import { Link, useNavigate } from "react-router-dom";
import "../Css/MainLogin.css";
import { useContext, useState } from "react";
import axios from "axios";
import { UserContext } from "../context/UserContext";
import { useForm } from "../hooks/useForm";
import Footer from "./Footer";
import Swal from "sweetalert2";

export const MainLogin = () => {
  let navigate = useNavigate();

  const { handleLogear, getUser, getUserId, userId, userNombre } =
    useContext(UserContext);
  const { valuesForm, onInputChange } = useForm({
    usuario: "",
    contraseña: "",
  });

  const handleSubmit = async () => {
    axios
      .post("http://localhost:8000/login/login", valuesForm)
      .then((resp) => {
        handleLogear(true);
        getUser(valuesForm.usuario);
        getUserId(resp.data.userId);

        const saludo = `Bienvenido ${valuesForm.usuario}`;

        navigate("/", { replace: true });
        Swal.fire({
          position: "top",
          title: saludo,
          showConfirmButton: false,
          timer: 1000,
        });
      })
      .catch(() => {
        Swal.fire({
          icon: "error",
          title: "Error!",
          text: "usuario o contraseña incorrectos",
        });
      });
  };

  return (
    <div className="">
      <div className="bodyLogin">
        <div className="Login" data-aos="flip-left">
          <form className="form1">
            <h1 className="titulo1">
              Area Operativa <br />
              San Pablo
            </h1>

            <div className="inp1">
              <input
                className="input1"
                type="text"
                placeholder="Ingresar usuario"
                name="usuario"
                onChange={onInputChange}
              />
            </div>

            <div className="inp1">
              <input
                className="input1"
                type="password"
                placeholder="Ingresar contraseña"
                name="contraseña"
                onChange={onInputChange}
              />
            </div>

            <Link to={""}>
              <button type="submit" className="submit1" onClick={handleSubmit}>
                Ingresar
              </button>
            </Link>
            <Link to={"/"} className="btnVolver">
              <button type="submit" className="submit1">
                Volver a inicio
              </button>
            </Link>
          </form>
          <div className="banner1">
            <h1 className="Bienvenido1">Bienvenido{userNombre}</h1>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MainLogin;
