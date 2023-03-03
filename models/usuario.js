
const {Schema,model} = require('mongoose');

const UsuarioSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
    },
    correo: {
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Contraseñá es obligatorio'],
    },
    img: {
        type: String,
    },
    rol: {
        type: String,
        required: [true, 'El rol es obligatorio'],
        // enum: ['ADMIN_ROLE','USER_ROLE'],
    },
    estado:{
        type: Boolean,
        default: true,
    },
    google:{
        type: Boolean,
        default: false,
    }
});
//CON ESTOS EVITAMOS ENVIAR CAMPOS INNESEARIOS QUE PUEDAN SER VISTOS COMO LA CONTRASEÑA ENCRIPTADA O LA VERSION
UsuarioSchema.methods.toJSON = function() {
    //se exluye los dos primeros parametros y se retorna el MODELO usuario
    const {__v, password, ...usuario} = this.toObject();
    return usuario
}

module.exports = model('Usuario', UsuarioSchema);