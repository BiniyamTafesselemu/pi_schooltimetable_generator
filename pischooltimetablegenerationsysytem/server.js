const express = require("express");  
const cors = require("cors");  
const Schoolrout = require("./routes/Schoolrout");  
const schoolCycleRoutes = require("./routes/Schoolcyclerout");  
const db = require("./db"); // Import the database connection  

const app = express();  
app.use(cors());  
app.use(express.json());  
app.use(express.urlencoded({ extended: true })); // To support URL-encoded bodies  

app.use("/school", Schoolrout);  
app.use("/schoolcycle", schoolCycleRoutes); // Ensure the variable name matches  

app.listen(8081, () => {  
    console.log("Server is running on http://localhost:8081");  
});