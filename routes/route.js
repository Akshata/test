const express=require('express');
const router=express.Router();
//var mongoose=require('mongoose');
var ObjectId = require('mongodb').ObjectID;

const Contact=require('../models/contact');
const Registration=require('../models/registration');
const Login=require('../models/login');

//mongoose.connect('mongodb://localhost:27017/contactList');


router.post('/register',(req,res,next)=>{
    let newUser=new Registration({
        name:req.body.name,
        email:req.body.email,
        age:req.body.age,
        mobile:req.body.mobile,
        password:req.body.password
    });
    newUser.save((err,user)=>{
        if(err){
            res.json({msg:"Failed to Add"});
        }
        else{
            res.json({msg:"Added Successfully"});
        }
    })
});

router.post('/login',(req,res,next)=>{
    Registration.find({email:req.body.email,password:req.body.password},(err,docs)=>{
        console.log(docs);
    res.json(docs);
});    
});

router.post('/getProfile',(req,res,next)=>{
    Registration.find({_id:ObjectId(req.body.id)},(err,docs)=>{
        console.log(docs);
    res.json(docs);
});    
});


router.get('/contacts',(req,res,next)=>{
    Contact.find((err,contacts)=>{
        res.json(contacts); 
    });
});

router.post('/getContacts',(req,res,next)=>{
    //console.log(req.body.id);
    Contact.find({_id:ObjectId(req.body.id)},(err,contacts)=>{
        //console.log(req.body.id);
        res.json(contacts); 
    });
});

router.post('/updateContact',(req,res,next)=>{
    let newContact={
        firstName:req.body.firstName,
        lastName:req.body.lastName,
        contact:req.body.contact
    };

    Contact.updateOne({_id:ObjectId(req.body._id)},{ $set:newContact},(err,contact)=>{
        if(err){
            res.json({msg:"Failed to Add"});
        }
        else{
            res.json({msg:"Added Successfully"});
        }
    })

});

router.post('/addContacts',(req,res,next)=>{
    let newContact=new Contact({
        firstName:req.body.firstName,
        lastName:req.body.lastName,
        contact:req.body.contact
    });

    newContact.save((err,contact)=>{
        if(err){
            res.json({msg:"Failed to Add"});
        }
        else{
            res.json({msg:"Added Successfully"});
        }
    })

});

router.delete('/deleteContacts/:id',(req,res,next)=>{
    Contact.remove({_id:req.params.id},(err,result)=>{
        if(err){
            res.json(err);
        }
        else{
            res.json(result );
        }
    });
});

module.exports=router;