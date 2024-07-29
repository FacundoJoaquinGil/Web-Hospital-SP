CREATE DATABASE HospSanPablo;
USE HospSanPablo;

-- Crear la tabla users primero
CREATE TABLE users (
    usersid INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(50),
    nomUser VARCHAR(50),
    pass VARCHAR(50)
);

-- Crear la tabla roles con la clave foránea después
CREATE TABLE roles (
    rol_id INT AUTO_INCREMENT PRIMARY KEY,
    nombre_rol VARCHAR(50) NOT NULL,
    usersid INT,  -- Agregar la columna usersid
    FOREIGN KEY (usersid) REFERENCES users(usersid)  -- Establecer la clave foránea
);

-- Insertar roles iniciales
INSERT INTO roles (nombre_rol, usersid) VALUES ('Admin', NULL); /*1*/
INSERT INTO roles (nombre_rol, usersid) VALUES ('Agentes', NULL); /*2*/

-- Crear la tabla agentes
CREATE TABLE agentes (
    agentesid INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    apellido VARCHAR(50) NOT NULL,
    dni VARCHAR(50) NOT NULL,
    direccion VARCHAR(50) NOT NULL,
    telefono VARCHAR(50) NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    password_salt VARCHAR(50) NOT NULL,
    rol_id INT,
    usersid INT,
    funcion VARCHAR(50) NOT NULL,
    FOREIGN KEY (rol_id) REFERENCES roles(rol_id),
    FOREIGN KEY (usersid) REFERENCES users(usersid)
);

-- Crear la tabla documentos
CREATE TABLE documentos (
    documentosid INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(200) NOT NULL,
    documento VARCHAR (200) NOT NULL
);

-- Procedimientos almacenados para documentos

DELIMITER //

CREATE PROCEDURE sp_CargarDocumentos(
    IN p_titulo VARCHAR(200),
    IN p_documento VARCHAR(255)
)
BEGIN
    INSERT INTO documentos (titulo, documento)
    VALUES (p_titulo, p_documento);
END //

DELIMITER ;

DELIMITER //

CREATE PROCEDURE sp_EditarDocumentos(
    IN p_documentosid INT,
    IN p_titulo VARCHAR(200),
    IN p_documento VARCHAR(255)
)
BEGIN
    UPDATE documentos
    SET titulo = p_titulo,
        documento = p_documento
    WHERE documentosid = p_documentosid;
END //

DELIMITER ;

DELIMITER //

CREATE PROCEDURE sp_EliminarDocumentos(
    IN p_documentosid INT
)
BEGIN
    DELETE FROM documentos
    WHERE documentosid = p_documentosid;
END //

DELIMITER ;

DELIMITER //

CREATE PROCEDURE sp_ListarDocumentos()
BEGIN
    SELECT * FROM documentos;
END //

DELIMITER ;

DELIMITER //

CREATE PROCEDURE sp_ObtenerDocumentoPorID(
    IN p_documentosid INT
)
BEGIN
    SELECT * FROM documentos
    WHERE documentosid = p_documentosid;
END //

DELIMITER ;

DELIMITER //

CREATE PROCEDURE sp_BuscarDocumentosPorTitulo(
    IN p_titulo VARCHAR(200)
)
BEGIN
    SELECT * FROM documentos
    WHERE titulo LIKE CONCAT('%', p_titulo, '%');
END //

DELIMITER ;

-- Procedimientos almacenados para agentes

DELIMITER //

CREATE PROCEDURE sp_CargarAgentes(
    IN p_nombre VARCHAR(50),
    IN p_apellido VARCHAR(50),
    IN p_dni VARCHAR(50),
    IN p_direccion VARCHAR(50),
    IN p_telefono VARCHAR(50),
    IN p_password_hash VARCHAR(255),
    IN p_password_salt VARCHAR(50),
    IN p_rol_id INT,
    IN p_funcion VARCHAR(50)
)
BEGIN
    INSERT INTO agentes (nombre, apellido, dni, direccion, telefono, password_hash, password_salt, rol_id, funcion)
    VALUES (p_nombre, p_apellido, p_dni, p_direccion, p_telefono, p_password_hash, p_password_salt, p_rol_id, p_funcion);
END //

DELIMITER ;

DELIMITER //

CREATE PROCEDURE sp_EditarAgentes(
    IN p_agentesid INT,
    IN p_nombre VARCHAR(50),
    IN p_apellido VARCHAR(50),
    IN p_dni VARCHAR(50),
    IN p_direccion VARCHAR(50),
    IN p_telefono VARCHAR(50),
    IN p_password_hash VARCHAR(255),
    IN p_password_salt VARCHAR(50),
    IN p_rol_id INT,
    IN p_funcion VARCHAR(50)
)
BEGIN
    UPDATE agentes
    SET nombre = p_nombre,
        apellido = p_apellido,
        dni = p_dni,
        direccion = p_direccion,
        telefono = p_telefono,
        password_hash = p_password_hash,
        password_salt = p_password_salt,
        rol_id = p_rol_id,
        funcion = p_funcion
    WHERE agentesid = p_agentesid;
END //

DELIMITER ;

DELIMITER //

CREATE PROCEDURE sp_EliminarAgentes(
    IN p_agentesid INT
)
BEGIN
    DELETE FROM agentes
    WHERE agentesid = p_agentesid;
END //

DELIMITER ;