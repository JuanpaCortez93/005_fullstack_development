import express from "express";
import {dirname} from "path";
import { fileURLToPath } from "url";

var bandName = "";
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;

const bandNameGenerator = (res, req, next) => {
  console.log(res.body);
  bandName = res.body["street"] + res.body["pet"];
  next();
}

app.use(express.urlencoded({extended: true}));
app.use(bandNameGenerator);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.post("/submit", (req, res) => {
  res.send(`Your bandname is ${bandName}`);
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
