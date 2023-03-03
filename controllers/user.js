const {response, request} = require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');
//se desearializa el response y request para que me muestre el tipado como guia
const usuariosGet = async (req = request, res = response) => {
    // const {q,nombre} = req.query;
    //TODO: EL query es parte de una url pero no es un parametro ni incluye como parte del "/", es un query que empieza con ?
    //SIN embargo si necesitamos ruta es /id, muy diferente al query, por lo que necesitamos crear la ruta, con el query no se crea ruta
    const {limite=5, desde=0} = req.query;
    const query = {estado: true};
    //TODO: forma tradicional de trabajar con el await pero puede demorar mucho tiempo
    // const usuarios = await Usuario.find(query)
        //es skip obvia los primeros registros desde donde empieza el numero que nosotros definimos 
        // .skip(Number(desde))
        // .limit(Number(limite));
    // const total = await Usuario.countDocuments(query);    
    // const resp = await Promise.all([
    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
    ])
    res.json({
        total,
        usuarios,
        // resp

    });
}
const usuariosPost = async (req, res ) => {
    // con este comando excluimos los paametros especificados y seleccionamos todos los demás
    // const {google, ... resto} = req.body;
    const {nombre, correo, password, rol} = req.body;
    const usuario = new Usuario({
        nombre,
        correo,
        password,
        rol
    });

    //Verificar correo


    //Encriptar contraseña
    const salt = bcryptjs.genSaltSync(10);
    usuario.password = bcryptjs.hashSync(password, salt);
    //Guardar
    await usuario.save();
    res.json({
        usuario
        // nombre,
        // edad,
    });
}
const usuariosPut = async (req, res) => {
    //el parametro se encuentra en el request, si se le ubica otro nombre seria params.algo
    const {id} = req.params;
    const { _id,password, google,correo, ...resto} = req.body;

    if (password){
        const salt = bcryptjs.genSaltSync(10);
        //resto no tiene las propiedades pass y google, pero yo se la agrego encriptada
        resto.password = bcryptjs.hashSync(password, salt);
    }
    const usuario = await Usuario.findByIdAndUpdate(id, resto);
    res.json({
        // "ok": true,
        "msg": 'put  World',
        usuario
    });
}
const usuariosPath =(req, res) => {
    res.json({
        // "ok": true,
        "msg": 'path  World'
    });
}
const usuariosDelete = async (req, res) => {
    const {id} = req.params;
    // const usuario = await Usuario.findByIdAndDelete(id);
    //en la actualidad ya no se borran los usuarios, se desactiva su estado para que aparezca como borrado, esto para cuidar la integridad de datos
    const usuario = await Usuario.findByIdAndUpdate(id, {estado: false});
    res.json({
        // "ok": true,
        "msg": 'Usuario eliminado',
        usuario
    });
}

const any = (req, res) => {
    // res.sendFile(__dirname+'/public/404.html');
    res.sendFile('404.html', {root: 'public'});
}

module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPath,
    usuariosDelete,
    any
    
}