import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import "../Css/AdminNoticias.css";

export const AdminNoticias = () => {
  const [noticias, setNoticias] = useState([]);
  const [filtro, setFiltro] = useState("");
  const [noticiasFiltradas, setNoticiasFiltradas] = useState([]);
  const [toggleAgregar, setToggleAgregar] = useState(false);
  const [nuevaNoticia, setNuevaNoticia] = useState({
    titulo: "",
    contenido: "",
    imagen: "",
    fecha: new Date().toISOString().split('T')[0]
  });

  const getNoticias = () => {
    axios
      .get("http://localhost:8000/noticias")
      .then((resp) => {
        setNoticias(resp.data);
        setNoticiasFiltradas(resp.data);
      })
      .catch((error) => console.error("Error al obtener noticias:", error));
  };

  useEffect(() => {
    getNoticias();
  }, []);

  useEffect(() => {
    const resultado = noticias.filter((noticia) =>
      noticia.titulo.toLowerCase().includes(filtro.toLowerCase())
    );
    setNoticiasFiltradas(resultado);
  }, [filtro, noticias]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNuevaNoticia({
      ...nuevaNoticia,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8000/noticias/agregar", nuevaNoticia);
      Swal.fire({
        icon: "success",
        title: "Noticia agregada correctamente",
        showConfirmButton: false,
        timer: 1500
      });
      setToggleAgregar(false);
      setNuevaNoticia({
        titulo: "",
        contenido: "",
        imagen: "",
        fecha: new Date().toISOString().split('T')[0]
      });
      getNoticias();
    } catch (error) {
      console.error("Error al agregar noticia:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudo agregar la noticia"
      });
    }
  };

  const handleDelete = async (id) => {
    try {
      const result = await Swal.fire({
        title: '¿Estás seguro?',
        text: "Esta acción no se puede deshacer",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar'
      });

      if (result.isConfirmed) {
        await axios.delete(`http://localhost:8000/noticias/borrar/${id}`);
        Swal.fire({
          icon: "success",
          title: "Noticia eliminada correctamente",
          showConfirmButton: false,
          timer: 1500
        });
        getNoticias();
      }
    } catch (error) {
      console.error("Error al eliminar la noticia:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudo eliminar la noticia"
      });
    }
  };

  return (
    <div className="admin-noticias-container">
      <div className="admin-noticias-header">
        <input
          type="text"
          className="search-input"
          placeholder="Buscar noticias..."
          value={filtro}
          onChange={(e) => setFiltro(e.target.value)}
        />
        <button
          className="btn-agregar"
          onClick={() => setToggleAgregar(!toggleAgregar)}
        >
          {toggleAgregar ? "Cancelar" : "Agregar Noticia"}
        </button>
      </div>

      {toggleAgregar && (
        <form onSubmit={handleSubmit} className="form-noticia">
          <div className="form-group">
            <label>Título:</label>
            <input
              type="text"
              name="titulo"
              value={nuevaNoticia.titulo}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Contenido:</label>
            <textarea
              name="contenido"
              value={nuevaNoticia.contenido}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label>URL de la imagen:</label>
            <input
              type="text"
              name="imagen"
              value={nuevaNoticia.imagen}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Fecha:</label>
            <input
              type="date"
              name="fecha"
              value={nuevaNoticia.fecha}
              onChange={handleInputChange}
              required
            />
          </div>
          <button type="submit" className="btn-submit">
            Guardar Noticia
          </button>
        </form>
      )}

      <div className="noticias-list">
        {noticiasFiltradas.map((noticia) => (
          <div key={noticia.id} className="noticia-card">
            <img src={noticia.imagen} alt={noticia.titulo} className="noticia-imagen" />
            <div className="noticia-content">
              <h3>{noticia.titulo}</h3>
              <p>{noticia.contenido}</p>
              <p className="noticia-fecha">{new Date(noticia.fecha).toLocaleDateString()}</p>
              <button
                className="btn-eliminar"
                onClick={() => handleDelete(noticia.id)}
              >
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminNoticias; 