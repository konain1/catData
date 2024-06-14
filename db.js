
const mongoose = require('mongoose')
require('dotenv').config()
// const localUrl = mongodb://127.0.0.1:27017';
const globalURL = process.env.CAT_DB

mongoose.connect(globalURL)

const db = mongoose.connection;



db.on('connected',()=>console.log('mongo is connected server2 cat server'))
db.on('error',(err)=>console.log('mongo has erro = ',err))
db.on('disconnected',()=>console.log('mongo is disconnected cat server'))

module.exports = db