const mongoose = require('mongoose');
/**
 * Config lleva la configuracion de la base de datos mongo
 */

// Debe ser una funcion async para esperar a la promesa
const connectDB = async() => {

    try {
         // Datos para realizar la conexion con mongoose
         // DB_CNN trae la url y los datos para realizar la conexion
        await mongoose.connect(process.env.DB_CNN, 
    {   useNewUrlParser: true, 
        useUnifiedTopology: true,
        useCreateIndex: true
    });
     console.log('online');
    } catch (error) {
        console.log(error);
    throw new Error('No se puede conectar a la base de datos');
    }

}
//Exportamos la conexion mongoose
module.exports = { connectDB }

