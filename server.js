const express  = require('express');
const app = express();
const bodyparser = require('body-parser');  

app.use(bodyparser.json());         //support json encoded bodies.

app.use(bodyparser.urlencoded({
     extended: true 
}));                                //support json encoded bodies.

//static data for users.
var users = [
                {id:1,fName:"Test1", lName:"Zap"},
                {id:2,fName:"Test2", lName:"Zap"},
                {id:3,fName:"Test3", lName:"Zap"},                
            ];

app.get("/", (req, res) => res.send("Welcome to Express API demo"));


//display all the users.
app.get("/api/getAllUsers", function(req, res){    
    console.log("get all users ::\n ",users);
    return res.send({"status" : "true", "data" : users}); 
});

//delete user by id.
app.get("/api/deleteUser/:id", function(req, res){
    let userId = req.params.id;
    let flag = false;

    for(let i = 0; i < users.length; i++){
        if(users[i].id == userId){
            users.splice(i, 1);
            console.log("user deleted :: ",userId);
            flag = true;            
        }else{
            console.log("user not found.");
            flag = false;            
        }
    }    

    if(flag == true){
        return res.send({"status" : "true", "message" : "user successfully deleted."});  
    }else{
        return res.send({"status" : "false","message" : "user not found." });  
    }
});

//add user data.
app.post("/api/addUser", function(req, res){
    console.log("user data want to add ::",req.body);
    let id = users.length + 1;
    users.push({
                    "id"    : id,
                    "fName" : req.body.fName,
                    "lName" : req.body.lName 
                });

    return res.send({"status" : "true", "data" : users });    
});

//edit user by id.
app.post('/api/editUser/:id',function(req,res){
    let userId  = req.params.id;    
    
    for(let i = 0; i < users.length; i++){        
        if(users[i].id == userId){
            users[i].fName = req.body.fName;
            users[i].lName = req.body.lName;
            console.log("user updated :: ",userId);
            flag = true;            
        }else{
            console.log("user not found.");
            flag = true;            
        }
    }
    
    if(flag == true){
        return res.send({"status" : "true", "message" : "user successfully updated.", "data" : users});  
    }else{
        return res.send({"status" : "false","message" : "user not found." });  
    }
}); 


//start Server
var server = app.listen(3000,function(){
    console.log("Listening to port",server.address().port);
 });