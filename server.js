const express = require("express");
const bodyParser = require("body-parser");

const userRoutes = require("./routes/users.route");

// Execute
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static("./public"));

// Users routes
app.use("/users", userRoutes);

// Port
app.listen(process.env.PORT, () => console.log("Server starting..."));
