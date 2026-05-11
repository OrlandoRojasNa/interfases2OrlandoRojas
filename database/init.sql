CREATE DATABASE IF NOT EXISTS agenda_db;
USE agenda_db;

-- 1. Usuarios (Clientes y Administradores)
CREATE TABLE IF NOT EXISTS usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    rol ENUM('admin', 'cliente', 'especialista') DEFAULT 'cliente'
) ENGINE=InnoDB;

-- 2. Especialistas (Perfiles profesionales)
CREATE TABLE IF NOT EXISTS especialistas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT,
    nombre_completo VARCHAR(100) NOT NULL,
    especialidad VARCHAR(100),
    biografia TEXT,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- 3. Productos / Servicios (Lo que aparece en el carrito)
CREATE TABLE IF NOT EXISTS productos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT,
    precio DECIMAL(10, 2) NOT NULL,
    tipo EN_ENUM('fisico', 'servicio') DEFAULT 'fisico',
    stock INT DEFAULT 0
) ENGINE=InnoDB;

-- 4. Citas Agendadas (El enlace clave)
CREATE TABLE IF NOT EXISTS citas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT,
    especialista_id INT,
    fecha_cita DATETIME NOT NULL,
    estado ENUM('pendiente', 'confirmada', 'cancelada') DEFAULT 'pendiente',
    observaciones TEXT,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE,
    FOREIGN KEY (especialista_id) REFERENCES especialistas(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- 5. Pedidos (Carrito de compras)
CREATE TABLE IF NOT EXISTS pedidos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT,
    total DECIMAL(10, 2),
    fecha_pago TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
) ENGINE=InnoDB;