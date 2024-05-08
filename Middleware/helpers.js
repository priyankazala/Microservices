//You can add and export any helper functions you want here. If you aren't using any, then you can just leave this file as is.

const checkpassword= (password)=>{
    if ( password.trim().length === 0 || !password|| password==null) throw { statusCode: 400, message: 'Enter a password which is valid and of string type!' };
    if (typeof password != 'string') throw { statusCode: 400, message: 'Enter a password which is of string type!' };
    if (password.length < 6 || password.indexOf(' ')>=0) throw { statusCode: 400, message: 'Password should be atleast 6 character long and without spaces!' };
  
    var passw=  "^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?!.*(\S)\1)(?!.*è).{6,24}$";
    let toggle=false;
    if(password.match(passw)){toggle=true;}
    if(toggle=false){
        throw "Password should have atleast 1 uppercase,1 lowercase, 1 special character and 1 number. There should be no spaces in the password."
    }
    return password;

};
const checkusername= (username)=>{
    try{
        if (username.length < 0 || username.trim().length === 0 || !username) throw { statusCode: 400, message: 'Enter an username which is valid and of string type!' };
    if (typeof username != 'string') throw { statusCode: 400, message: 'Enter an username which is of string type!' };
    if(!/^[a-z][0-9]*/.test(username)) throw { statusCode: 400, message: 'Enter an username with alphanumeric values!' };
    if (username.length < 4) throw { statusCode: 400, message: 'Username should be atleast 4 character long!' };
    return username
    }
    catch{
        console.log(error);
    }
    
    
};

module.exports={checkpassword,checkusername}