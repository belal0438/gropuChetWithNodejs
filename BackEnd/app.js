const express = require('express');
const sequelize = require('./util/database');
const bodyParser = require('body-parser')
app = express();

const cors = require('cors');

app.use(cors({
origin: "*",
}));



const User = require('./models/signup');
const Chatdata = require('./models/chatdata');
const group = require('./models/group');
const UserGroup = require('./models/usergroup');




app.use(bodyParser.json())


const SignupRouter = require('./routes/sign');
const LoginRouter = require('./routes/login');
const ChatdataRouter = require('./routes/chat');
const GroupRouter = require('./routes/group');


app.use('/sign',SignupRouter);
app.use('/login',LoginRouter);
app.use('/chat',ChatdataRouter);
app.use('/group',GroupRouter);



User.hasMany(Chatdata);
Chatdata.belongsTo(User)


group.hasMany(Chatdata);
Chatdata.belongsTo(group);

User.belongsToMany(group,{through:UserGroup})
group.belongsToMany(User,{through:UserGroup})


sequelize
  // .sync({ force: true })
  .sync()
  .then(result => {
    // console.log(result);
    console.log("Table created")
    app.listen(4000);
  })
  .catch(err => console.log(err));

