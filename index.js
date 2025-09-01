const express = require('express');
const { log } = require('node:console');
const path = require('path');
const dotenv = require('dotenv').config();
const port = process.env.PORT;
const homeRoute = require('./routes/homepage');
const signinRoute = require('./routes/signin');
const signUpRoute = require('./routes/signup');
const logOutRoute = require('./routes/logout');
const cookieParser = require('cookie-parser');
const DB_CALL = require('./db/dbCall');
const {checkforAuthenticaionCookie} = require('./middlewares/auth');
const app = express();

DB_CALL();

app.set('view engine','ejs');
app.set('views', path.resolve('./views'));
app.use(express.urlencoded({extended:false}));


app.use(cookieParser());


app.use('/', checkforAuthenticaionCookie('token'),homeRoute);
app.use('/signin',signinRoute);
app.use('/signup',signUpRoute);
app.use('/logout',logOutRoute);



app.listen(port , ()=>{
    console.log(`Server running on PORT ${port}`);
});