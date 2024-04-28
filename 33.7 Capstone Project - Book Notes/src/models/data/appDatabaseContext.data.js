import pg from "pg";
import {DB_DATABASE, DB_HOST, DB_PASSWORD, DB_PORT, DB_USER} from "../../config.js"

const db = new pg.Client({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_DATABASE,
    port: DB_PORT
});

db.connect();

export default db;