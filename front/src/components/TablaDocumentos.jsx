import axios from "axios";
import Swal from "sweetalert2";
import "../Css/tablaDocumentos.css";
import PropTypes from "prop-types";
import { useState } from "react";

// Función auxiliar para formatear tamaño de archivo
const formatSize = (size) => {
  if (!size) return "-";
  if (size < 1024) return `${size} B`;
  if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)} KB`;
  return `${(size / (1024 * 1024)).toFixed(1)} MB`;
};

export const TablaDocumentos = ({
  documentos = [],
  getDocumentos,
}) => {
  // Paginación
  const [currentPage, setCurrentPage] = useState(1);
  const docsPerPage = 5;

  // Simulación de campos extra si no existen
  const docs = documentos.map((doc) => ({
    ...doc,
    destacado: doc.destacado || false,
    descripcion: doc.descripcion || "Sin descripción disponible.",
    autor: doc.autor || "Desconocido",
    categoria: doc.categoria || "General",
    rol: doc.rol || "Todos",
    fecha: doc.fecha || "2024-01-01",
    fechaMod: doc.fechaMod || doc.fecha || "2024-01-01",
    size: doc.size || 1024 * 1024,
  }));

  // Calcular documentos a mostrar en la página actual
  const indexOfLastDoc = currentPage * docsPerPage;
  const indexOfFirstDoc = indexOfLastDoc - docsPerPage;
  const currentDocs = docs.slice(indexOfFirstDoc, indexOfLastDoc);
  const totalPages = Math.ceil(docs.length / docsPerPage);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/documentos/${id}`);
      Swal.fire({
        icon: "success",
        title: "Documento eliminado",
        html: `
          <b>El documento ha sido eliminado correctamente.</b><br>
          La operación se completó con éxito.<br><br>
          <i class="fa-solid fa-trash-can" style="color:#6b9c7a;font-size:2rem;"></i>
        `,
        showConfirmButton: false,
        timer: 2500,
        timerProgressBar: true,
      });
      getDocumentos();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error inesperado",
        html: `
          <b>Ocurrió un error al eliminar el documento.</b><br>
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

  const handleView = (filename) => {
    window.open(`http://localhost:8000/uploads/${filename}`, "_blank");
  };

  const handleDownload = (filename) => {
    window.open(`http://localhost:8000/uploads/${filename}`, "_blank");
  };

  // Función para obtener la extensión del archivo
  const getFileExtension = (filename) => {
    return filename.split('.').pop().toUpperCase();
  };

  // Función para obtener el icono según el tipo de archivo
  const getFileIcon = (filename) => {
    const ext = getFileExtension(filename).toLowerCase();
    const iconMap = {
      pdf: 'fa-file-pdf',
      doc: 'fa-file-word',
      docx: 'fa-file-word',
      xls: 'fa-file-excel',
      xlsx: 'fa-file-excel',
      ppt: 'fa-file-powerpoint',
      pptx: 'fa-file-powerpoint',
      txt: 'fa-file-lines',
      jpg: 'fa-file-image',
      jpeg: 'fa-file-image',
      png: 'fa-file-image',
      gif: 'fa-file-image'
    };
    return iconMap[ext] || 'fa-file';
  };

  return (
    <div className="doc-table-wrapper">
      <div className="doc-table-header">
        <h2 className="doc-table-title">Lista de Documentos</h2>
        <span className="doc-table-subtitle">
          Mostrando {docs.length} de {docs.length} documentos
        </span>
      </div>
      <div className="doc-table-scroll">
        <table className="doc-table">
          <thead>
            <tr>
              <th>Documento</th>
              <th>Rol</th>
              <th>Fecha</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {currentDocs.length > 0 ? (
              currentDocs.map((doc) => (
                <tr key={doc.documentosid}>
                  {/* Documento */}
                  <td>
                    <div className="doc-maincell">
                      <span className={`doc-fileicon doc-fileicon-${getFileExtension(doc.documento).toLowerCase()}`}> 
                        <i className={`fa-solid ${getFileIcon(doc.documento)}`}></i>
                        <span className="doc-fileext">{getFileExtension(doc.documento)}</span>
                      </span>
                      <div className="doc-maininfo">
                        <div className="doc-title-row">
                          <span className="doc-title">{doc.titulo}</span>
                          {doc.destacado && <span className="doc-star"><i className="fa-solid fa-star"></i></span>}
                        </div>
                        <div className="doc-desc">{doc.descripcion}</div>
                        <div className="doc-meta">
                          <span>Por {doc.autor}</span>
                          <span>· {formatSize(doc.size)}</span>
                        </div>
                      </div>
                    </div>
                  </td>
                  {/* Rol */}
                  <td>
                    <span className="doc-badge">{doc.rol}</span>
                  </td>
                  {/* Fecha */}
                  <td>
                    <div className="doc-fechas">
                      <div className="doc-fecha">{doc.fecha}</div>
                      <div className="doc-fecha-mod">Mod: {doc.fechaMod}</div>
                    </div>
                  </td>
                  {/* Acciones */}
                  <td>
                    <div className="doc-actions">
                      <button 
                        className="doc-action-btn doc-action-view" 
                        title="Ver documento"
                        onClick={() => handleView(doc.documento)}
                      >
                        <i className="fa-solid fa-eye"></i>
                      </button>
                      <button 
                        className="doc-action-btn doc-action-download" 
                        title="Descargar"
                        onClick={() => handleDownload(doc.documento)}
                      >
                        <i className="fa-solid fa-download"></i>
                      </button>
                      <button 
                        className="doc-action-btn doc-action-edit" 
                        title="Editar"
                        disabled
                      >
                        <i className="fa-solid fa-pen"></i>
                      </button>
                      <button 
                        className="doc-action-btn doc-action-delete" 
                        title="Eliminar"
                        onClick={() => handleDelete(doc.documentosid)}
                      >
                        <i className="fa-solid fa-trash"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" style={{ textAlign: "center" }}>
                  No se encontraron documentos
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {/* Paginación */}
      {totalPages > 1 && (
        <div className="doc-pagination">
          <button
            className="doc-page-btn"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            &lt;
          </button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              className={`doc-page-btn${currentPage === i + 1 ? " active" : ""}`}
              onClick={() => handlePageChange(i + 1)}
            >
              {i + 1}
            </button>
          ))}
          <button
            className="doc-page-btn"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            &gt;
          </button>
        </div>
      )}
    </div>
  );
};

TablaDocumentos.propTypes = {
  documentos: PropTypes.array,
  getDocumentos: PropTypes.func,
};

export default TablaDocumentos; 