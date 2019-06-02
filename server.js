const express = require("express");
const bodyParser = require("body-parser");

const userRoutes = require("./routes/users.route");

// Execute
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static("./public"));

// App routes
app.get("/", async (req, res) => {
  console.log("responding to root route");
  await res.send("Hello, Chau Dinh");
});

// Users routes
app.use("/users", userRoutes);

// Port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("Server starting on: " + PORT));
