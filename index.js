const express = require('express');
const { log } = require('node:console');
const path = require('path');
const dotenv = require('dotenv').config();
const port = process.env.PORT;

const app = express();

app.set('view engine','ejs');
app.set('views', path.resolve('./views'));


app.get('/',(req,res)=>{
    res.render("home");
})

app.listen(port , ()=>{
    console.log(`Server running on PORT ${port}`);
});