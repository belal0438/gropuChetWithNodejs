const express = require('express');
const sequelize = require('./util/database');
const bodyParser = require('body-parser')

app = express();

app.use(bodyParser.json())

const SignupRouter = require('./routes/sign');

app.use('/sign',SignupRouter);


sequelize
  // .sync({ force: true })
  .sync()
  .then(result => {
    // console.log(result);
    console.log("Table created")
    app.listen(4000);
  })
  .catch(err => console.log(err));

