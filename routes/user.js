const {Router} = require('express');
const { usuariosGet, usuariosPost, usuariosPut, usuariosPath, usuariosDelete, any } = require('../controllers/user');

const router = Router();
router.get('/', usuariosGet);

router.post('/', usuariosPost );
router.put('/:id',  usuariosPut);
router.patch('/',  usuariosPath);
router.delete('/',  usuariosDelete);

router.get('*', any); 

module.exports = router;
