const {Router} = require('express');
const { check } = require('express-validator');

const { usuariosGet, usuariosPost, usuariosPut, usuariosPath, usuariosDelete, any } = require('../controllers/user');
const { esRoleValido, emailExiste, existeUsuarioPorId } = require('../helpers/db-validators');
const { validarCampos } = require('../middlewares/validar-campos');


const router = Router();
router.get('/', usuariosGet);
//en el procesamiento de las rutas se puede enviar middelwares, check es uno
router.post('/', [
    //para valdiar los campos con check, cada campo es indicado entre comillas y se puede interacturas con él, en el segundo parametro
    check('correo', 'Correo no valido').isEmail(),
    check('correo').custom(emailExiste),
    check('nombre', 'Nombre es obligatorio').not().isEmpty(),
    check('password', 'La contraseña es obligatoria con minimo 6 letras').isLength({min:6}).not().isEmpty(),
    check('rol').custom( esRoleValido ),//esto es igual a lo de abajo pero resumido se puede obviar
    // check('rol').custom( (rol) => esRoleValido(rol) ),

    validarCampos //https://www.udemy.com/course/node-de-cero-a-experto/learn/lecture/24778602#overview explicacion minuto 4.53
    //validationResult trabaja con el express validator para al final mostrar los errores e irlos almacenando

],usuariosPost );
router.put('/:id', [
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    check('rol').custom( esRoleValido ),//esto es igual a lo de abajo pero resumido se puede obviar
    //con esta funcion validarCampos, no continua a la ruta si hay errores, validar campos recoge los errores previos
    validarCampos
], usuariosPut);
router.patch('/',  usuariosPath);
router.delete('/:id', [
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    validarCampos
], usuariosDelete);

router.get('*', any); 

module.exports = router;
