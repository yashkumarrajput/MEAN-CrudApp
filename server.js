var Model=require('./models/models');
var express=require('express');
var mongoose=require('mongoose');
var bodyParser=require('body-parser');
var morgan=require('morgan');
var cors=require('cors');

var app=express();
var db="mongodb://127.0.0.1/mean";

mongoose.connect(db,function(err,response){
    if(err){
        console.log('Failed to connect to '+db);
    }
    else{
        console.log('Connected to '+db);
    }
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cors());

var router=express.Router();

router.get('/api/users',function(req,res){
    Model.find({},function(err,users){
        if(err){
            res.status(404).send(err);
        }
        else{
            res.status(200).send(users);
        }
    });
});

//delete

router.delete('/api/users/:id',function(req,res){
    Model.findByIdAndRemove({_id:req.params.id}).then(function(user){
        res.send(user);
    });
});

//update

router.put('/api/users/:id',function(req,res){
    Model.findByIdAndUpdate({_id:req.params.id});
});

router.post('/api/users',function(req,res){
    Model.create(req.body).then(function(user){
        res.send(user);
    });
});

app.use('/',router);
app.use(morgan('dev'));

app.use(express.static(__dirname+'/public'));
app.listen(3000,function(){
    console.log('Listening on port 3000');
});
