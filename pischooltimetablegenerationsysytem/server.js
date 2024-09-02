const express = require("express");
const cors = require("cors");
const Schoolrout = require("./routes/Schoolrout");
const schoolCycleRoutes = require("./routes/Schoolcyclerout");
const sectionCategoryRoutes = require("./routes/Sectioncatagoryrout"); 
const sectionRoutes = require("./routes/Sectionrout");
const teacherRoutes = require("./routes/Teacherrout");

const db = require("./db");

const app = express();

// Middleware setup
app.use(cors());
app.use(express.json()); 

// Use the routes
app.use("/school", Schoolrout);
app.use("/schoolcycle", schoolCycleRoutes);
app.use("/sectioncategory", sectionCategoryRoutes); 
app.use("/sections", sectionRoutes); //
app.use("/teacher", teacherRoutes);

// Start the server
const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
