require("dotenv").config();
const mysql = require("mysql");

// Connect to database
const db = mysql.createConnection({
  host: "localhost",
  user: "leslie",
  password: `${process.env.PASSWORD_DB}`,
  database: "mysql_crud"
});

db.connect(err => {
  if (err) throw err;
  console.log("MySQL connected....");
});

module.exports = db;
