const express = require('express');


const app = express();  
  //app instance of express application ,  
  // expresss library exports u a function and this function what u call to create an instance of express application..


  app.post('/signUp',(req,res)=>{

  })


  app.post('/signIn',(req,res)=>{

  })

  app.listen(3000,()=>{
    console.log('server is running on port 3000');
  } )
