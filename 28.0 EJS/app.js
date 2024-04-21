import express from "express";

const app = express();
const port = 3000;

app.get("/", (req, res) => {
    const d = new Date();
    let day = d.getDay();
    let dayType = "";
    let advice = "";
    
    if(day == 5 || day == 6){
        dayType = "weekend!"
        advice = "rest!"
    }else{
        dayType = "weeday"
        advice = "work have!"
    }

    res.render('index.ejs', {
        dayType, 
        advice
    })
});

app.listen(port, () => {
    console.log(`Listening at port ${port}`);
});