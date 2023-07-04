const express = require('express');
const path = require('path');
const dotenv = require('dotenv')
dotenv.config()
const sequelize = require('./util/database');
const bodyParser = require('body-parser');
app = express();


const http = require('http');
const server = http.createServer(app)
const socketio = require('socket.io')
const io = socketio(server, {
  cors: {
    origin: '*'
  }
})




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
const AdminRouter = require('./routes/admin');
const FormdataRouter = require('./routes/formdata');

app.use('/sign', SignupRouter);
app.use('/login', LoginRouter);
app.use('/chat', ChatdataRouter);
app.use('/group', GroupRouter);
app.use('/admin', AdminRouter);
app.use('/formdata', FormdataRouter);

// app.use("/public", express.static(path.join(__dirname, 'public')));

app.use((req, res) => {
  console.log('urll', req.url);
  res.sendFile(path.join(__dirname, `public/${req.url}`))
})





io.on('connection', socket => {

  socket.on('send-message', (message) => {
    io.emit('receive', message );
  // console.log("message>>>>>>>>>>>>>>>>>>>>",message);
  })



  socket.on('group-message', (message) => {
    io.emit('receive', message);
    // console.log("message>>>>>>>>>>>>>>>>>>>>",message);
  })

})

User.hasMany(Chatdata);
Chatdata.belongsTo(User)


group.hasMany(Chatdata);
Chatdata.belongsTo(group);

User.belongsToMany(group, { through: UserGroup })
group.belongsToMany(User, { through: UserGroup })


sequelize
  // .sync({ force: true })
  .sync()
  .then(result => {
    // console.log(result);
    console.log("Table created")
    // app.listen(4000);
    server.listen(4000)
  })
  .catch(err => console.log(err));

