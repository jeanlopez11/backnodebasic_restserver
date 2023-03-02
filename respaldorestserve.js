const express = require('express');
class Server {

    
    constructor() {
        this.app  = express();
        this.port =process.env.PORT;

        this.routes();
    }

    routes(){
        this.app.get('/',  (req, res) => {
            res.send('Hello World');
        });
        
        this.app.get('*',  (req, res) => {
            // res.sendFile(__dirname+'/public/404.html');
            res.sendFile('404.html', {root: 'public'});
        }); 
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log(`Apliccation run in puerto: ${this.port}`);
        })
    }
}
