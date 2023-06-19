const express = require('express');
const sequelize = require('./util/database');
const bodyParser = require('body-parser')
const cors = require('cors');
app = express();

app.use(cors());


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

