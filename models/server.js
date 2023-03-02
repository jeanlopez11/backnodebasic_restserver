const express = require('express');
const cors = require('cors');
class Server {

    
    constructor() {
        //this hace referencia atributos que solo funcionan dentro del constructor
        this.app  = express();
        this.port =process.env.PORT || 3000;
        //Middelwares
        this.middlewares();
        this.usuariosPath = '/api/usuarios';
        //Rutas de mi app
        this.routes();
    }

    routes(){
        this.app.use(this.usuariosPath, require('../routes/user'));
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log(`Apliccation run in puerto: ${this.port}`);
        })
    }

    middlewares(){
        this.app.use(cors());
        //lectura y pareo del body, cualquier informacion que venga del body es recibida y trata de serializarla
        this.app.use(express.json());
        //Registrando directorio publico
        this.app.use(express.static('public'));
    }
}

module.exports = {
    Server,
    
}
