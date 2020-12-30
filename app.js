const puppeteer = require('puppeteer')

// Ler pagina do instagram

async function start(){

    async function loadMore(page, selector){
        const moreButton = await page.$(selector)
        // console.log(moreButton)
        if(moreButton){
            console.log("More button")
            await moreButton.click()
            await page.waitForSelector(selector, {timeout: 3000}).catch((error)=>{console.log(error)})
            await loadMore(page, selector)
        }
    }

    // Pegar os comentarios

    async function getComments(page, selector){
        const comments = await page.$$eval(selector, links => links.map(link => link.innerText))
        return comments
    }

    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.goto('https://www.instagram.com/p/CHbS8GTJrkG/')

    await loadMore(page, '.dCJp8')
    const comments = await getComments(page, '.C4VMK')

    console.log(comments)
}



start()

