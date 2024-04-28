import appDatabaseContext from "../models/data/appDatabaseContext.data.js"

export const GetAddBook = async (req, res) => {
    try {
        const data = await appDatabaseContext.query(`SELECT * FROM authors`);
        res.status(200).render('addBook', {
            content: data.rows
        });
    }catch(err){
        res.status(500).render('error');
    }
}

export const CreateBook = async (req, res) => {
    try {
        const {title, author, description} = req.body;
        await appDatabaseContext.query(`INSERT INTO books (title, author_id, description) VALUES ($1, $2, $3)`, [title, Number(author), description]);
        res.redirect('/');
    }catch(err){
        res.status(500).render('error');
        console.log(err);
    }
}

export const GetDeleteBook = async (req, res) => {
    try {
        const {id} = req.params;
        const data = await appDatabaseContext.query(`SELECT b.id, b.title, b.description, a.name FROM books AS b JOIN authors AS a ON b.author_id = a.id WHERE b.id = $1`, [id]);
        res.status(200).render('deleteBook', {
            content: data.rows
        });
        
    }catch(err){
        res.status(500).render('error');
        console.log(err);
    }
}

export const DeleteBook = async (req, res) => {
    try {
        const {id} = req.params;
        console.log(id);
        const data = await appDatabaseContext.query(`DELETE FROM books WHERE id = $1`, [id]);
        res.status(200).redirect("/");
        
    }catch(err){
        res.status(500).render('error');
        console.log(err);
    }
}

export const GetUpdateBook = async (req, res) => {
    try {
        const {id} = req.params;
        const data = await appDatabaseContext.query(`SELECT b.id, b.title, b.description, b.author_id, a.name FROM books AS b JOIN authors AS a ON b.author_id = a.id WHERE b.id = $1`, [id]);
        const authors = await appDatabaseContext.query(`SELECT * FROM authors WHERE id != $1`, [data.rows[0]["author_id"]]);
        res.status(200).render("updateBook", {
            content: data.rows,
            authors: authors.rows
        });
    }catch(err){
        res.status(500).render('error');
        console.log(err);
    }
}

export const UpdateBook = async (req, res) => {
    try {
        const {id} = req.params;
        const {title, author, description} = req.body;
        const data = await appDatabaseContext.query(`UPDATE books SET title = $1, author_id = $2, description = $3 WHERE id = $4`, [title, author, description, id]);
        res.status(200).redirect("/");
    }catch(err){
        res.status(500).render('error');
        console.log(err);
    }
}