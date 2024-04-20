import express from "express";

const app = express();
const portNumber = 3000;

app.get("/", (req, res) => {
    res.send("<h1>Hello World</h1>"); 
});

app.get("/about", (req, res) => {
    res.send("<h1>About</h1>")
});

app.get("/contact", (req, res) => {
    res.sendStatus(200).send("<h1>Contact</h1>")
});

app.listen(portNumber, () => {
    console.log("Server listening in port " + portNumber);
});