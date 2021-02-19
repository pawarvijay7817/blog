var express = require('express');
var router = express.Router();
const path=require('path');
const jwt=require("jsonwebtoken");

var users=require('../models/users');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/login',function(req,res){
  var email=req.body.username;
  var password=req.body.password;
  if(email !='' && password !=''){
    users.findOne({email:email,password:password},function(err,data){
      if(err){
        res.json({success:0,message:'Invalid Credentials',data:err});
      }
      if(data){
        var email=data.email;
        const token=jwt.sign({username:email},'my_secrete',{expiresIn:'1h'});
        res.json({success:'1',message:'Login Success',data:data,token:token});
      }else{
        res.json({success:0,message:'Invalid  ',data:''});
      }
    });
  }
});

module.exports = router;
 