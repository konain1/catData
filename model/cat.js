
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

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

catSchema.pre('save',async function(next){
    try {
        if(!this.isModified(this.password)) next();

        let hash = await bcrypt.hash(this.password,10)
        this.password = hash;
        next();
    } catch (error) {
        throw error
    }
})
catSchema.methods.comparePassword = async function(condidatePassword){

    let decryptedPassword = await bcrypt.compare(condidatePassword,this.password)

    return decryptedPassword
}
catSchema.pre('findOneAndUpdate', async function(next) {
    try {
      // Check if the password is being updated
      if (this._update.password) {
        const hash = await bcrypt.hash(this._update.password, 10);
        this._update.password = hash;
      }
      next();
    } catch (err) {
      next(err);
    }
  });
const catModel = mongoose.model('catModel',catSchema)

module.exports = catModel