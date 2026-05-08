const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Configuración de la conexión a la base de datos
const db = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASS || 'root_password',
  database: process.env.DB_NAME || 'agenda_db'
});

db.connect(err => {
  if (err) {
    console.error('Error al conectar a la BD:', err);
    return;
  }
  console.log('¡Conectado a la base de datos MySQL!');
});

// Endpoint para obtener especialistas (lo usaremos en Angular)
app.get('/api/especialistas', (req, res) => {
  db.query('SELECT * FROM especialistas', (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
});

// Endpoint para guardar una reserva
app.post('/api/reservar', (req, res) => {
  const { usuario_id, especialista_id, servicio_id, fecha_hora } = req.body;
  const query = 'INSERT INTO citas (usuario_id, especialista_id, servicio_id, fecha_hora) VALUES (?, ?, ?, ?)';
  
  db.query(query, [usuario_id, especialista_id, servicio_id, fecha_hora], (err, result) => {
    if (err) return res.status(500).json(err);
    res.status(201).json({ message: 'Reserva creada con éxito', id: result.insertId });
  });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});