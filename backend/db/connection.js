const {Client} = require('pg')

const DB_NAME = process.env.DB_NAME;
const DB_USER = process.env.DB_USER || 'postgres';
const DB_HOST = process.env.DB_HOST || 'localhost';
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_PORT = process.env.DB_PORT || 5432;

const client = new Client({
    host: DB_HOST,
    user: DB_USER ,
    port: DB_PORT,
    password: DB_PASSWORD,
    // database: 'postgres'
})

const setupDatabase = async function() {
    await client.connect();
    
    // check if the database exists
    const res = await client.query(`SELECT datname FROM pg_catalog.pg_database WHERE datname = '${DB_NAME}'`);
    

    if (res.rowCount === 0) {   // if the database doesnt exist, create a new one
        console.log(`${DB_NAME} database not found, creating it.`);
        await client.query(`CREATE DATABASE "${DB_NAME}";`);
        console.log(`created database ${DB_NAME}`);
    } else {    // otherwise do nothing
        console.log(`${DB_NAME} database exists.`);
    }
    
    await client.end()
}

// setupDatabase()

module.exports = {setupDatabase, client}