import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

const db = new pg.Client({
  host: "localhost",
  user: "postgres",
  password: "toor",
  database: "permalist",
  port: 5432
});

db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));



let items = [
  { id: 1, title: "Buy milk" },
  { id: 2, title: "Finish homework" },
];

async function getItems(){
  const sqlResponse = await db.query("SELECT * FROM items");
  return sqlResponse.rows;
}

async function addItems(title) {
  const sqlResponse = await db.query("INSERT INTO items (title) VALUES ($1)", [title]);
  return sqlResponse.rows;
}

async function editItems(id, title) {
  const sqlResponse = await db.query("UPDATE items SET title = $1 WHERE id = $2", [title, id]);
  return sqlResponse.rows;
}

async function deleteItems(id) {
  const sqlResponse = await db.query("DELETE FROM items WHERE id = $1", [id]);
  return sqlResponse.rows;
}

app.get("/", async (req, res) => {
  res.render("index.ejs", {
    listTitle: "Today",
    listItems: await getItems(),
  });
});

app.post("/add", async (req, res) => {
  await addItems(req.body.newItem)
  res.redirect("/");
});

app.post("/edit", (req, res) => {

  // { updatedItemId: '3', updatedItemTitle: 'See football' }

  const {updatedItemId, updatedItemTitle} = req.body;
  editItems(updatedItemId, updatedItemTitle);
  res.redirect("/");

});

app.post("/delete", (req, res) => {
  const {deleteItemId} = req.body;
  deleteItems(deleteItemId);
  res.redirect("/");

});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
