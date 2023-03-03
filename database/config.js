const mongoose = require('mongoose');


const dbConnection = async() => {
    try {
        await mongoose.connect(process.env.MONGODB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Base de datos conectada correctamente');
        
    } catch (error) {
        throw new Error('Error en la Base de datos');
    } 
}

module.exports = {
    dbConnection,
    
}