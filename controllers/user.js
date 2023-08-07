const User = require('../models/user');
const bcrypt = require('bcrypt')
const jwt=require('jsonwebtoken')

function isstringinvalid(string){
    if(string == undefined ||string.length === 0){
        return true
    } else {
        return false
    }
}

const signup=async (req, res) => {
    try {
      const name = req.body.name;
      const email = req.body.email;
      const phone = req.body.phone;
      const password=req.body.password
      
      if(email==undefined ||email.length===0|| name.length===0|| name==undefined || phone==undefined ||phone.length==0 || password==undefined || password.length===0){
        return res.status(400).json({message:"Bad parameter or something is missing"})
      }
  
      let saltrounds=10;
      bcrypt.hash(password,saltrounds,async(err,hash)=>{
        const data = await User.create({
         name,
        email,
        phone,
       password:hash
       
      });
          
      res.status(201).json({ message:"new user created" });
      })   
  
    } catch (err) {       
    res.status(500).json({ error:"some error", err }) 
    }
  }

  function generateAccessToken(id,name,ispremiumuser){
    return jwt.sign({userId:id,name:name,ispremiumuser},'98sh856ru454t45izklk')
  }

const login = async (req, res) => {
    try{
    const { email, password } = req.body;
    if(isstringinvalid(email) || isstringinvalid(password)){
        return res.status(400).json({message: 'EMail idor password is missing ', success: false})
    }
    console.log(password);
    const user  = await User.findAll({ where : { email }})
        if(user.length > 0){
           bcrypt.compare(password, user[0].password, (err, result) => {
           if(err){
            throw new Error('Something went wrong')
           }
            if(result === true){
                return res.status(200).json({success: true, message: "User logged in successfully",token:generateAccessToken(user[0].id,user[0].name,user[0].ispremiumuser)})
            }
            else{
            return res.status(400).json({success: false, message: 'Password is incorrect'})
           }
        })
        } else {
            return res.status(404).json({success: false, message: 'User Doesnot exitst'})
        }
    }catch(err){
        res.status(500).json({message: err, success: false})
    }
}

module.exports={login: login,signup:signup,generateAccessToken:generateAccessToken}