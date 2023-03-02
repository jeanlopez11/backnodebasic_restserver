const {response, request} = require('express');

//se desearializa el response y request para que me muestre el tipado como guia
const usuariosGet = (req = request, res = response) => {
    const {q,nombre} = req.query;
    res.json({
        // "ok": true,
        "msg": 'Hello World- Controller',
        q,
        nombre
    });
}
const usuariosPost =(req, res ) => {
    const {nombre,edad} = req.body;
    res.json({
        // "ok": true,
        nombre,
        edad,
        id
    });
}
const usuariosPut =(req, res) => {
    //el parametro se encuentra en el request, si se le ubica otro nombre seria params.algo
    const {id} = req.params.id;
    res.json({
        // "ok": true,
        "msg": 'put  World'
    });
}
const usuariosPath =(req, res) => {
    res.json({
        // "ok": true,
        "msg": 'path  World'
    });
}
const usuariosDelete =(req, res) => {
    res.json({
        // "ok": true,
        "msg": 'deletes World'
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