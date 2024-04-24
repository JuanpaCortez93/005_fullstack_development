import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

const db = new pg.Client({
  host: "localhost", 
  user: "postgres",
  password: "toor",
  database: "world",
  port: 5432
});

db.connect();

async function getVisitedCountries(){
  const response = await db.query("SELECT country_code FROM visited_countries");
  let countries = [];

  response.rows.forEach(country => {
    countries.push(country.country_code);
  });

  return countries;
}

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", async (req, res) => {
  //Write your code here.

  const countries = await getVisitedCountries();
  let total = countries.length;

  res.render('index.ejs', {
    total, countries
  });
});

app.post("/add", async (req, res) => {

  const {country} = req.body;
  
  let response = await db.query("SELECT country_code FROM countries WHERE LOWER(country_name) = $1", [country.toLowerCase()]);

  if(response.rowCount > 0){
    let result = response.rows[0].country_code;

    try {
      await db.query("INSERT INTO visited_countries (country_code) VALUES ($1)", [result]);
      res.redirect('/');
    }catch(err){
      const countries = await getVisitedCountries();
      let total = countries.length;
      const error = "Country has already been added, try again";

      res.render("index.ejs", {
        countries, total, error
      })
    }

  }else{
    const countries = await getVisitedCountries();
    let total = countries.length;
    const error = "Country does not exist, try again";

    res.render("index.ejs", {
      countries, total, error
    })
  }


  


});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
