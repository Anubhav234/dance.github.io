const express= require("express");
const path=require ("path");
const bodyparser=require("body-parser")
const app=express();

const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://anubhav:Anubhav123@cluster0.fkf38.mongodb.net/contactDance', {useNewUrlParser: true ,useUnifiedTopology: true});
//moongoose
const contactSchema = new mongoose.Schema({
    name: String,
    phone:String,
    email:String,
    address:String,
    query:String
  });
  const Contact = mongoose.model('Contact', contactSchema);
//express
app.use('/static', express.static('static'))
app.use(express.urlencoded())
 

app.set('view engine','pug')//pug file 
app.set('views', path.join(__dirname,'views'))


app.get("/", (req,res)=>{
    const params={}
    res.render('home.pug',params)
});
 
app.get("/contact", (req,res)=>{
    const params={}
    res.render('contact.pug',params)
});
 
app.post("/contact", (req,res)=>{
    var myData=new Contact(req.body);
    myData.save().then(()=>{
        res.send("This item have been save dto the data base ")
    }).catch(()=>{
        res.status(400).send("item was not send")
    })
   // res.render('contact.pug')
});




let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}






app.listen(port,function(){
    console.log("up and running")
})