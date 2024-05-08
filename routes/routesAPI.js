//require express, express router and bcrypt as shown in lecture code
const express = require("express");
const router = express.Router();
const data = require("../data");
const bcrypt = require('bcryptjs');
const userData = data.users;
router
  .route('/')
  .get(async (req, res) => {
    //code here for GET
    const user = req.session.cookie.user;
    if (user) { // user is authenticated
      console.log('[' + new Date().toUTCString() + ']: ' + req.method + ' ' + req.originalUrl + ' (Authenticated User)')
      res.send("/protected");
  }
  else { // user is not authenticated
      console.log('[' + new Date().toUTCString() + ']: ' + req.method + ' ' + req.originalUrl + ' (Non-Authenticated User)')
      // error = "Please log in with valid credentials.";
      return res.status(401).render('../views/userlogin', {Title:"Log In Page"});;
  }
  });

router
  .route('/register')
  .get(async (req, res) => {
    //code here for GET
    if (req.session.userId) {		
      return res.send('/protected');
    }
    res.render('../views/userRegister',{Title : "User Registration"});
  })
  .post(async (req, res) => {
    //code here for POST
    
    const usernameInput = req.body.usernameInput
    const passwordInput = req.body.passwordInput

    //do try part
    //console.log(passwordInput);
    //console.log(usernameInput);
		const newUser = await userData.createUser(usernameInput,passwordInput);
    if(newUser.insertedUser==false){
      error="Please use valid credentials."
      return res.render('./views/userRegister',{message:error});

    }
    else{
		req.session.userId = newUser._id; 

    return res.render('../views/userLogin',{Title : "Log In"});
    }

  
    //return res.status(500).render('../views/userRegister',{Title:"Registration",message:"There was an error"});
  
    

  });
 
router
  .route('/login')
  .post(async (req, res) => {
    //code here for POST
    const username = req.body.usernameInput; 
    const password = req.body.passwordInput;
    if (!username ||  !password){
      return res.status(401).render('../views/userLogin', {message:"username and password cannot be empty"});;

    }
	  const usercheck = await userData.checkUser(username,password);
	  if(usercheck.authenticatedUser){
      console.log('[' + new Date().toUTCString() + ']: ' + req.method + ' ' + req.originalUrl + ' (Authenticated User)')
      req.session.cookie = {
        username: usercheck.username,
        loggedIn:true
      }
      return res.status(200).redirect("/protected");

    }
    else{

      
      return res.status(401).render('../views/userLogin', {message:usercheck.message});;
    }
  });

router
  .route('/protected')
  .get(async (req, res) => {
    //code here for GET
    const user = req.session.cookie;
    console.log(user)
    // if authenticated user
    if (user) {
        //console.log("private here");
        console.log('[' + new Date().toUTCString() + ']: ' + req.method + ' ' + req.originalUrl + ' (Authenticated User)')
        res.render('../views/private', { username: user.username, date: new Date().toUTCString()});
    }
    else {
        console.log('[' + new Date().toUTCString() + ']: ' + req.method + ' ' + req.originalUrl + ' (Non-Authenticated User)')
        error = "You are not Logged In.";
        res.status(401).render('../views/forbiddenAccess', { message:error});
    }
  });

router
  .route('/logout')
  .get(async (req, res) => {
    //code here for GET
  req.session.destroy();
  res.send('Logged out');
  });

  module.exports = router;