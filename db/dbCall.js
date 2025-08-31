const mongoose = require('mongoose');

const db =  async function dbCall() {
    try {
        const db = await mongoose.connect(`mongodb://127.0.0.1:27017/${process.env.DB_NAME}`);
        console.log("DB CONNECTED");
        
    } catch (error) {
        console.log("Error while connecting with db", error);
    }
    


}

module.exports = db;