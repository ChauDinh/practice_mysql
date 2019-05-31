const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");

// Execute
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static("./public"));

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

app.post("/users/create", (req, res) => {
  console.log("Trying to create a new user...");

  const data = {
    first_name: req.body.first_name,
    last_name: req.body.last_name
  };

  const sql = `
    INSERT INTO users (first_name, last_name) VALUES ('${data.first_name}', '${
    data.last_name
  }');
  `;

  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log("Inserted a new user with id: ", result.insertId);
    res.end();
  });
});

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
