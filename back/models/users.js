const mongoose = require ("mongoose")
const validator =require ("validator")
const bcrypt =require ("bcryptjs")

const usuarioSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: [true, "Por favor ingrese el nombre"],
        maxlength: [130, "Nombre no puede exceder los 130 caracteres"]
    },
    correo: {
        type: String,
        required: [true, "Por favor ingrese el correo electronico"],
        unique: true,
        validate: [validator.isEmail, "Por favor ingrese un correo electronico valido"]
   
    },
    clave: {
        type: String,
        required: [true, "Por favor registre una contraseña"],
        minlength: [8, "Su contraseña no puede tener menos de 8 caracteres"],
        select: false
    },
    avatar: {
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    },
    role:{
        type: String,
        default: 'user'
    
    },
    fechaRegistro: {
        type: Date,
        default: Date.now
    },
    resetPasswordToken: String,
    resetPasswordExprire: Date
})

usuarioSchema.pre("save", async function (next) {
    if (!this.isModified("clave")) {
        next()
    }
    this.clave = await bcrypt.hash(this.clave, 10)
})    

module.exports = mongoose.model("users",usuarioSchema)