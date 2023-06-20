const express = require('express');
const sequelize = require('./util/database');
const bodyParser = require('body-parser')
const cors = require('cors');

const user = require('./models/signup');
const data = require('./models/chatdata');


app = express();
app.use(cors());
app.use(bodyParser.json())


const SignupRouter = require('./routes/sign');
const LoginRouter = require('./routes/login');
const ChatdataRouter = require('./routes/chat')

app.use('/sign',SignupRouter);
app.use('/login',LoginRouter);
app.use('/chat',ChatdataRouter);



user.hasMany(data);
data.belongsTo(user)



sequelize
  // .sync({ force: true })
  .sync()
  .then(result => {
    // console.log(result);
    console.log("Table created")
    app.listen(4000);
  })
  .catch(err => console.log(err));

