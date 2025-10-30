// Importar dependencias
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

// Importar rutas
const mascotasRoutes = require('./routes/mascotas');

// Crear la aplicación Express
const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors()); // Permitir peticiones desde el frontend
app.use(bodyParser.json()); // Parsear JSON en las peticiones
app.use(bodyParser.urlencoded({ extended: true }));

// Ruta principal de bienvenida
app.get('/', (req, res) => {
    res.json({ 
        message: '🐾 Bienvenido al CRUD de Mascotas',
        endpoints: {
            listar: 'GET /api/mascotas',
            crear: 'POST /api/mascotas',
            actualizar: 'PUT /api/mascotas/:id',
            eliminar: 'DELETE /api/mascotas/:id'
        }
    });
});

// Usar las rutas de mascotas
app.use('/api/mascotas', mascotasRoutes);

// Iniciar el servidor
app.listen(PORT, '0.0.0.0', () => {
    console.log(`\n🚀 Servidor corriendo en http://localhost:${PORT}`);
    console.log(`📡 API disponible en http://localhost:${PORT}/api/mascotas\n`);
});