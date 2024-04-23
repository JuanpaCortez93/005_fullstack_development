import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const API_URL = "https://libraries.io/api/npm/";

app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));

app.get("/", (req, res) => {
    res.render('index.ejs');
});

app.post("/", async (req, res) => {

    const {library} = req.body;

    try{
        const response = await axios.get(API_URL + library + "?api_key=458f55b5c8e261d862f9aace704eea51");
        const result = response.data.keywords;
        console.log(result);
        res.render('index.ejs', {
            content: result
        });
    }catch(error){
        res.status(404).render('index.ejs');
    }

});

app.listen(port, () => {
    console.log(`Listening at port ${port}`)
});