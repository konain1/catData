
const express = require('express')

const route = express.Router();
const cat  = require('../model/cat')


route.get('/',async(req,res)=>{

    let cats = await cat.find();
    res.json({msg:cats})
})

route.post('/create',(req,res)=>{
    let data = req.body;
    let catCreated = new cat(data);
    catCreated.save()
    res.status(200).json({msg:'cat has been created'})
})


route.put('/:id',async(req,res)=>{
    let id =  req.params.id;
    let updatedData = req.body;

    try {
        
        let updateCat = await cat.findByIdAndUpdate(id,updatedData)
        if(!updateCat){
            res.status(404).json({msg:'wrong id or something else'})
        }
        res.status(200).json({msg:"data has been updated "})
    } catch (error) {
        console.log('internal server error',error);
        res.status(500).json('internal server error')
    }
})

module.exports = route