import appDatabaseContext from "../models/data/appDatabaseContext.data.js";

export const GetPong = async (req, res) => {
    
    try{
        const result = await appDatabaseContext.query("SELECT 'pong' AS result");    
        res.json(result.rows[0]);
    }catch(err){
        res.json(err);
    }

};

export const GetIndex = async (req, res) => {
    try {
        const data = await appDatabaseContext.query(`SELECT b.id, b.title, b.description, a.name FROM books AS b JOIN authors AS a ON b.author_id = a.id`);
        res.status(200).render('index', {
            content: data.rows
        });
    }catch(err){
        res.status(500).render('error');
    }
};