CREATE DATABASE IF NOT EXISTS agenda_db;
USE agenda_db;

CREATE TABLE IF NOT EXISTS usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    telefono VARCHAR(20)
);

CREATE TABLE IF NOT EXISTS especialistas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    especialidad VARCHAR(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS servicios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    duracion_min INT DEFAULT 30
);

CREATE TABLE IF NOT EXISTS citas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT,
    especialista_id INT,
    servicio_id INT,
    fecha_hora DATETIME NOT NULL,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id),
    FOREIGN KEY (especialista_id) REFERENCES especialistas(id),
    FOREIGN KEY (servicio_id) REFERENCES servicios(id)
);

-- Datos de prueba para que veas resultados de una vez
INSERT INTO especialistas (nombre, especialidad) VALUES ('Sofía Safar', 'Estética Integral');
INSERT INTO servicios (nombre, duracion_min) VALUES ('Limpieza Facial', 60), ('Masaje Relajante', 45);