const { response } = require('express')
const express=require('express')
const userHelpers = require('../helpers/userHelpers')
const adminHelper=require('../helpers/adminHelpers')
const router=express.Router()



//user Details--
const id='nis@gmail.com'
const pas='asdf'

//message
const message='Incorrect entry !!!'

router.get('/',(req,res)=>{
    if (req.session.loggedin) {
        res.redirect('/home');
    } else {
        res.render('signin',{emailErr:req.session.emailErr,passErr:req.session.passErr})
    } 
})

router.post('/login',(req,res)=>{
    userHelpers.doLogin(req.body).then((response)=>{
        if(response.status=='Invalid User'){
            req.session.emailErr=response.status
            res.redirect('/')
        }else if(response.status=='Invalid Password'){
            req.session.passErr=response.status
            res.redirect('/')
        }else{
            req.session.loggedIn=true
            res.redirect('/home')
        }
    })

})

const checkLogged=(req,res,next)=>{
    if(req.session.loggedIn){
        next()
    }else{
        res.redirect('/')
    }
}



router.get('/home',checkLogged,(req,res)=>{
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.render('home')
})

router.get('/homeLogout', (req,res)=>{
    req.session.destroy()
    res.redirect('/')
})



router.get('/signup',(req,res)=>{
    res.render('signup')
})

router.post('/logup',(req,res)=>{
        adminHelper.addUser(req.body).then(()=>{
           res.redirect('/')
        }).catch((err)=>{
           console.log(err);
        })
})

module.exports=router