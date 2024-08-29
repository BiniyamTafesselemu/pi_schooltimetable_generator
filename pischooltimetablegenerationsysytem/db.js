const mysql = require("mysql2");  

const db = mysql.createConnection({  
    host: "localhost",  
    user: "root",  
    password: "",  
    database: "pi"  
});  

db.connect((err) => {  
    if (err) {  
        console.error("Connection failed:" + err.stack);  
        return;  
    }  
    console.log("Connected successfully to the database");  
});  

module.exports = db;