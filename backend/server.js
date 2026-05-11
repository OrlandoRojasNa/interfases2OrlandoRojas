// --- NUEVA RUTA PARA AGENDAR CITAS RELACIONALES ---
app.post('/api/agendar', (req, res) => {
    // Ahora recibimos cliente_id en lugar de un nombre de texto
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
    const { cliente_id, total, productos } = req.body; // productos es un array

    // 1. Crear la cabecera de la compra
    db.query('INSERT INTO compras (cliente_id, total) VALUES (?, ?)', [cliente_id, total], (err, result) => {
        if (err) return res.status(500).send(err);
        
        const compraId = result.insertId;
        
        // 2. Insertar cada producto en detalle_compra
        const detalles = productos.map(p => [compraId, p.id, p.cantidad, p.precio]);
        const sqlDetalle = "INSERT INTO detalle_compra (compra_id, producto_id, cantidad, precio_unitario) VALUES ?";
        
        db.query(sqlDetalle, [detalles], (errDetalle) => {
            if (errDetalle) return res.status(500).send(errDetalle);
            res.json({ message: 'Compra y detalles registrados exitosamente' });
        });
    });
});