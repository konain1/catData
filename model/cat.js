
const mongoose = require('mongoose')

const catSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    breed:{
        type:String,
        enum:['persian','britists','calica','desi'],
        required:true
    },
    age:{
        type:Number,
        required:false
    },
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})

const catModel = mongoose.model('catModel',catSchema)

module.exports = catModel