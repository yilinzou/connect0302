var express = require('express');
var bodyParser = require('body-parser');//post need this
//require the module
var app = express();
//post need this below
var urlencodedBodyParser = bodyParser.urlencoded({extended:true});
app.use(urlencodedBodyParser);

app.use(express.static('public'));

var submittedData=[];

//the default route of /and what to do!
// app.get("/", function(req,res){
//     res.send("hello week 2");
// });

// app.get('/formdata',function(req,res){
//     console.log(req.query.data);
//     res.send("got your data You submitted:"+ req.query.data);
// });

// app.listen(80, function(){
//     console.log('example app listening on port 80!');
// });

app.get("/", function(req,res){
    res.send("hello week 2");
});

app.post('/formdata',function(req,res){
    console.log(req.body.data);
    console.log(req.body.plusone);
    
    //store the data 1

    // var dataDataToSave = new Object();
    // dataToSave.text = req.body.data
    // dataToSave.color = req.body.color


    var dataToSave = {
        text:req.body.data,
        checkbox:req.body.checkbox,
        email:req.body.email
        //color:req.body.color

    };

    //console.log(dataToSave);

    submittedData.push(dataToSave);

    console.log(submittedData);


    var output = "<html><body>";

    output += "<h1>GUEST INFO</h1>";

    for (var i = 0; i < submittedData.length;i++){
        output += "<div>"+ submittedData[i].text + " "+ submittedData[i].checkbox + " " + submittedData[i].email + "</div>";
    }

    output += "</body></html>";
    res.send(output);


    //res.send("got your data You submitted:"+ req.body.data+ " "+ req.body.color);

    

});

app.listen(80, function(){
    console.log('example app listening on port 80!');
});
