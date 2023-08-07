const express=require('express')
const dotenv = require('dotenv');
const app=express()
const path=require('path')
const bcrypt=require('bcrypt')
const sequelize=require('./util/expense')
const Expense = require('./models/expense')
const User=require('./models/user')
const Order = require('./models/orders');
const bodyParser=require('body-parser')
const router=require('./routes/expense')
const userRoutes = require('./routes/user')
const purchaseRoutes = require('./routes/purchase')
const premiumFeatureRoutes = require('./routes/premiumFeatures')
const forgetPasswordRoutes = require('./routes/forgetpassword')
const Forgotpassword = require('./models/forgetpassword')

app.use(express.json());
const cors=require('cors')
app.use(cors())
app.use(express.static(path.join(__dirname, '..','views')));
app.use(express.static(path.join(__dirname,'public')))
app.use(bodyParser.urlencoded({extended:false}))


dotenv.config();
app.use(router)
app.use('/user', userRoutes)
app.use('/purchase', purchaseRoutes)
app.use('/premium', premiumFeatureRoutes)
app.use('/password',forgetPasswordRoutes)


User.hasMany(Expense);
Expense.belongsTo(User);

User.hasMany(Order);
Order.belongsTo(User);

User.hasMany(Forgotpassword);
Forgotpassword.belongsTo(User);


sequelize.sync({ alter: true })
  .then(() => {
    app.listen(2000);
    console.log('Database schema updated.');
  })
  .catch((err) => {
    console.error('Error updating database schema:', err);
  });



