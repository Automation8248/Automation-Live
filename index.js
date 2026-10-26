const express = require('express');
const basicAuth = require('express-basic-auth');
const puppeteer = require('puppeteer');
const app = express();
const PORT = process.env.PORT || 3000;

// 🔒 BASIC AUTH CONFIGURATION
// Yahan apna pasand ka username aur password set karein
const USERNAME = 'admin'; 
const PASSWORD = 'MySecurePassword123'; 

app.use(basicAuth({
    users: { [USERNAME]: PASSWORD },
    challenge: true, // Yeh browser me login popup dikhayega
    unauthorizedResponse: 'Unauthorized Access: Invalid Credentials.'
}));

// Render ko active rakhne ke liye protected ping route
app.get('/', (req, res) => {
    res.send('Authenticated successfully! Browser is running 24/7.');
});

async function startBrowser() {
    try {
        console.log('Launching secure background browser...');
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
        
        // Jis target website ko 24/7 chalana hai uska URL yahan dalein
        await page.goto('https://example.com', { waitUntil: 'networkidle2' });
        console.log('Target website successfully loaded in background.');

        // Keep-alive loop (Har 5 minute me reload)
        setInterval(async () => {
            try {
                await page.reload();
                console.log('Background browser reloaded successfully.');
            } catch (err) {
                console.error('Background browser reload failed:', err);
            }
        }, 5 * 60 * 1000);

} catch (error) {
        console.error('Browser initialization error:', error);
    }
}

app.listen(PORT, () => {
    console.log(`Secure server running on port ${PORT}`);
    startBrowser();
});
