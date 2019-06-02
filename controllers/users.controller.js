const db = require("../db");

module.exports.getUser = (req, res) => {
  const sql = `
      SELECT
      users.id,
      users.first_name,
      users.last_name
      FROM users;
    `;

  db.query(sql, async (err, result) => {
    if (err) throw err;
    await res.send(result);
  });
};

module.exports.getUserById = async (req, res) => {
  const userId = req.params.id;
  await console.log("Fetching user with id: " + userId);
  const sql = `
    SELECT * FROM users WHERE id = ${userId};
  `;

  db.query(sql, async (err, result) => {
    if (err) {
      await res.sendStatus(500);
      throw err;
    }
    await res.send(
      result.map(row => {
        return {
          userId: row.id,
          firstName: row.first_name,
          lastName: row.last_name
        };
      })
    );
  });
};

module.exports.createUser = async (req, res) => {
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

  db.query(sql, async (err, result) => {
    if (err) throw err;
    console.log("Inserted a new user with id: ", result.insertId);
    await res.redirect("/users");
  });
};
