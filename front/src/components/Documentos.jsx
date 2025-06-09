import axios from "axios";
import { useEffect, useState } from "react";
import "../Css/Documento.css";
import Swal from "sweetalert2";

export const Documentos = () => {
  const [titulo, setTitulo] = useState("");
  const [file, setFile] = useState(null);
  const [documentos, setDocumentos] = useState([]);
  const [buscarDoc, setBuscarDoc] = useState("");
  const [fileName, setFileName] = useState("");
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  const fetchDocumentos = async () => {
    try {
      const response = await axios.get("http://localhost:8000/documentos");
      setDocumentos(response.data);
    } catch (error) {
      console.error("Error al obtener documentos:", error);
    }
  };

  useEffect(() => {
    fetchDocumentos();
  }, []);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("documento", file);
    formData.append("titulo", titulo);

    try {
      await axios.post("http://localhost:8000/documentos", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      Swal.fire({
        icon: "success",
        title: "Documento agregado correctamente",
      });
      fetchDocumentos();
      setTitulo("");
      setFile(null);
      setFileName("");
      setMostrarFormulario(false);
    } catch (error) {}
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/documentos/${id}`);
      Swal.fire({
        icon: "warning",
        title: "Atencion!",
        text: "Se acaba de eliminar un documento",
      });
      fetchDocumentos();
    } catch (error) {
      console.error("Error al eliminar documento:", error);
    }
  };

  const handleView = (filename) => {
    window.open(`http://localhost:8000/uploads/${filename}`, "_blank");
  };

  const filteredDocuments = documentos.filter((doc) =>
    doc.titulo.toLowerCase().includes(buscarDoc.toLowerCase())
  );

  return (
    <div className="pt-3">
      <div className="pb-3">
        <input
          type="text"
          placeholder="Buscar Documento..."
          className="search-input"
          onChange={(e) => setBuscarDoc(e.target.value)}
          value={buscarDoc}
        />
        <br />

        <button
          className={` ${
            mostrarFormulario ? "btn btn-danger" : "boton-agregar"
          } `}
          onClick={() => setMostrarFormulario(!mostrarFormulario)}
        >
          {mostrarFormulario ? "Cancelar" : "Agregar un nuevo documento"}
        </button>

        {mostrarFormulario && (
          <div className="body-file-upload">
            <input
              type="text"
              className="search-input"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              placeholder="Título del Documento"
            />
            <div className="custom-file-upload">
              <input
                type="file"
                id="fileInput"
                onChange={handleFileChange}
                style={{ display: "none" }}
              />
              <label htmlFor="fileInput" className="btn btn-info">
                Seleccionar Archivo
              </label>
              <span>{fileName}</span>
            </div>

            <div className="botones-documentos">
              <button className="boton-agregar" onClick={handleUpload}>
                Agregar
              </button>
            </div>
          </div>
        )}
      </div>

      <table
        className="table table-hover table-condensed table-bordered bootstrap-datatable dataTable table-dark"
        id="Documentos"
        aria-describedby="Documentos_info"
      >
        <thead>
          <tr role="row">
            <td colSpan="6" style={{ textAlign: "center", fontWeight: "bold" }}>
              Todos Los Documentos
            </td>
          </tr>
        </thead>
        <tbody>
          {filteredDocuments.length > 0 ? (
            filteredDocuments.map((documento) => (
              <tr className="odd" key={documento.documentosid}>
                <td style={{ fontWeight: "bold", color: "white" }}>
                  {documento.titulo}
                </td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(documento.documentosid)}
                  >
                    Eliminar
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-primary"
                    onClick={() => handleView(documento.documento)}
                  >
                    Ver
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">No se encontraron documentos</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Documentos;
