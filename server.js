const express = require("express");
const bodyParser = require("body-parser");

const userRoutes = require("./routes/users.route");

// Execute
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static("./public"));

// App routes
app.get("/", (req, res) => {
  console.log("responding to root route");
  res.send("Hello, Chau Dinh");
});

// Users routes
app.use("/users", userRoutes);

// Port
app.listen(process.env.PORT, () => console.log("Server starting..."));
