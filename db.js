require("dotenv").config();
const mysql = require("mysql");

// Connect to database
const db = mysql.createConnection({
  host: "us-cdbr-iron-east-02.cleardb.net",
  user: "bfc9ad77a93f71",
  password: "1e466d4c",
  database: "heroku_9d752f9c95feb4d"
});

db.connect(err => {
  if (err) throw err;
  console.log("MySQL connected....");
});

module.exports = db;
