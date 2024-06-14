
const express = require('express')
const bodyparser = require('body-parser')
require('dotenv').config()

const app = express();
const db = require('./db')

const catRouter = require('./route/catRoute')

app.use(bodyparser.json())

const Port = process.env.PORT || 3001

app.get('/',(req,res)=>{
    res.json({msg:"server2 is running on 3001"})
})

app.use('/cat',catRouter)

app.listen(Port,()=>{
    console.log('live on 3001')
})