import appDatabaseContext from "../models/data/appDatabaseContext.data.js";
import axios from "axios";

export const GetSearchPage = async (req, res) => {

    const {keyword} = req.body;
    const response = await axios.get(`https://openlibrary.org/search.json?q=${keyword}`);
    const result = response.data.docs;

    res.render("search", {
        content: result
    });
};

export const SetSearchPage = async (req, res) => {
    
    let name = "";
    let description = "";
    
    const {key} = req.params;
    console.log(`https://openlibrary.org/works/${key}.json`)
    const response = await axios.get(`https://openlibrary.org/works/${key}.json`);
    const result = response.data;

    const title = result.title;
    if(result.subject_people){
        name = result.subject_people[0];    
        name = name.replace(/[^a-zA-Z\s]/g, '').trim();
    }else{
        console.log(`https://openlibrary.org${result.authors[0].author['key']}.json`)
        const authorResponse = await axios.get(`https://openlibrary.org${result.authors[0].author['key']}.json`);
        name = authorResponse.data.name;
    }

    if(result.description){
        description = result.description.value;
    }else{
        description = "Sin descripción disponible en línea";
    }

    let responseSqlAuthor = await appDatabaseContext.query("SELECT * FROM authors WHERE name LIKE $1", [name]);

    if(responseSqlAuthor.rowCount > 0){
        const authorId = responseSqlAuthor.rows[0]['id'];
        await appDatabaseContext.query("INSERT INTO books (title, author_id, description) VALUES ($1, $2, $3)", [title, authorId, description]);
        res.redirect("/");        
    }else{
        responseSqlAuthor = await appDatabaseContext.query("INSERT INTO authors (name) VALUES ($1) RETURNING id", [name]);
        const newAuthorId = responseSqlAuthor.rows[0].id;
        await appDatabaseContext.query("INSERT INTO books (title, author_id, description) VALUES ($1, $2, $3)", [title, newAuthorId, description]);
        res.redirect("/");
    }

}