import puppeteer from "puppeteer"
import * as fs from "fs"


const getAllTrails = async () => {
    // Start a Puppeteer session with:
    // - a visible browser (`headless: false` - easier to debug because you'll see the browser in action)
    // - no default viewport (`defaultViewport: null` - website page will in full width and height)
    const browser = await puppeteer.launch({
        headless: false,
        defaultViewport: null,
    })

    // Open a new page
    const page = await browser.newPage()

    // On this new page:
    await page.goto("https://www.svenskaturistforeningen.se/guider-tips/leder/", {
        waitUntil: "domcontentloaded",
    })
    await page
        .click('button[id="CybotCookiebotDialogBodyLevelButtonLevelOptinAllowAll"]')
        .catch(() => { })

    const trails1 = await page.evaluate(() => {
        // Get the displayed text and returns it
        var trailList = document.querySelectorAll("#content > article > div.article-wrapper > div:nth-child(4) > div > div > ul:nth-child(7) > li")
        // Convert the quoteList to an iterable array
        return Array.from(trailList).map((trail) => {
            // Fetch the sub-elements from the previously fetched quote element
            // Get the displayed text and return it (`.innerText`)

            const title = trail.querySelector("a").innerText

            const link = trail.querySelector("a").getAttribute("href")

            return { title, link }

        })

        // Start the scraping
    })
    const trails2 = await page.evaluate(() => {
        // Get the displayed text and returns it
        var trailList = document.querySelectorAll("#content > article > div.article-wrapper > div:nth-child(4) > div > div > ul:nth-child(10) > li")
        // Convert the quoteList to an iterable array
        return Array.from(trailList).map((trail) => {
            // Fetch the sub-elements from the previously fetched quote element
            // Get the displayed text and return it (`.innerText`)

            const title = trail.querySelector("a").innerText

            const link = trail.querySelector("a").getAttribute("href")

            return { title, link }

        })

        // Start the scraping
    })
    const trails3 = await page.evaluate(() => {
        // Get the displayed text and returns it
        var trailList = document.querySelectorAll("#content > article > div.article-wrapper > div:nth-child(4) > div > div > ul:nth-child(13) > li")
        // Convert the quoteList to an iterable array
        return Array.from(trailList).map((trail) => {
            // Fetch the sub-elements from the previously fetched quote element
            // Get the displayed text and return it (`.innerText`)

            const title = trail.querySelector("a").innerText

            const link = trail.querySelector("a").getAttribute("href")

            return { title, link }

        })

        // Start the scraping
    })
    const trails4 = await page.evaluate(() => {
        // Get the displayed text and returns it
        var trailList = document.querySelectorAll("#content > article > div.article-wrapper > div:nth-child(4) > div > div > ul:nth-child(16) > li")
        // Convert the quoteList to an iterable array
        return Array.from(trailList).map((trail) => {
            // Fetch the sub-elements from the previously fetched quote element
            // Get the displayed text and return it (`.innerText`)

            const title = trail.querySelector("a").innerText

            const link = trail.querySelector("a").getAttribute("href")

            return { title, link }

        })

        // Start the scraping
    })
    var trails = trails1.concat(trails2, trails3, trails4)
    trails = trails.filter((obj, index) => (trails.findIndex((item) => item.title === obj.title) === index))
    const objWithIdIndex = trails.findIndex((obj) => obj.title === "Europalederna")
    trails.splice(objWithIdIndex, 1)


    const all = {}


    for (let i = 0; i < trails.length; i++) {
        await new Promise(resolve => setTimeout(resolve, 1500)) // wait for the delay to complete before continuing
        await page.goto(trails[i].link, {
            waitUntil: "domcontentloaded",
        })
        await page
            .click('button[id="CybotCookiebotDialogBodyLevelButtonLevelOptinAllowAll"]')
            .catch(() => { })
        const information = await page.evaluate(() => {
            // Get the displayed text and returns it
            // var informationDiv = document.querySelector("#content > article > div.article-wrapper > div:nth-child(4) > div > div")


            informationDiv = [...document.querySelectorAll('div.u-m-0')]
                .find(div => div.querySelector('h4') && div.querySelector('h4').textContent.includes('Etapp '))


            // Convert the quoteList to an iterable array
            try {
                children = Array.from(informationDiv.children)
            }
            catch {
                console.log("Hej")
                return
            }

            const childTexts = children.map(children => children.textContent)


            const searchTerm = "Etapp "

            const infoOb = {}
            etapper = []
            info = []

            for (let k = 0; k < childTexts.length; k++) {
                if (childTexts[k].includes(searchTerm)) {
                    console.log(childTexts[k])
                    etapper.push(childTexts[k])
                    info.push(childTexts[k + 1])
                }
            }


            infoOb.Etap = etapper
            infoOb.info = info

            return { etapper, info }

        })
        try {
            information["link"] = trails[i].link
        }
        catch {
            console.log(trails[i].title, trails[i].link)
        }
        all[trails[i].title] = information

    }

    // console.log(all)
    let data = JSON.stringify(all)
    console.log(data)
    fs.writeFile("Data.json", data, (error) => {
        // throwing the error
        // in case of a writing problem
        if (error) {
            // logging the error
            console.error(error)
            throw error

        }
    })

    // }
}

getAllTrails()


