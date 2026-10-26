const express = require('express');
const puppeteer = require('puppeteer');
const app = express();
const PORT = process.env.PORT || 3000;

// Render ko active rakhne ke liye basic ping route
app.get('/', (req, res) => {
    res.send('Browser is running 24/7!');
});

async function startBrowser() {
    try {
        const browser = await puppeteer.launch({
            headless: true,
            args: [
                '--no-sandbox',
                '--disable-setuid-sandbox',
                '--disable-dev-shm-usage',
                '--single-process'
            ]
        });
        const page = await browser.newPage();
        
        // Yahan wo URL dalein jise aap 24/7 chalana chahte hain
        await page.goto('https://example.com', { waitUntil: 'networkidle2' });
        console.log('Browser successfully loaded the page.');

        // Browser ko crash hone se bachane ke liye keep-alive loop
        setInterval(async () => {
            try {
                await page.reload();
                console.log('Page reloaded to keep session active.');
            } catch (err) {
                console.error('Reload failed:', err);
            }
        }, 5 * 60 * 1000); // Har 5 minute me reload hoga

    } catch (error) {
        console.error('Browser error:', error);
    }
}

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    startBrowser();
});
