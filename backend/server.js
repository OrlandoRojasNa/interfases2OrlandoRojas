const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Conexión a la base de datos (Docker usa el nombre del servicio 'db')
const db = mysql.createPool({
    host: 'db',
    user: 'root',
    password: 'root_password',
    database: 'agenda_db',
    waitForConnections: true,
    connectionLimit: 10
});

// --- RUTA 1: E-COMMERCE (Listar Productos) ---
app.get('/api/productos', (req, res) => {
    db.query('SELECT * FROM productos', (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    });
});

// --- RUTA 2: ESPECIALISTAS (Listar para la Agenda) ---
app.get('/api/especialistas', (req, res) => {
    db.query('SELECT * FROM especialistas', (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    });
});

// --- RUTA 3: AGENDAR CITA (El enlace Frontend-Backend-DB) ---
app.post('/api/agendar', (req, res) => {
    const { usuario_nombre, especialista_id, fecha_cita } = req.body;
    const sql = "INSERT INTO citas (usuario_nombre, especialista_id, fecha_cita) VALUES (?, ?, ?)";
    
    db.query(sql, [usuario_nombre, especialista_id, fecha_cita], (err, result) => {
        if (err) return res.status(500).send(err);
        res.json({ message: 'Cita agendada con éxito', id: result.insertId });
    });
});

app.listen(3000, () => {
    console.log('API de Sofia Safar corriendo en http://localhost:3000');
});