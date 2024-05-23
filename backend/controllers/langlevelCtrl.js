const {Builder, By} = require("selenium-webdriver")
// const {Client} = require('pg')
const {Pool} = require("pg")

const DB_NAME = process.env.DB_NAME;
const DB_USER = process.env.DB_USER || 'postgres';
const DB_HOST = process.env.DB_HOST || 'localhost';
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_PORT = process.env.DB_PORT || 5432;

// connect to Database using configurations provided in .env file
const pool = new Pool({
    host: DB_HOST,
    user: DB_USER ,
    port: DB_PORT,
    password: DB_PASSWORD,
    database: DB_NAME
})


const insertIntoDB = async (language, level, sspfp) => {
    await pool.query(
        `INSERT INTO langandlevels(language, level, sspfp)
        VALUES('${language}', ${level}, ${sspfp});`
    )
}


const getAllLanglvl = async (req, res) => {
    // await pool.connect();
    // check if table exists
    const response = await pool.query(
        `SELECT 1
        FROM   information_schema.tables 
        WHERE  table_schema = 'public'
        AND    table_name = 'langandlevels'`
    )
    if(response.rowCount === 0) { // if table doesnt exist
        // fetch the required table from the website
        let driver = await new Builder().forBrowser('chrome').build()
        try {
            await driver.get('https://www.cs.bsu.edu/homepages/dmz/cs697/langtbl.htm')
            const langlevels = await driver.findElements(By.css('div')) // gets 3 divs
            let secondDivKey = Object.keys(langlevels)[1] // get the 2nd div
            const allLangLevels = await langlevels[secondDivKey].getText()
            const splitLangLevels = allLangLevels.split("\n").slice(1)

            // create the table in the DB
            await pool.query(`CREATE TABLE langandlevels (
                language VARCHAR(255),
                level NUMERIC(4, 2),
                sspfp INT
              );`
            )

            // add each row to the newly created table in the DB
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

    // select the data from the table in the DB and return it
    await pool.query("Select * from langandlevels", (err, result) => {
        if(err) {
            console.log(err);
        }
        res.status(200).json(result.rows)
    })
    // await client.end()
}
        
module.exports = {
    getAllLanglvl,
}