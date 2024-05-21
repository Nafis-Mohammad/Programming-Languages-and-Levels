const {Builder, By} = require("selenium-webdriver")

const getAllLanglvl = async (req, res) => {
    // client.query("Select * from users", (err, result) => {
    //     if(!err) {
    //         res.status(200).send(result.rows)
    //     }
    // })
    // client.end
    let driver = await new Builder().forBrowser('chrome').build()
    try {
        await driver.get('https://www.cs.bsu.edu/homepages/dmz/cs697/langtbl.htm')
        const langlevels = await driver.findElements(By.css('div')) // gets 3 divs
        let secondDivKey = Object.keys(langlevels)[1] // get the 2nd div
        // console.log(await langlevels[secondDivKey].getText())
        const allLangLevels = await langlevels[secondDivKey].getText()
        console.log(typeof(allLangLevels));
        return res.status(200).json({allLangLevels})
    } catch(error) {
        return res.status(500).json({msg: "Failed to get all languages and levels", error})
    }
    finally {
        await driver.quit();
    }
    
    // console.log(langlevels);
}

module.exports = {
    getAllLanglvl,
}