const { validationResult } = require("express-validator");
//los middlewares tienen 3 parametros, el tercero es un next
const validarCampos = (req,res, next) => {
    //la validación del correo en la ruta mediante el middelware se almacena en el validationresult, 
    //para poder comprobar despues si el correo es correcto
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(400).json(error);    
    }
    //da la continuacion para continuar con los demas middlewares, si no al siguiente controlador
    next();
}

module.exports = {
    validarCampos,
}