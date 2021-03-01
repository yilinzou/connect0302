var database = require('nedb');
var db = new database({filename:'database.json', autoload:true});

var express = require('express');
var bodyParser = require('body-parser');//post need this
//require the module
var app = express();
//post need this below
var urlencodedBodyParser = bodyParser.urlencoded({extended:true});
app.use(urlencodedBodyParser);

app.use(express.static('public'));

app.set('view engine','ejs');

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
app.get('/displayrecord', function(req,res){
    db.find({_id: req.query._id}, function(err,docs){
        var dataWrapper={data: docs[0]};
        res.render('individual.ejs', dataWrapper)
    });
});
app.post('/formdata',function(req,res){
    console.log(req.body.data);
    console.log(req.body.plusone);
    console.log(req.body.longtext);
    
    //store the data 1

    // var dataDataToSave = new Object();
    // dataToSave.text = req.body.data
    // dataToSave.color = req.body.color


    var dataToSave = {
        text:req.body.data,
        checkbox:req.body.checkbox,
        email:req.body.email,
        longtext: req.body.longtext

        //color:req.body.color

    };

    //console.log(dataToSave);

    submittedData.push(dataToSave);

    db.insert(dataToSave, function(err, newDoc){
        //res.send("Data Saved: "+ newDoc);
        db.find({}, function(err,docs){
            var dataWrapper = {data:docs};
            res.render("outputtemplate.ejs",dataWrapper);
        })
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
