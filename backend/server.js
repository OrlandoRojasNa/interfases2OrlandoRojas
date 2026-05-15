// 1. Importaciones necesarias
const express = require('express');
const mysql = require('mysql2'); // O 'mysql', según lo que instalaste
const cors = require('cors');
const app = express();

// 2. Middlewares (Configuración básica)
app.use(cors());
app.use(express.json()); // Permite recibir datos JSON en req.body

// 3. Configuración de la conexión a la Base de Datos
// Ajusta estos valores según tu docker-compose o configuración local
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',      // Tu usuario de la base de datos
    password: 'root_password',      // Tu contraseña
    database: 'agenda_db' // El nombre de tu base de datos
});

db.connect((err) => {
    if (err) {
        console.error('Error conectando a la BD:', err);
        return;
    }
    console.log('Conectado a la base de datos con éxito');
});

// --- TUS RUTAS (El código que ya tienes) ---

// Ruta de prueba para verificar que el servidor funciona
app.get('/', (req, res) => {
    res.send('🚀 El servidor de Orlando está funcionando perfectamente!');
});

// --- NUEVA RUTA PARA AGENDAR CITAS RELACIONALES ---
app.post('/api/agendar', (req, res) => {
    const { cliente_id, especialista_id, fecha_cita } = req.body;
    const sql = "INSERT INTO citas (cliente_id, especialista_id, fecha_cita) VALUES (?, ?, ?)";
    
    db.query(sql, [cliente_id, especialista_id, fecha_cita], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send("Error al agendar la cita");
        }
        res.json({ message: 'Cita vinculada al cliente con éxito', id: result.insertId });
    });
});

// --- NUEVA RUTA PARA REGISTRAR COMPRAS (EL CARRITO) ---
app.post('/api/comprar', (req, res) => {
    const { cliente_id, total, productos } = req.body; 

    db.query('INSERT INTO compras (cliente_id, total) VALUES (?, ?)', [cliente_id, total], (err, result) => {
        if (err) return res.status(500).send(err);
        
        const compraId = result.insertId;
        const detalles = productos.map(p => [compraId, p.id, p.cantidad, p.precio]);
        const sqlDetalle = "INSERT INTO detalle_compra (compra_id, producto_id, cantidad, precio_unitario) VALUES ?";
        
        db.query(sqlDetalle, [detalles], (errDetalle) => {
            if (errDetalle) return res.status(500).send(errDetalle);
            res.json({ message: 'Compra y detalles registrados exitosamente' });
        });
    });
});

// 4. Iniciar el servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor backend corriendo en http://localhost:${PORT}`);
});