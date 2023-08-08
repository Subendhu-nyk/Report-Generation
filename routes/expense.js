const express=require('express')
const router=express.Router()
const path=require('path')
const Sequelize=require('../models/expense')
const bodyParser=require('body-parser')
const postExpenseController=require('../controllers/expense')
router.use(express.json());
const cors=require('cors')
const userauthentication=require('../middleware/auth')
router.use(cors())
router.use(express.static(path.join(__dirname,'public')))
router.use(express.static(path.join(__dirname, '..', 'views')));
router.use(bodyParser.urlencoded({extended:false}))

router.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'..','views','index.html'))
})


router.post('/user/add-expense',userauthentication.authenticate,postExpenseController.postExpense );

router.get('/user/get-expense',userauthentication.authenticate,postExpenseController.getExpense)

router.delete('/user/delete-expense/:id',userauthentication.authenticate,postExpenseController.deleteExpense)

router.get('/download', userauthentication.authenticate, postExpenseController.downloadExpenses)

module.exports=router;