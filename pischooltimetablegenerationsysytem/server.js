const express = require("express");
const cors = require("cors");
const Schoolrout = require("./routes/Schoolrout");
const schoolCycleRoutes = require("./routes/Schoolcyclerout");
const sectionCategoryRoutes = require("./routes/Sectioncatagoryrout"); // Import the new route
const db = require("./db"); // Ensure your database connection is established

const app = express();

// Middleware setup
app.use(cors());
app.use(express.json()); // Middleware to parse JSON requests

// Use the routes
app.use("/school", Schoolrout);
app.use("/schoolcycle", schoolCycleRoutes);
app.use("/sectioncategory", sectionCategoryRoutes); // Use the new route

// Start the server
const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
