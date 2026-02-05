CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    correo VARCHAR(150) NOT NULL UNIQUE,
    contrasena VARCHAR(255) NOT NULL,
    rol ENUM('usuario', 'admin') NOT NULL DEFAULT 'usuario',
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE documentos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre_original VARCHAR(255) NOT NULL,
    nombre_guardado VARCHAR(255) NOT NULL,
    cantidad_registros INT NOT NULL,
    usuario_id INT NOT NULL,
    fecha_carga TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_documentos_usuarios
        FOREIGN KEY (usuario_id)
        REFERENCES usuarios(id)
        ON DELETE CASCADE
);

CREATE TABLE datos_csv (
    id INT AUTO_INCREMENT PRIMARY KEY,
    documento_id INT NOT NULL,
    correo VARCHAR(150) NOT NULL,
    nombre VARCHAR(150) NOT NULL,
    telefono VARCHAR NOT NULL,
    ciudad VARCHAR(100) NOT NULL,
    notas TEXT,

    CONSTRAINT fk_datoscsv_documentos
        FOREIGN KEY (documento_id)
        REFERENCES documentos(id)
        ON DELETE CASCADE
);