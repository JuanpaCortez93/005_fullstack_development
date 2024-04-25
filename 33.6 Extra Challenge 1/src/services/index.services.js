import { dbContext } from "../models/data/appDbContext.js";

export const GetPong = async (req, res) => {
    dbContext.connect();

    const result = await dbContext.query("SELECT 'PONG' AS RESULT");
    res.status(200).send(result.rows[0]);

    dbContext.end(); 
};