const {Builder, By} = require("selenium-webdriver")
const {Client} = require('pg')

// const {client} = require("../db/connection")

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
    database: DB_NAME
})


const insertIntoDB = async (language, level, sspfp) => {
    await client.query(
        `INSERT INTO langandlevels(language, level, sspfp)
        VALUES('${language}', ${level}, ${sspfp});`
    )
}


const getAllLanglvl = async (req, res) => {
    await client.connect();
    const response = await client.query(
        `SELECT 1
        FROM   information_schema.tables 
        WHERE  table_schema = 'public'
        AND    table_name = 'langandlevels'`
    )
    if(response.rowCount === 0) { // if data doesnt already exist in DB
        let driver = await new Builder().forBrowser('chrome').build()
        try {
            await driver.get('https://www.cs.bsu.edu/homepages/dmz/cs697/langtbl.htm')
            const langlevels = await driver.findElements(By.css('div')) // gets 3 divs
            let secondDivKey = Object.keys(langlevels)[1] // get the 2nd div
            const allLangLevels = await langlevels[secondDivKey].getText()
            const splitLangLevels = allLangLevels.split("\n").slice(1)
            await client.query(`CREATE TABLE langandlevels (
                language VARCHAR(255),
                level NUMERIC(4, 2),
                sspfp INT
              );`
            )
            splitLangLevels.map((eachLangLevel) => {
                const newSplitEachLangLevel = eachLangLevel.split(" ")
                const level = newSplitEachLangLevel[newSplitEachLangLevel.length - 2]
                const sspfp = newSplitEachLangLevel[newSplitEachLangLevel.length - 1]
                newSplitEachLangLevel.splice(-2, 2)
                const language = newSplitEachLangLevel.join(" ")
                insertIntoDB(language, level, sspfp)
            })
        } catch(error) {
            return res.status(500).json({msg: "Failed to create into DB", error})
        } finally {
            await driver.quit();
        }
    }

    await client.query("Select * from langandlevels")
        .then(result => res.status(200).send(result.rows))
        .catch(error => console.log(error))
    await client.end()
}
        
module.exports = {
    getAllLanglvl,
}