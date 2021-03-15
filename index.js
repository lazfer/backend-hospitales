require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { connectDB } = require('./data/config');
/**
 * El index maneja la llamda de las rutas
 * y llamda de la base de datos
 */

// Crear el servidor de express
const app = express();
// Configurar cors
app.use(cors());

// Lectura de body y parseo
app.use(express.json());

// Conectar base de datos
connectDB();
//Genera rutas de usuarios
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/login', require('./routes/auth'));

app.listen(process.env.PORT, () => {
    console.log('Servidor corriendo ahora ' + process.env.PORT);
});