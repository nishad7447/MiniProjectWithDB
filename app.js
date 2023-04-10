const express = require('express');
const path = require('path')
const app = express();
const session=require('express-session')
const bodyparser=require('body-parser')
const db=require('./config/connection')
const nocache = require('nocache');

const userRouter=require('./routes/user')
const adminRouter=require('./routes/admin');


app.set('view engine', 'hbs');
app.use('/static',express.static(path.join(__dirname,'public')))
//seting up session
app.use(session({
    
  secret:"my_secret_key",
  resave:false,
  saveUninitialized:false,
  cookie:{secure:false} //if using HTTPS set true
}))
app.use(bodyparser.urlencoded({extended:false}))
app.use(nocache())
app.use(userRouter)
app.use(adminRouter)
 

db.connect((err)=>{
  if(err)console.log("Connection err",err);
  else console.log("DB connected");
})


app.listen(3001,()=>{
    console.log('server started in http://localhost:3001 !!');
  })
