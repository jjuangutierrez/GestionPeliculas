const mongosee = require('mongoose');

const GeneroSchema = mongosee.Schema({
    nombre: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    estado: {
        type: String,
        enum: ['Activo', 'Inactivo'],
        default: 'Activo'
    },
    descripcion: {
        type: String,
        trim: true
    }
},
    {
        timestamps: true
    });

module.exports = mongosee.model('Genero', GeneroSchema);