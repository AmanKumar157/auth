const express = require('express');
const jwt= require('jsonwebtoken');
const JWT_SECRET = 'iamankumarr';

const app = express();  
app.use(express.json());
const users =[];



  app.post('/signUp',(req,res)=>{
    const username = req.body.username;
    const password = req.body.password;
    if(username.length<5){
        res.json({message: 'username should be atleast 5 characters'})
        return;

    }
    if(password.length<8){
         res.json({message: 'password should be atleast 8 characters'})
         return;
    }
    if (users.find((user)=>user.username===username)){
        res.json({message: 'username already exists'})
        return;
    }
    
    users.push({
        username:username,  
        password:password
    })
    res.json({message: 'user signed up successfully'})
    console.log(users);

  })

  app.post('/signIn',(req,res)=>{
    const username = req.body.username;
    const password = req.body.password;

    let founduser = null;
    for(let i=0; i<users.length; i++){
        if(users[i].username===username && users[i].password===password){
            founduser = users[i];
        }
    }

    

    if(founduser){
        //convert username over jwt token
        const token = jwt.sign({ username: founduser.username }, JWT_SECRET);
        // founduser.token = token;
        res.json({
            message: 'user signed in successfully',
            token: token
        })
    } else {
        res.json({message: 'invalid username or password'})
    }
    console.log(users);    

  })

  app.get('/me',(req,res)=>{
    const token= req.headers.token;
    //gives back username from token
    const decoded = jwt.verify(token, JWT_SECRET);
    const username = decoded.username;
    let founduser= null;
    for(let i=0; i<users.length; i++){
        if(users[i].username===username){
            founduser = users[i];
        }
    }
    if(founduser){
        res.json({
            username: founduser.username,
            password: founduser.password
        })
    } else {
        res.json({message: 'invalid token'})
    }

  })

  app.listen(3000,()=>{
    console.log('server is running on port 3000');
  } )

  // the problem is u will repeatinh logic  so  we should move all repeated logic to middleware
//   and use it in the routes where we need it. 
//   so we will create a new file called authmidd.js and 
//   move all the repeated logic to that file and use it in the routes where we need it.