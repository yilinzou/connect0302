var fs = require('fs');

var datastore = require('nedb');
var db = new datastore({filename: 'database.json', autoload: true});

var express = require('express');
var bodyParser = require('body-parser');
var app = express();

var urlencodedBodyParser = bodyParser.urlencoded({extended:true});
app.use(urlencodedBodyParser);

app.use(express.static('public'));

// app.get('/', function(req, res){
//     res.send ('hello world');
// });
var rootPath = process.cwd();
var submittedData = [];

app.post('/formData',function(req,res){

    console.log(req.body.guestname);

    // Create an new Object to contain data // { }
    var dataToSave = new Object();
    dataToSave.guestname = req.body.guestname;
    console.log('Get a guest name ====>', dataToSave.guestname);

    db.insert(dataToSave, function (err, newDoc){
        if(err){
            console.log('An Error occured ===>', err);
            return;
        }
        console.log('Data saved ===>', newDoc);
    })
    
    // db.find({}, function(err, docs){
        
    // })

    submittedData.push(dataToSave);
    // console.log(submittedData);

    var output = "<html><body>";
    output+="<h1 class='title'>Welcome to my library</h1>";
    var i = submittedData.length;
    output += "<div>"+ (submittedData[i-1]).guestname + "</div>";
    output += "<br/>";

    // node.js 读html内容

    fs.readFile(
        rootPath + '/public/mylibrarypage.html',
        (err, content) => {
            if(err){
                console.log(err);
                res.send(500);
            }
            var combinedContent = output + content;
            res.send(combinedContent);
        }
    );

    // //显示html页面
    // if (i>0){
    //     // if my node server get a new request with qurey '/'
    //     // 1. 用户并没有再次 request ‘/’
    //     // 2. 变量response是回复 request ‘/’
    //     app.get('/', function(request, response){
    //         response.sendFile('mylibrarypage.html');
    //     });
    // }

});

app.listen(80, function(){
    console.log('Example app listening on pot 80!')
});