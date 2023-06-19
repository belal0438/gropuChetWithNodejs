const express = require('express');
const sequelize = require('./util/database');
const bodyParser = require('body-parser')
const cors = require('cors');
app = express();

app.use(cors());


app.use(bodyParser.json())

const SignupRouter = require('./routes/sign');
const LoginRouter = require('./routes/login');

app.use('/sign',SignupRouter);
app.use('/login',LoginRouter);


sequelize
  // .sync({ force: true })
  .sync()
  .then(result => {
    // console.log(result);
    console.log("Table created")
    app.listen(4000);
  })
  .catch(err => console.log(err));

