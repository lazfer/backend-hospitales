const { Router } = require('express');
const { getUsuarios, crearUsuario, actualizarUsuario, borrarUsuario } = require('../controllers/usuarios');
const router = Router();
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt')
/**
 * Routes maneja las rutas y las validaciones
 */
//Importamos nuestros controladores
//Agregamos el jwt token
router.get('/', validarJWT , getUsuarios);
//Valida la data enviada por el usuario
//Primero va el nombre del campo y el segundo va el
//Mensaje // validarCampos lo usamos para validar los errores
//Que se presentan
router.post('/', 
[
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password es obligatorio').not().isEmpty(),
    check('email','El email es obligatorio o la estructura del correo es incorrecta').isEmail(),
    validarCampos
],
crearUsuario);

router.put('/:id',
[
validarJWT,
check('nombre', 'El nombre es obligatorio').not().isEmpty(),
check('role', 'El role es obligatorio').not().isEmpty(),
check('email','El email es obligatorio o la estructura del correo es incorrecta').isEmail(),
validarCampos
],
actualizarUsuario);

router.delete('/:id', validarJWT, borrarUsuario);

module.exports = router;