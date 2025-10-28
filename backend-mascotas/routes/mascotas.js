// Importar Express y el modelo de Mascota
const express = require('express');
const router = express.Router();
const mascotaModel = require('../models/mascotaModel');

// 📋 GET - Obtener todas las mascotas
router.get('/', (req, res) => {
    mascotaModel.obtenerTodasLasMascotas((error, results) => {
        if (error) {
            console.error('❌ Error al obtener mascotas:', error);
            return res.status(500).json({ error: 'Error al obtener mascotas' });
        }
        res.json(results);
    });
});

// ➕ POST - Crear una nueva mascota
router.post('/', (req, res) => {
    const nuevaMascota = req.body;
    console.log('📦 Datos recibidos en POST:', nuevaMascota); // Para depuración

    // Validar que todos los campos estén presentes
    if (!nuevaMascota.nombre || !nuevaMascota.tipo || !nuevaMascota.edad || !nuevaMascota.dueno) {
        return res.status(400).json({ error: 'Faltan campos obligatorios' });
    }

    mascotaModel.crearMascota(nuevaMascota, (error, results) => {
        if (error) {
            console.error('❌ Error al crear mascota:', error);
            return res.status(500).json({ error: 'Error al crear mascota' });
        }
        res.status(201).json({ 
            message: '✅ Mascota creada exitosamente', 
            id: results.insertId 
        });
    });
});

// ✏️ PUT - Actualizar una mascota existente
router.put('/:id', (req, res) => {
    const id = req.params.id;
    const mascotaActualizada = req.body;
    console.log('✏️ Datos recibidos en PUT:', mascotaActualizada); // Para depuración

    // Validar campos básicos
    if (!mascotaActualizada.nombre || !mascotaActualizada.tipo || !mascotaActualizada.edad || !mascotaActualizada.dueno) {
        return res.status(400).json({ error: 'Faltan campos obligatorios para actualizar' });
    }

    mascotaModel.actualizarMascota(id, mascotaActualizada, (error, results) => {
        if (error) {
            console.error('❌ Error al actualizar mascota:', error);
            return res.status(500).json({ error: 'Error al actualizar mascota' });
        }
        
        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Mascota no encontrada' });
        }
        
        res.json({ message: '✅ Mascota actualizada exitosamente' });
    });
});

// 🗑️ DELETE - Eliminar una mascota
router.delete('/:id', (req, res) => {
    const id = req.params.id;

    mascotaModel.eliminarMascota(id, (error, results) => {
        if (error) {
            console.error('❌ Error al eliminar mascota:', error);
            return res.status(500).json({ error: 'Error al eliminar mascota' });
        }
        
        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Mascota no encontrada' });
        }
        
        res.json({ message: '✅ Mascota eliminada exitosamente' });
    });
});

// Exportar el router
module.exports = router;
