var express=require('express');
var router=express.Router();
var multer=require('multer');
var path= require('path');

var blogs=require('../models/blogs');

// SET STOARAGE
var stoarage=multer.diskStorage({
    destination:function(req,file,callBack){
        callBack(null,'public/images');
    },
    filename:function (req,file,callBack){ 
		callBack(null, ((Math.random(100,999) * Date.now()).toString(36).replace(/\./g)) + path.extname(file.originalname));
	} 
});
var upload=multer({storage:stoarage});



// GET blogs listing */
router.get('/',function(req,res){
    blogs.find({},function(err,data){
      if(err){ throw err;}
        res.json({success:1,data:data});
    }).sort({_id:-1});
});

router.post('/add',upload.single('image') ,function(req,res,next){
    let file=req.file;
    if(!file){
        const err=new Error('choose file');
        return next(err);
    }
    let newBlog=new blogs({
        title:req.body.title,
        description:req.body.description,
        image:file.filename,
        author:req.body.name
    });

    newBlog.save((err,data)=>{
        if(err) res.json({success:0,message:'Something wrong '});
        res.json({success:'1',message:'Blog Added Successfully !', data:data});
    })  
});
module.exports=router;