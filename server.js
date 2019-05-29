const express = require("express");
const mysql = require("mysql");

// Execute
const app = express();

// Connect to database
const db = mysql.createConnection({
  host: "localhost",
  user: "leslie",
  password: "katetsui1995",
  database: "acme"
});

db.connect();

// App routes
app.get("/users", (req, res) => {
  const sql = `
      SELECT
      comments.body,
      posts.title,
      users.first_name,
      users.last_name
      FROM comments
      INNER JOIN posts on posts.id = comments.post_id
      INNER JOIN users on users.id = comments.user_id
      ORDER BY posts.title;
    `;

  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

// Port
app.listen(5000, () => console.log("Server starting..."));
