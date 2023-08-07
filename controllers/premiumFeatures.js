const User = require('../models/user');
const Expense = require('../models/expense');
const sequelize = require('../util/expense');
const user = require('./user');

// const getUserLeaderBoard=async(req,res)=>{
//     try{
//         const users= await User.findAll();
//         const expenses=Expense.findAll();
//         const userAggregatedExpenses={}
//         expenses.forEach((expense)=>{
//             if(userAggregatedExpenses[expense.userId]){
//                 userAggregatedExpenses[expense.userId]=userAggregatedExpenses[expense.userId]+[expense.price]
//             }else{
//                 userAggregatedExpenses[expense.userId]=expense.price
//             }
            
//         })
//         console.log(userAggregatedExpenses);
//         res.status(200).json(userAggregatedExpenses)
        
//     }

//     catch(err){
//         console.log(err)
//     }
// }
const e = require('express');

const getUserLeaderBoard = async (req, res) => {
    try{
        const leaderboardofusers = await User.findAll({
            // attributes: ['id', 'name',[sequelize.fn('sum', sequelize.col('expenses.price')), 'total_cost'] ],
            // include: [
            //     {
            //         model: Expense,
            //         attributes: []
            //     }
            // ],
            // group:['user.id'],
            order:[['totalExpense', 'DESC']]

        })
       
        res.status(200).json(leaderboardofusers)
    
} catch (err){
    console.log(err)
    res.status(500).json(err)
}
}


module.exports={
    getUserLeaderBoard
}