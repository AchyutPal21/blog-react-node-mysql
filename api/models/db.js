import mysql from "mysql";
import dotenv from "dotenv";
dotenv.config();

const DB = mysql.createPool({
    connectionLimit: process.env.DB_CONNECTIONLIMITS,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_SCHEMA
});



export default DB;