//To see how the final website should work, run "node solution.js".
//Make sure you have installed all the dependencies with "npm i".
//The password is ILoveProgramming

// Libraries
import express from "express";
import {dirname} from "path";
import { fileURLToPath } from "url";

// Constants and init
const app = express();
const port = 3000;
const __dirname = dirname(fileURLToPath(import.meta.url));

// Middlewares
app.use(express.urlencoded({extended: true}));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html")
});

app.post("/check", (req, res) => {
    const {password} = req.body;
    if(password === "ILoveProgramming"){
        res.sendFile(__dirname + "/public/secret.html")
    }else{
        res.send("The secret is incorrect!");
    }
});

app.listen(port, () => {
    console.log(`Listening at port ${port}`);
});