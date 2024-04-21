import express from "express";

const app = express();
const port = 3000;

app.get("/", (req, res) => {
    
    let data = {        
        title: "EJS Tags",
        seconds: new Date().getSeconds(),
        items: ["apple", "banana", "cherry"],
        htmlContent: "<em>This is some em text</em>"
    }
    
    res.render("index.ejs", {
        data
    })
});

app.listen(port, () => {
    console.log(`Listening from port ${port}`);
});