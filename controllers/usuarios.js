const Usuario = require('../models/usuario');
const bcrypto = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');

/**
 * Maneja la logica los erres y la respuesta de la data 
 */
// Creamos nuestro controlador de ruta getUsuarios
const getUsuarios = async (req, res) =>{
    //Filtra el objeto en las propiedades indicadas
    const usuarios = await Usuario.find({}, 'nombre email role google');
    // uid: req.uid
    res.json({
        ok: true,
        usuarios

    });
    }
const crearUsuario = async (req, res ) => {
    // req.body obtiene nuestra respuesta que manda el usuario
   const { email, password, nombre} = req.body;

   //Validar correo unico
   try{
    //Hacemos una busqueda en la base de datos
    //Y validamos que no exista un email repetido
    const existeUsuario = await Usuario.findOne({email});
    if( existeUsuario ){
        return res.status(400).json({
            ok: false,
            msg: 'El correo ya esta registrado'
        });
    }
    // Enviar Instancia de nuestro modelo
    // Recuperamos los valores enviados por
    // El usuario
    const usuario = new Usuario(req.body);

   //Encriptar contraseña
   const salt = bcrypto.genSaltSync();
   usuario.password = bcrypto.hashSync( password, salt);

   // Utilizo el await para espera a la promesa
      await usuario.save();
     //Generar Token JWT
     const token = generarJWT( usuario.id );
       res.json({
       ok: true,
       usuario,
       token
       });

   } catch ( error ){
    res.status(500).json({
        ok: false,
        msg: 'Error inisperado revisar log'
    });
   }
}

const actualizarUsuario = async(req, res = response) => {
const uid = req.params.id;
//const { nombre, role, email } = req.body;

try{

    // busca en la base de datos
    const usuarioDB = await Usuario.findById( uid );
 
    if( !usuarioDB ){
        return res.status(404).json({
            ok: false,
            msg: 'No existe un usuario con ese id'
        });
    }

    //Quita los campos que no requiere
    const {password, google, email, ...campos} = req.body;
 
if(usuarioDB.email !== email){
    const existeEmail = await Usuario.findOne({email});
    if(existeEmail){
        return res.status(400).json({
            ok: false,
            msg: 'Ya existe un usuario con ese email'
        });
    }
}
campos.email = email;
const usuarioActualizado = await Usuario.findByIdAndUpdate(uid, campos, {new: true});
res.json({
    ok: true,
    usuario: usuarioActualizado
});

//Si existe un error regresa un error 500
 } catch (error){
res.status(500).json({
    ok: false,
    msg: 'Error inesperado'
});
 }

}

const borrarUsuario = async(req, res = response) => {
const uid = req.params.id;
try{
   // busca en la base de datos
   const usuarioDB = await Usuario.findById( uid );

   if(!usuarioDB){
       return res.status(404).json({
           ok: false,
           msg: 'No existe un usuario con este id'
       })
   }

   await Usuario.findByIdAndDelete(uid);

   res.json({
       ok:true,
       msg: 'Usuario eliminado'
   })

} catch (error){
res.status(500).json({
    ok: false,
    mns: 'Error al intentar a eliminar al usuario'
});
}
}

module.exports = {
    getUsuarios,
    crearUsuario,
    actualizarUsuario,
    borrarUsuario
}