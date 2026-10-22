const express = require('express');

const app = express();  
  //app instance of express application ,  
  // expresss library exports u a function and this function what u call to create an instance of express application..
app.use(express.json());
const users =[];

function generateToken(){
    let options=['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z',
    'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z',
    '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    let token = '';
    for(let i=0; i<20; i++){
        token += options[Math.floor(Math.random() * options.length)];
    }
    return token;
}

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

    // const user = users.find((user)=>{
    //     if(user.username===username && user.password===password){
    //         return true;
    //     }
    //     else{
    //         return false;
    //     }
    // });

    if(founduser){
        const token = generateToken();
        founduser.token = token;
        res.json({
            message: 'user signed in successfully',
            token: token
        })
    } else {
        res.json({message: 'invalid username or password'})
    }
    console.log(users);    

  })

  app.listen(3000,()=>{
    console.log('server is running on port 3000');
  } )
