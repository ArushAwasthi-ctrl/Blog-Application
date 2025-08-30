const express = require('express');
const { log } = require('node:console');
const path = require('path');
const dotenv = require('dotenv').config();
const port = process.env.PORT;
const homeRoute = require('./routes/homepage')
const signinRoute = require('./routes/signin')
const signUpRoute = require('./routes/singup')

const app = express();

app.set('view engine','ejs');
app.set('views', path.resolve('./views'));

app.use('/',homeRoute);
app.use('/signin',signinRoute);
app.use('/signup',signUpRoute);



app.listen(port , ()=>{
    console.log(`Server running on PORT ${port}`);
});