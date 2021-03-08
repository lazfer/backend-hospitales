require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { connectDB } = require('./data/config');


// Crear el servidor de express
const app = express();
// Configurar cors
app.use(cors());
// Conectar base de datos
connectDB();
//Genera rutas
app.get('/', (req, res) =>{
res.status(400).json({
ok: true,
msg: 'Hola mundo'
});
});
app.listen(process.env.PORT, () => {
    console.log('Servidor corriendo ahora ' + process.env.PORT);
})