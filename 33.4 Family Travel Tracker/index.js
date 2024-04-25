import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "world",
  password: "toor",
  port: 5432,
});
db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let currentUserId = 1;



async function checkVisisted(currentUserId) {
  const result = await db.query("SELECT country_code FROM visited_countries WHERE user_id = $1", [currentUserId]);
  let countries = [];
  result.rows.forEach((country) => {
    countries.push(country.country_code);
  });
  return countries;
}

async function downloadUsers() {
  const result = await db.query("SELECT * FROM users");
  let users = [];
  result.rows.forEach((user) => {
    users.push(user);
  });
  return users;
}

app.get("/", async (req, res) => {
  const countries = await checkVisisted(currentUserId);
  const users = await downloadUsers();
  res.render("index.ejs", {
    countries: countries,
    total: countries.length,
    users: users,
    color: users.find(user => user.id == currentUserId).color,
  });
});

app.post("/add", async (req, res) => {
  const input = req.body["country"];
  try {
    const result = await db.query(
      "SELECT country_code FROM countries WHERE LOWER(country_name) LIKE '%' || $1 || '%';",
      [input.toLowerCase()]
    );

    const data = result.rows[0];
    const countryCode = data.country_code;

    const response = await db.query("SELECT country_code FROM visited_countries WHERE user_id = $1 AND country_code = $2", [currentUserId, countryCode]);
    
    if(response.rowCount == 0){
      try {
        await db.query(
          "INSERT INTO visited_countries (country_code, user_id) VALUES ($1, $2)",
          [countryCode, currentUserId]
        );
        res.redirect("/");
  
      } catch (err) {
        console.log(err); 
      }
    }else{
      const countries = await checkVisisted(currentUserId);
      const users = await downloadUsers();
      let total = countries.length;
      const error = "Country has already been added, try again";
      res.render("index.ejs", {
        countries,
        total,
        users,
        error,
        color: users.find(user => user.id == currentUserId).color
      });
    }
  } catch (err) {
    const countries = await checkVisisted(currentUserId);
    const users = await downloadUsers();
    let total = countries.length;
    const error = "Country has not been found, try again";
    res.render("index.ejs", {
      countries,
      total,
      users,
      error,
      color: users.find(user => user.id == currentUserId).color
    });
  }
});

app.post("/user", async (req, res) => {

  console.log('user' in req.body);

  if('user' in req.body){
    const {user} = req.body;
    currentUserId = user;

    const countries = await checkVisisted(currentUserId);
    const users = await downloadUsers();
    res.render("index.ejs", {
      countries: countries,
      total: countries.length,
      users: users,
      color: users.find(user => user.id == currentUserId).color
    });
  }else{
    res.render('new.ejs');
  }
});

app.post("/new", async (req, res) => {
  //Hint: The RETURNING keyword can return the data that was inserted.
  //https://www.postgresql.org/docs/current/dml-returning.html

  const name = req.body.name;
  const color = req.body.color;

  const result = await db.query(
    "INSERT INTO users (name, color) VALUES($1, $2) RETURNING *;",
    [name, color]
  );

  const id = result.rows[0].id;
  currentUserId = id;

  res.redirect("/");

});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
