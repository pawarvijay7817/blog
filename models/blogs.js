var mongoose=require('mongoose');

var BlogsSchema=mongoose.Schema({
    title:{ type:String,
            require:true 
          },
    description:{ type:String,
            require:true
          },
    image:{type:String,
           require:true
          },
    author:{type:String,require:true}
});

module.exports=mongoose.model('blogs',BlogsSchema);