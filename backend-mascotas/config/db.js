// Importar mysql2 y dotenv
const mysql = require('mysql2');
require('dotenv').config();

// Crear la conexión con MySQL/MariaDB usando las variables de entorno
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});

// Conectar a la base de datos
connection.connect((error) => {
    if (error) {
        console.error('❌ Error al conectar con MySQL:', error);
        return;
    }
    console.log('✅ Conexión exitosa con MySQL/MariaDB');
});

// Exportar la conexión para usarla en otros archivos
module.exports = connection;