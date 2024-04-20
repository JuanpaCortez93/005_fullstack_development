import express from "express";

const app = express();
const portNumber = 3000;

app.listen(portNumber, () => {
    console.log("Server initializated on port " + portNumber);
});