var express=require('express');
var bodyParser=require('body-parser');
var multer  = require('multer');
app=express();
app.use(bodyParser.json());

//Post Request With URL Query........................................
    app.post("/",function (req,res) {
        let firstName = req.query.firstName;
        let lastName = req.query.lastName;

        res.end("First name is:"+firstName+" and Last name is:"+lastName);
    });


//Post Request With Header..................................
    app.post("/",function (req,res) {
        let userName = req.header('userName');
        let password = req.header('password');

        res.end("User name is:" +userName+" and Password is:" +password);
    });

//Post Request With Body.............................
    app.post("/",function (req,res) {
        let JSONData=req.body;
        let JSONString=JSON.stringify(JSONData);
        res.send(JSONString);
    })

//Post Request With Body Using form-data................
    var multer= multer(); 
    app.use(multer.array());
    app.post("/",function (req,res) {
        let JSONData=req.body;
        let name=JSONData['name'];
        let city=JSONData['city'];
        let age=JSONData['age'];
        res.send("Name is: "+name+",Age is: "+age+" and City is: "+city);
    })


//file upload API support PNG,JPG file only...............................
var storage=multer.diskStorage({
    destination:function(req,file,callback){
        callback(null,'./uploads');
    },

    filename:function(req,file,callback){
        //console.log(file);
        callback(null,file.originalname);
    }


});

var upload=multer({storage:storage,
    fileFilter:(req,file,callback)=>{
        if(
            file.mimetype === "image/png" ||
            file.mimetype === "image/jpg"
        ){
          callback(null,true);
        }else{
          callback(new Error("Only .png, .jpg format allowed!"));
        }
    }
}).single('myfile')

app.post("/",function (req,res) {
    upload(req,res,function(error){
        if(error){
            res.send("File upload Fail.Only .png, .jpg format allowed!");
        }else{
            res.send('File upload success');
        }
    }); 
});

//file Download API will download from application directory................
app.get("/download",function (req,res) {
    res.download("./uploads/download.png");
})

app.listen(8000,function () {
    console.log("Server Run Success")
})