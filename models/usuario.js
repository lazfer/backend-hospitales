const { Schema, model } = require('mongoose');
/**
 * Maneja la data de los modelos
 */


// Modelo de la collecion
// Hay que configurar las propiedades
// Algunas propiedades les puedes poner valores por default

const UsuarioSchema = Schema({
    nombre: {
        type: String,
    required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    img: { type: String
    },
    role: {type: String,
           required: true,
           default: 'USER_ROLE'
    },
    google: {type: Boolean,
             default: false} 
});

//Podemos Modificar las propiedades del schema
UsuarioSchema.method('toJSON', function () {
    //Instancia del objecto actual
    //Se extraen las dos propiedades mencionadas
    //y despues agrega las demas propiedades  
const {__v,_id,password, ...object} = this.toObject();
// Sobre escribimos la propiedad
object.uid = _id;
return object;
});
// Nombre de la collecion y el schema
module.exports = model('Usuario', UsuarioSchema );
