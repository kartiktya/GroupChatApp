const fs = require('fs'); // node file system, which is a core module
const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
//const helmet = require('helmet');
//const morgan = require('morgan');

var cors = require('cors');

const sequelize = require('./util/database.js');

const User = require('./models/User.js');
const Message = require('./models/Message.js');
const Group = require('./models/Group.js');

// const forgotPasswordRequest = require('./models/ForgotPasswordRequest.js');
// const ExpenseFilesDownloaded = require('./models/ExpenseFilesDownloaded.js');

const app = express();

// const accessLogStream = fs.createWriteStream(
//     path.join(__dirname, 'access.log'), 
//     { flags: 'a' }
// );

app.use(cors( {

    origin: '*',

}));
    
//app.use(helmet());
// app.use(helmet({
//     contentSecurityPolicy: false,
//   }));
// app.use(morgan('combined', { stream: accessLogStream }));

const userRoutes = require('./routes/user.js');
const passwordRoutes = require('./routes/password.js');


app.use(bodyParser.json({ extended: false }));


app.use('/user', userRoutes);
app.use('/password', passwordRoutes);

// app.use('/', (req, res, next) => {
//     res.sendFile(path.join(__dirname, `public/index.html`));
//     next();
// });


// app.use((req, res, next) => {
//     console.log('req url:', req.url);
//      res.sendFile(path.join(__dirname, `public/${req.url}`));
//     //res.sendFile(path.join(__dirname, `public/login/login.html`));
// });

User.hasMany(Message);
Message.belongsTo(User);

User.belongsToMany(Group, { through: 'userGroup' });
Group.belongsToMany(User, { through: 'userGroup' });

Group.hasMany(Message);
Message.belongsTo(Group);

// User.hasMany(forgotPasswordRequest);
// forgotPasswordRequest.belongsTo(User);


sequelize
.sync()
//.sync({force: true})
.then()
.catch(err => console.log(err));

app.listen(process.env.PORT || 3000);