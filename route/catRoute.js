
const express = require('express')
const bcrypt = require('bcrypt')
const route = express.Router();
const cat  = require('../model/cat')
const {generateToken,jwtAuthmiddleware} = require('../jwt')



route.get('/',jwtAuthmiddleware,async(req,res)=>{

    let cats = await cat.find();
    let {username,password } = req.body;
    const userCat = cats.find((cat) => cat.username === username );
    
    const isPasswordValid = await bcrypt.compare(password, userCat.password);

    if(!username || !password){
        return res.json({msg:"missing username or password"})
    }
   
    if(!userCat || !isPasswordValid){
        return res.json({msg:"incorrect username or password"})
    }else{

        res.json({msg:cats})
    }


})
route.get('/profile',jwtAuthmiddleware,async(req,res)=>{
    let username = req.user;
    let userCat = await cat.findOne({username:username});
    res.json({userCat})
})


route.post('/create',(req,res)=>{
    let data = req.body;
    let catCreated = new cat(data);
    let token = generateToken(data.username)
    catCreated.save()
    res.status(200).json({msg:'cat has been created',token})
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