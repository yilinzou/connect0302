var database = require('nedb');
var db = new database({filename:'database.json', autoload:true});

var express = require('express');
//var bodyParser = require('body-parser');//post need this
//require the module
var app = express();

app.use(express.static('public'));

app.get('/formdata',function(req,res){
    console.log(req.query.text);
    console.log(req.query.checkbox);
    console.log(req.query.email);
    // console.log(req.query.longtext);
    
    

    var dataToSave = {
        text:req.query.text,
        checkbox:req.query.checkbox,
        email:req.query.email,

        //color:req.body.color

    };

    //console.log(dataToSave);

    //submittedData.push(dataToSave); buzhidaoshibushi

    db.insert(dataToSave, function(err, newDoc){
        //res.send("Data Saved: "+ newDoc);
        db.find({}, function(err,docs){
            //var dataWrapper = {data:docs};
            //res.render("outputtemplate.ejs",dataWrapper);

            res.send(docs);
        });
    });


    // console.log(submittedData);

    
    // var dataWrapper = {data:submittedData};

    // var output = "<html><body>";

    // output += "<h1>GUEST INFO</h1>";

    // for (var i = 0; i < submittedData.length;i++){
    //     output += "<div>"+ submittedData[i].text + " "+ submittedData[i].checkbox + " " + submittedData[i].email + "</div>";
    // }

    // output += "</body></html>";
    // res.send(output);


    //res.send("got your data You submitted:"+ req.body.data+ " "+ req.body.color);

    //res.render("outputtemplate.ejs",dataWrapper)

});

app.listen(80, function(){
    console.log('example app listening on port 80!');
});
