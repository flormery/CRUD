// Importar la conexión a la base de datos
const db = require('../config/db');

// 📋 Obtener todas las mascotas
const obtenerTodasLasMascotas = (callback) => {
    const query = 'SELECT * FROM mascotas ORDER BY id DESC';
    db.query(query, callback);
};

// ➕ Crear una nueva mascota
const crearMascota = (mascota, callback) => {
    const query = 'INSERT INTO mascotas (nombre, tipo, edad, raza, dueno) VALUES (?, ?, ?, ?, ?)';
    const values = [mascota.nombre, mascota.tipo, mascota.edad, mascota.raza, mascota.dueno];
    db.query(query, values, callback); // ✅ Aquí se ejecuta la consulta
};

// ✏️ Actualizar una mascota existente
const actualizarMascota = (id, mascota, callback) => {
    const query = 'UPDATE mascotas SET nombre = ?, tipo = ?, edad = ?, raza = ?, dueno = ? WHERE id = ?';
    const values = [mascota.nombre, mascota.tipo, mascota.edad, mascota.raza, mascota.dueno, id];
    db.query(query, values, callback); // ✅ Aquí también
};

// 🗑️ Eliminar una mascota
const eliminarMascota = (id, callback) => {
    const query = 'DELETE FROM mascotas WHERE id = ?';
    db.query(query, [id], callback);
};

// Exportar todas las funciones
module.exports = {
    obtenerTodasLasMascotas,
    crearMascota,
    actualizarMascota,
    eliminarMascota
};
