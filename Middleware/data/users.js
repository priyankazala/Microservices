const bcrypt = require('bcryptjs');
const mongoCollections = require('../config/mongoCollections');
const usrs = mongoCollections.users;
const helpers = require('../helpers')
mongo = require('mongodb');

const createUser = async (username, password)=>{ 
	//console.log(username);
	password =  helpers.checkpassword(password);
	username =  helpers.checkusername(username);
	//console.log(username);
	const userData = await usrs();
    let userName = username.trim().toLowerCase();
    let usernameExist = await userData.findOne({userName});
	if (usernameExist !== null)
        throw "the username is already exist"
    
  
    //console.log(password);
    const salt = await bcrypt.genSalt(6);
  	const hash = await bcrypt.hash(password, salt);
    
	
  let newUser = {
    username: userName, 
    password: hash,
	salt: salt
	};
	console.log(password);
	const newInsertInformation = await userData.insertOne(newUser);
	console.log(newInsertInformation)
	try{
		if (newInsertInformation.insertedCount === 0) throw 'Insert failed!';
		else{ return {insertedUser: true}}}
	catch(e){
		return { insertedUser: false,
			message:"Insert falied"};
	}
};

const checkUser = async (username, password) => {
  try{
  const userData = await usrs();
  const user = await userData.findOne({username: username});
  console.log(user)
  
  
        if (user){
			const salt = user.salt;
			const hash = await bcrypt.hash(password, salt);
			
			comparePassword = await bcrypt.compare(hash, user.password);
			 if(hash == user.password){
				return {
				authenticatedUser: true,
				username:username,
				password:password
        	};}
			else{
				return {
					authenticatedUser: false,
					message: "incorrect data"
				};
			} 

		}
	
	}

  	catch{
		return {
			authenticatedUser: false,
			message: "No data exist for this user!"
		};
	}
			  
			
		
    
 };

module.exports = {createUser,checkUser};

