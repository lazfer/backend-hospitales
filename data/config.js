const mongoose = require('mongoose');
const connectDB = async() => {

    try {

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

module.exports = { connectDB }

