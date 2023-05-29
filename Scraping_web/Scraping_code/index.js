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

    // Click on cookiebutton 
    await page
        .click('button[id="CybotCookiebotDialogBodyLevelButtonLevelOptinAllowAll"]')
        .catch(() => { })

    // Function to get the first links and returns them in an array
    const trails1 = await page.evaluate(() => {
        // Get all the links from a specific div
        var trailList = document.querySelectorAll("#content > article > div.article-wrapper > div:nth-child(4) > div > div > ul:nth-child(7) > li")
        // Convert the trailList to an iterable array
        return Array.from(trailList).map((trail) => {

            // Gett the innertext and the href from the link and returns it in an object

            const title = trail.querySelector("a").innerText
            const link = trail.querySelector("a").getAttribute("href")

            return { title, link }

        })
    })

    // Same function as above but with a diffrent div
    const trails2 = await page.evaluate(() => {
        var trailList = document.querySelectorAll("#content > article > div.article-wrapper > div:nth-child(4) > div > div > ul:nth-child(10) > li")

        return Array.from(trailList).map((trail) => {

            const title = trail.querySelector("a").innerText
            const link = trail.querySelector("a").getAttribute("href")

            return { title, link }
        })
    })

    // Same function as above but with a diffrent div
    const trails3 = await page.evaluate(() => {
        var trailList = document.querySelectorAll("#content > article > div.article-wrapper > div:nth-child(4) > div > div > ul:nth-child(13) > li")
        return Array.from(trailList).map((trail) => {

            const title = trail.querySelector("a").innerText
            const link = trail.querySelector("a").getAttribute("href")

            return { title, link }
        })
    })

    // Same function as above but with a diffrent div
    const trails4 = await page.evaluate(() => {
        var trailList = document.querySelectorAll("#content > article > div.article-wrapper > div:nth-child(4) > div > div > ul:nth-child(16) > li")

        return Array.from(trailList).map((trail) => {

            const title = trail.querySelector("a").innerText
            const link = trail.querySelector("a").getAttribute("href")

            return { title, link }
        })
    })

    // Put all the diffrent arrays to one single array and remove duplicates
    var trails = trails1.concat(trails2, trails3, trails4)
    trails = trails.filter((obj, index) => (trails.findIndex((item) => item.title === obj.title) === index))
    const objWithIdIndex = trails.findIndex((obj) => obj.title === "Europalederna")
    trails.splice(objWithIdIndex, 1)


    const all = {}

    // Loop througe all the links and click on the links
    for (let i = 0; i < trails.length; i++) {

        // wait for the delay to complete before continuing
        await new Promise(resolve => setTimeout(resolve, 1500))
        await page.goto(trails[i].link, {
            waitUntil: "domcontentloaded",
        })

        // Click on cookiebutton 
        await page
            .click('button[id="CybotCookiebotDialogBodyLevelButtonLevelOptinAllowAll"]')
            .catch(() => { })


        const information = await page.evaluate(() => {
            // Finds the div with the information I want by looking for whats inside the div
            // the divs look sligthly diffrent and that is why we have all the trys
            try {
                const informationDiv = [...document.querySelectorAll('div.u-m-0')]
                    .find(div => {
                        const h4 = div.querySelector('h4')
                        return h4 && /etapp /i.test(h4.textContent)
                    })
                children = Array.from(informationDiv.children)
            }
            catch {
                try {
                    const informationDiv = [...document.querySelectorAll('div.u-m-0')]
                        .find(div => {
                            const h4 = div.querySelector('h4')
                            return h4 && /delled /i.test(h4.textContent)
                        })
                    children = Array.from(informationDiv.children)
                }
                catch {
                    try {
                        const informationDiv = [...document.querySelectorAll('div.u-m-0')]
                            .find(div => {
                                const h4 = div.querySelector('h4')
                                return h4 && /deletapp /i.test(h4.textContent)
                            })
                        children = Array.from(informationDiv.children)
                    }
                    catch {
                        return
                    }
                }
            }

            // Convert the childTexts to an iterable array
            const childTexts = children.map(children => children.textContent)

            const searchTerm = "Etapp "

            etapper = []
            info = []

            // Sort out the data I want by lookink for the searchTerm "Etapp "
            for (let k = 0; k < childTexts.length; k++) {
                if (childTexts[k].includes(searchTerm)) {
                    console.log(childTexts[k])
                    etapper.push(childTexts[k])
                    info.push(childTexts[k + 1])
                }
            }

            return { etapper, info }

        })

        // I don't have all the trails as information because not all trails have the div, that is why I have a try and catch
        try {
            information["link"] = trails[i].link
        }
        catch {
            console.log(trails[i].title, trails[i].link)
        }

        // put everything in an object
        all[trails[i].title] = information

    }

    // Push the data to a json file
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

}

// Start scraping
getAllTrails()
