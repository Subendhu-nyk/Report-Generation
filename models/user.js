const Sequelize=require('sequelize')
const sequelize=require('../util/expense')
const User=sequelize.define('user',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true,
        unique:true
    },
    name:{
        type:Sequelize.STRING,    
        allowNull:false,       
       
    }, 
    email:{
        type:Sequelize.STRING,    
        allowNull:false, 
        unique:true      
       
    },    
    
    phone:{
        type:Sequelize.STRING,      
        allowNull:false,

    },
    password:{
        type:Sequelize.STRING,   
        allowNull:false,
    },
    ispremiumuser: Sequelize.BOOLEAN, 
    totalExpense:{
        type:Sequelize.INTEGER,
        defaultValue:0
    }

})

module.exports=User;