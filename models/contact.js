const mongoose=require('mongoose');

const contactSchema=mongoose.Schema({
    
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    contact:{
        type:String,
        required:true
    }
});

const contact=module.exports=mongoose.model('contact',contactSchema);