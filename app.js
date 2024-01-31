const exp = require("constants");
const express = require("express");
const path = require("path");
const mongoose = require('mongoose');
const bodyparser = require('body-parser')

mongoose.connect('mongodb://127.0.0.1:27017/contactus');

const app = express();

var contactSchema = new mongoose.Schema({
    name : String,
    phone : String,
    email : String,
    address : String,
    desc : String

});
var Contact = mongoose.model('Contact' , contactSchema);

const port = 80;

app.use('/static' , express.static('static'))
app.use(express.urlencoded())

app.set('view engine' , 'pug') // set template engine as pug
app.set('views' , path.join(__dirname ,'views')) //set views directory


//endpoints
app.get('/' , (req,res) =>{
    const params = {}
    res.status(200).render('home.pug' , params);
})

app.get('/contact' , (req,res) =>{
    const params = {}
    res.status(200).render('contact.pug' , params);
})

app.post('/contact' , (req,res) =>{
    // res.status(200).render('contact.pug' , params); save returns a promise 
    var mydata = new Contact(req.body);
    mydata.save().then(()=>{
        res.send("This item is saved to the database")
    }).catch(()=>{
        res.send(400).send('Item was not saved try and fix !!!')
    });
})

// start server
app.listen(port , ()=>{
    console.log(`The application started successfully on port ${port}`)
})