const response = require('express');
const Usuario = require('../models/usuario');
const bcrypto = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');

const login = async(req, res = response ) => {

const { email, password } = req.body;
    try{
    const usuarioDB = await Usuario.findOne({ email });
   if( !usuarioDB ){
       return res.status(404).json({
           ok: false,
           msg: 'Contraseña no es valida'
       });
   }

   //Verificar contraseña
   const validaPassword = bcrypto.compareSync(password, usuarioDB.password);
   if( !validaPassword ){
       return res.status(400).json({
           ok: false,
           msg: 'Contraseña no valida'
       })
   }

   //Generar Token JWT
   const token = await generarJWT( usuarioDB._id );
   console.log(token);
        res.json({
          ok: true,
         token
        });

    } catch(error){
        res.status(400).json({
            ok: false,
            msg: 'Error invalido'
        })
    }
}

module.exports = {
    login
}