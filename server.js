const express = require("express");
const mysql = require("mysql");

// Execute
const app = express();

// Connect to database
const db = mysql.createConnection({
  host: "localhost",
  user: "leslie",
  password: "katetsui1995",
  database: "mysql_crud"
});

db.connect(err => {
  if (err) throw err;
  console.log("MySQL connected....");
});

// App routes
app.get("/users", (req, res) => {
  const sql = `
      SELECT
      users.id,
      users.first_name,
      users.last_name
      FROM users;
    `;

  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

app.get("/users/:id", (req, res) => {
  const userId = req.params.id;
  console.log("Fetching user with id: " + userId);
  const sql = `
    SELECT * FROM users WHERE id = ${userId};
  `;

  db.query(sql, (err, result) => {
    if (err) {
      res.sendStatus(500);
      throw err;
    }
    res.send(
      result.map(row => {
        return {
          userId: row.id,
          firstName: row.first_name,
          lastName: row.last_name
        };
      })
    );
  });
});

// Port
app.listen(5000, () => console.log("Server starting..."));
