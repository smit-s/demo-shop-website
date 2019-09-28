var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var mongodb = require('mongodb');

var dbConn = mongodb.MongoClient.connect('mongodb://localhost:27017');

var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.resolve(__dirname, 'public')));
app.get('/',(req,res)=>{res.sendFile(path.join(__dirname+'\/home.html'));});
app.get('/index.html',(req,res)=>{res.sendFile(path.join(__dirname+'\/index.html'));});
app.get('/contact.html',(req,res)=>{res.sendFile(path.join(__dirname+'\/contact.html'));});
app.get('/about.html',(req,res)=>{res.sendFile(path.join(__dirname+'\/about.html'));});
app.get('/products.html',(req,res)=>{res.sendFile(path.join(__dirname+'\/products.html'));});
app.get('/services.html',(req,res)=>{res.sendFile(path.join(__dirname+'\/services.html'));});
app.use(express.static(path.join(__dirname,'\/')));
app.post('/', function (req, res) {
  if(req.body.fname==""||req.body.lname==""||req.body.email==""||req.body.subject==""||req.body.Message==""){
    res.send("Please Enter all fields")
  }else{
    dbConn.then(function(db) {

        delete req.body._id; // for safety reasons

        db.collection('list').insertOne(req.body);
    });
res.sendFile(path.join(__dirname+'\/contact.html'));

}
// res.writeHead(302, {
//    'Location': 'F:/ppts/sem5/webtech/website/other/conttact.html'
//    //add other headers here...
// });
// res.end();
});

app.get('/next',  function(req, res) {
    dbConn.then(function(db) {
        db.collection('list').find({}).toArray().then(function(list) {
            res.status(200).json(list);
        });
    });

});

app.listen(3000,()=>{console.log("on port 3000");});
