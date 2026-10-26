const express = require('express');
const cookieSession = require('cookie-session');
const puppeteer = require('puppeteer');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 10000; // Render standard port

// 🔒 CREDENTIALS CONFIGURATION
const USERNAME = 'admin';
const PASSWORD = 'MySecurePassword123';

// Express Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(cookieSession({
    name: 'session',
    keys: ['super-secret-key-12345'],
    maxAge: 24 * 60 * 60 * 1000 // Session validity: 24 Hours
}));

// Authentication Check Middleware
const isAuthenticated = (req, res, next) => {
    if (req.session && req.session.isLoggedIn) {
        return next();
    }
    res.redirect('/login');
};

// 🎨 PROFESSIONAL LOGIN INTERFACE (HTML/CSS)
const loginPageHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Automation Dashboard - Login</title>
    <style>
        * { box-sizing: border-box; margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; }
        body { background: linear-gradient(135deg, #1f1c2c 0%, #928dab 100%); height: 100vh; display: flex; justify-content: center; align-items: center; }
        .login-container { background: rgba(255, 255, 255, 0.08); backdrop-filter: blur(10px); padding: 40px; border-radius: 16px; border: 1px solid rgba(255, 255, 255, 0.1); width: 100%; max-width: 400px; box-shadow: 0 15px 35px rgba(0, 0, 0, 0.3); text-align: center; }
        h2 { color: #ffffff; margin-bottom: 10px; font-weight: 600; font-size: 26px; }
        p { color: #cccccc; margin-bottom: 30px; font-size: 14px; }
        .input-group { margin-bottom: 20px; text-align: left; }
        .input-group label { display: block; color: #e0e0e0; margin-bottom: 8px; font-size: 13px; font-weight: 500; }
        .input-group input { width: 100%; padding: 14px; border-radius: 8px; border: 1px solid rgba(255, 255, 255, 0.2); background: rgba(255, 255, 255, 0.05); color: #fff; font-size: 15px; transition: 0.3s; }
        .input-group input:focus { outline: none; border-color: #00adb5; background: rgba(255, 255, 255, 0.1); }
        .btn { width: 100%; padding: 14px; border: none; border-radius: 8px; background: #00adb5; color: white; font-size: 16px; font-weight: 600; cursor: pointer; transition: 0.3s; margin-top: 10px; }
        .btn:hover { background: #007c82; box-shadow: 0 4px 15px rgba(0, 173, 181, 0.4); }
        .error-msg { color: #ff5252; font-size: 13px; margin-top: 15px; }
    </style>
</head>
<body>
    <div class="login-container">
        <h2>Control Panel</h2>
        <p>Sign in to access your secure automation environment</p>
        <form action="/login" method="POST">
            <div class="input-group">
                <label>Username</label>
                <input type="text" name="username" placeholder="Enter username" required autocomplete="off">
            </div>
            <div class="input-group">
                <label>Password</label>
                <input type="password" name="password" placeholder="Enter password" required>
            </div>
            <button type="submit" class="btn">Authenticate Server</button>
        </form>
        {{ERROR}}
    </div>
</body>
</html>
`;

// Routes
app.get('/login', (req, res) => {
    if (req.session.isLoggedIn) return res.redirect('/');
    res.send(loginPageHtml.replace('{{ERROR}}', ''));
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    if (username === USERNAME && password === PASSWORD) {
        req.session.isLoggedIn = true;
        res.redirect('/');
    } else {
        res.send(loginPageHtml.replace('{{ERROR}}', '<div class="error-msg">Invalid Username or Password!</div>'));
    }
});

// Protected Main Route (Dashboard)
app.get('/', isAuthenticated, (req, res) => {
    res.send(`
        <html lang="en">
        <head><title>System Status</title><style>body{background:#111;color:#00ff00;font-family:monospace;padding:50px;text-align:center;}h1{font-size:32px;}</style></head>
        <body>
            <h1>🚀 Core Verification Successful</h1>
            <p>System State: ONLINE | Background Browser Thread: ACTIVE</p>
        </body>
        </html>
    `);
});

// 🌐 24/7 BACKGROUND BROWSER CORE (PUPPETEER)
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
        
        // Target website jise 24/7 run karna hai
        await page.goto('https://example.com', { waitUntil: 'networkidle2' });
        console.log('Target website successfully initialized in headless browser.');

        // Keep-alive loop (Har 5 minute me refresh)
        setInterval(async () => {
            try {
                await page.reload({ waitUntil: 'networkidle2' });
                console.log('Background thread verified: Reload success.');
            } catch (err) {
                console.error('Background loop warning:', err.message);
            }
        }, 5 * 60 * 1000);

    } catch (error) {
        console.error('CRITICAL BROWSER ERROR:', error);
    }
}

app.listen(PORT, () => {
    console.log(`Secure Server Active on port ${PORT}`);
    startBrowser();
});
