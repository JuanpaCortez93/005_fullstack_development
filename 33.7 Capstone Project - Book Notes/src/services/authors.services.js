import appDatabaseContext from "../models/data/appDatabaseContext.data.js"

export const GetViewAuthors = async (req, res) => {
    const result = await appDatabaseContext.query("SELECT * FROM authors");
    res.render('authors', {
        content: result.rows
    });
};

export const GetAddAuthors = (req, res) => {
    res.render('addAuthor');
};

export const AddAuthors = async (req, res) => {
    const {name} = req.body;
    await appDatabaseContext.query("INSERT INTO authors (name) VALUES ($1)", [name]);
    res.redirect('/authors/viewAuthors');
};

export const GetDeleteAuthors = async (req, res) => {
    const {id} = req.params;
    const result = await appDatabaseContext.query("SELECT * FROM authors WHERE id = $1", [id]);
    res.render('deleteAuthor', {
        content: result.rows
    });
};

export const DeleteAuthors = async (req, res) => {
    const {id} = req.params;
    const result = await appDatabaseContext.query("DELETE FROM authors WHERE id = $1", [id]);
    res.redirect('/authors/viewAuthors');
};