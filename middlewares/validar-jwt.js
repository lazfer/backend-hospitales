const validarJWT = (req, res, next) => {
const jwt = require('jsonwebtoken');
    const token = req.header('x-token');
    // Si no hay token manda error
    if(!token){
        return res.status(401).json({
            ok:false,
            mng: 'No hay token en la particio¡ón'
        });
    }

    try{
        // Verifica que el token sea igual al enviado
      const { uid } = jwt.verify(token, process.env.JWT_SECRET);
        req.uid = uid;
        next();
    } catch(err){
        // Si no encuentra el token manda error 
        return res.status(401).json({
            ok: false,
            msg: 'Token no valido'
        })
    }
  
}

module.exports = {
    validarJWT
}