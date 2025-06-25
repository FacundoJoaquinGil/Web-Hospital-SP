import { useEffect, useState } from "react";
import { TablaDocumentos } from "./TablaDocumentos";
import axios from "axios";

export const AdminDocumentos = () => {
  const [toggleDocumento, setToggleDocumento] = useState(false);
  const [documentos, setDocumentos] = useState([]);
  const [filtro, setFiltro] = useState("");
  const [documentosFiltrados, setDocumentosFiltrados] = useState([]);

  // Estado para el formulario de agregar documento
  const [formDoc, setFormDoc] = useState({
    titulo: "",
    descripcion: "",
    autor: "",
    rol: "Administrador",
    categoria: "Protocolos Médicos",
    prioridad: "Baja",
    fecha: "",
    version: "v1.0",
    fechaVencimiento: "",
    etiquetas: "",
    destacado: false,
    file: null
  });
  const [fileName, setFileName] = useState("");

  const getDocumentos = () => {
    axios
      .get("http://localhost:8000/documentos")
      .then((resp) => {
        setDocumentos(resp.data);
        setDocumentosFiltrados(resp.data);
      })
      .catch((error) => console.error("Error al obtener documentos", error));
  };

  useEffect(() => {
    getDocumentos();
  }, []);

  useEffect(() => {
    const resultado = documentos.filter((documento) =>
      documento.titulo.toLowerCase().includes(filtro.toLowerCase())
    );
    setDocumentosFiltrados(resultado);
  }, [filtro, documentos]);

  const handleToggleDocumento = () => {
    setToggleDocumento(false);
    getDocumentos();
  };

  // Handlers para el formulario
  const handleFormChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === "checkbox") {
      setFormDoc({ ...formDoc, [name]: checked });
    } else if (type === "file") {
      setFormDoc({ ...formDoc, file: files[0] });
      setFileName(files[0]?.name || "");
    } else {
      setFormDoc({ ...formDoc, [name]: value });
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("documento", formDoc.file);
    formData.append("titulo", formDoc.titulo);
    formData.append("descripcion", formDoc.descripcion);
    formData.append("autor", formDoc.autor);
    formData.append("rol", formDoc.rol);
    formData.append("categoria", formDoc.categoria);
    formData.append("prioridad", formDoc.prioridad);
    formData.append("fecha", formDoc.fecha);
    formData.append("version", formDoc.version);
    formData.append("fechaVencimiento", formDoc.fechaVencimiento);
    formData.append("etiquetas", formDoc.etiquetas);
    formData.append("destacado", formDoc.destacado);
    try {
      await axios.post("http://localhost:8000/documentos", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setFormDoc({
        titulo: "",
        descripcion: "",
        autor: "",
        rol: "Administrador",
        categoria: "Protocolos Médicos",
        prioridad: "Baja",
        fecha: "",
        version: "v1.0",
        fechaVencimiento: "",
        etiquetas: "",
        destacado: false,
        file: null
      });
      setFileName("");
      setToggleDocumento(false);
      getDocumentos();
    } catch (error) {
      alert("Error al agregar documento");
    }
  };

  return (
    <div className="usuarios-gestion-wrapper">
      <div className="usuarios-gestion-header">
        <div>
          <h1 className="usuarios-gestion-title">Gestión de Documentos</h1>
          <p className="usuarios-gestion-desc">Administra los documentos del sistema hospitalario</p>
        </div>
        <button
          className="usuarios-gestion-add-btn"
          onClick={() => setToggleDocumento(true)}
        >
          <i className="fa-solid fa-plus"></i> Agregar Documento
        </button>
      </div>
      <div className="usuarios-gestion-toolbar">
        <div className="usuarios-gestion-searchbox">
          <i className="fa-solid fa-magnifying-glass"></i>
          <input
            type="text"
            className="usuarios-gestion-search-input"
            placeholder="Buscar documentos por título..."
            value={filtro}
            onChange={(e) => setFiltro(e.target.value)}
          />
          {filtro && (
            <button
              type="button"
              className="clear-search-btn"
              onClick={() => setFiltro('')}
              aria-label="Limpiar búsqueda"
            >
              ×
            </button>
          )}
        </div>
      </div>
      <div className="usuarios-gestion-content">
        {toggleDocumento ? (
          <div className="pb-3">
            <form className="form-doc-nuevo" onSubmit={handleFormSubmit} style={{maxWidth: 700, margin: '0 auto', background: '#fff', borderRadius: 16, padding: '2.5rem 2rem', boxShadow: '0 2px 8px rgba(44,101,72,0.07)'}}>
              <h2 className="usuarios-gestion-title" style={{fontSize: '2rem', marginBottom: '0.5rem'}}>Agregar Nuevo Documento</h2>
              <div className="form-doc-grid">
                <div>
                  <label className="agregar-profesional-label">Título del Documento</label>
                  <input type="text" className="agregar-profesional-input" name="titulo" value={formDoc.titulo} onChange={handleFormChange} placeholder="Ingrese el título del documento" required />
                </div>
                <div>
                  <label className="agregar-profesional-label">Categoría</label>
                  <select className="agregar-profesional-input" name="categoria" value={formDoc.categoria} onChange={handleFormChange}>
                    <option>Protocolos Médicos</option>
                    <option>Manuales de Usuario</option>
                    <option>Formularios</option>
                    <option>Políticas y Procedimientos</option>
                    <option>Certificaciones</option>
                    <option>Reportes y Análisis</option>
                  </select>
                </div>
                <div>
                  <label className="agregar-profesional-label">Rol de Acceso</label>
                  <select className="agregar-profesional-input" name="rol" value={formDoc.rol} onChange={handleFormChange}>
                    <option>Administrador</option>
                    <option>Médico</option>
                    <option>Enfermero</option>
                    <option>Farmacéutico</option>
                    <option>Todos</option>
                  </select>
                </div>
                <div>
                  <label className="agregar-profesional-label">Prioridad</label>
                  <select className="agregar-profesional-input" name="prioridad" value={formDoc.prioridad} onChange={handleFormChange}>
                    <option>Baja</option>
                    <option>Media</option>
                    <option>Alta</option>
                  </select>
                </div>
                <div className="form-doc-full">
                  <label className="agregar-profesional-label">Descripción</label>
                  <textarea className="agregar-profesional-input" name="descripcion" value={formDoc.descripcion} onChange={handleFormChange} placeholder="Descripción del documento..." rows={3} />
                </div>
                <div>
                  <label className="agregar-profesional-label">Fecha de Vencimiento (Opcional)</label>
                  <input type="date" className="agregar-profesional-input" name="fechaVencimiento" value={formDoc.fechaVencimiento} onChange={handleFormChange} placeholder="dd/mm/aaaa" />
                </div>
                <div>
                  <label className="agregar-profesional-label">Versión</label>
                  <input type="text" className="agregar-profesional-input" name="version" value={formDoc.version} onChange={handleFormChange} placeholder="v1.0" />
                </div>
                <div className="form-doc-full">
                  <label className="agregar-profesional-label">Etiquetas</label>
                  <input type="text" className="agregar-profesional-input" name="etiquetas" value={formDoc.etiquetas} onChange={handleFormChange} placeholder="Separadas por comas" />
                </div>
                <div className="form-doc-full">
                  <label className="agregar-profesional-label">Subir Archivo</label>
                  <div className="form-doc-upload">
                    <input type="file" id="fileInputDoc" name="file" onChange={handleFormChange} style={{ display: 'none' }} required />
                    <label htmlFor="fileInputDoc" className="form-doc-upload-label">
                      <i className="fa-solid fa-upload" style={{fontSize:'2rem',color:'#6b9c7a',marginBottom:'0.5rem'}}></i>
                      <div>Subir Archivo</div>
                      <div style={{fontSize:'0.98rem',color:'#7a8c7f',marginTop:'0.3rem'}}>Arrastra y suelta tu archivo aquí o haz clic para seleccionar</div>
                      {fileName && <div style={{marginTop:'0.7rem',color:'#346548',fontWeight:'bold'}}>{fileName}</div>}
                    </label>
                  </div>
                </div>
              </div>
              <div style={{display: 'flex', gap: '1rem', justifyContent: 'flex-end', marginTop: '2.2rem'}}>
                <button type="button" className="usuarios-gestion-add-btn" style={{background: '#e0e0e0', color: '#346548'}} onClick={() => setToggleDocumento(false)}>
                  Cancelar
                </button>
                <button type="submit" className="usuarios-gestion-add-btn" style={{display:'flex',alignItems:'center',gap:'0.7rem',background:'#346548'}}>
                  <i className="fa-solid fa-plus"></i> Guardar Documento
                </button>
              </div>
            </form>
          </div>
        ) : (
          <TablaDocumentos
            documentos={documentosFiltrados}
            getDocumentos={getDocumentos}
          />
        )}
      </div>
    </div>
  );
};

export default AdminDocumentos; 