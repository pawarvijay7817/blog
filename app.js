var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');

var mongoose=require("mongoose");
var jwt =require("jsonwebtoken");

const port=3000;

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var blogsRouter = require('./routes/blogs');



// mongoose connection
mongoose.connect("mongodb://localhost/blogger",{useNewUrlParser:true,useUnifiedTopology:true});
mongoose.connection
    .once('open',()=>{ 
        console.log('db connected')
    })
    .on('error',()=>{
        console.log('db not connected');
    });
// mongoose.connect(
//     "mongodb://127.0.0.1:27017/blogger",
//     { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true}).then(db => {
//       console.log("Database connected");
//     }).catch(error => console.log("Could not connect to mongo db " + error));



var app = express();

app.use(cors());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));
app.use('/public',express.static(path.join(__dirname,'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/blogs',blogsRouter);
// app.use('/blogs',validateUser,blogsRouter);

function validateUser(req,res,next){
	var tokenn=req.headers['x-access-token'];
	if(tokenn){	}else{
		var tokenn=req.body.token;
	}
	if(tokenn){  
		jwt.verify(tokenn,'my_secret_key',function(err,decoded){
			if(err){
                res.json({status:401,message:'UNAUTHORIZED',err:err});
			}else{
				req.body.username=decoded.username;
				next();
			}
		}); 
	}else{
        return res.json({status:504,message:'Token is required'});
	}
}

app.listen(port,()=>{
    console.log('server is started at port :'+port);
});

module.exports = app;
