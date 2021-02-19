var mongoose=require('mongoose');

var usersSchema=mongoose.Schema({
            name:String,
            email:String,
            password:String
        });

module.exports=mongoose.model('users',usersSchema);