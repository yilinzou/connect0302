var express = require('express');
//require the module
var app = express();

// tell express to look in the public directory for any files, first!
app.use(express.static("public"));






//the default route of /and what to do!
app.get("/", function(req,res){
    res.send("here is another test2021.2.28")
});


app.listen(80,function(){
    console.log('example log listen on port 80');
});

