const express = require('express');
const cookieSession = require('cookie-session');
const httpProxy = require('http-proxy');
const app = express();
const proxy = httpProxy.createProxyServer({});

// 🔒 APNA USERNAME AUR PASSWORD YAHAN SET KAREIN
const USERNAME = 'admin';
const PASSWORD = 'MySecurePassword123';

app.use(express.urlencoded({ extended: true }));
app.use(cookieSession({
    name: 'session_auth_token',
    keys: ['ultra-secure-key-987654321'],
    maxAge: 24 * 60 * 60 * 1000 // Login session works for 24 hours
}));

// Premium High-End Dark Glassmorphism Interface Design
const beautifulLoginPage = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Secure Virtual OS Gateway</title>
    <style>
        * { box-sizing: border-box; margin: 0; padding: 0; font-family: 'Inter', system-ui, -apple-system, sans-serif; }
        body { background: radial-gradient(circle at top right, #2c1a4d 0%, #0f0c1b 60%, #05050a 100%); height: 100vh; display: flex; justify-content: center; align-items: center; overflow: hidden; }
        .wrapper { position: relative; width: 100%; max-width: 420px; padding: 20px; }
        .card { background: rgba(255, 255, 255, 0.03); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px); border: 1px solid rgba(255, 255, 255, 0.08); padding: 45px 35px; border-radius: 24px; box-shadow: 0 30px 60px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.1); text-align: center; }
        .logo-area { width: 64px; height: 64px; background: linear-gradient(135deg, #8a2be2, #4a00e0); margin: 0 auto 24px; border-radius: 16px; display: flex; justify-content: center; align-items: center; box-shadow: 0 10px 25px rgba(138, 43, 226, 0.4); }
        .logo-area svg { width: 32px; height: 32px; fill: #fff; }
        h2 { color: #ffffff; font-size: 26px; font-weight: 700; letter-spacing: -0.5px; margin-bottom: 8px; }
        .subtitle { color: #8e8ca7; font-size: 14px; margin-bottom: 35px; }
        .input-box { position: relative; margin-bottom: 22px; text-align: left; }
        .input-box label { display: block; color: #b5b3cd; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 8px; }
        .input-box input { width: 100%; padding: 16px 20px; border-radius: 12px; border: 1px solid rgba(255, 255, 255, 0.1); background: rgba(0, 0, 0, 0.2); color: #ffffff; font-size: 15px; transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); }
        .input-box input:focus { outline: none; border-color: #8a2be2; background: rgba(0, 0, 0, 0.4); box-shadow: 0 0 0 4px rgba(138, 43, 226, 0.15); }
        .btn { width: 100%; padding: 16px; border: none; border-radius: 12px; background: linear-gradient(135deg, #8a2be2 0%, #4a00e0 100%); color: #ffffff; font-size: 16px; font-weight: 600; cursor: pointer; transition: all 0.3s ease; margin-top: 12px; box-shadow: 0 8px 20px rgba(74, 0, 224, 0.3); }
        .btn:hover { transform: translateY(-1px); box-shadow: 0 12px 28px rgba(74, 0, 224, 0.45); filter: brightness(1.1); }
        .btn:active { transform: translateY(1px); }
        .error { color: #ff4757; font-size: 13px; margin-top: 20px; font-weight: 500; display: flex; align-items: center; justify-content: center; gap: 6px; }
    </style>
</head>
<body>
    <div class="wrapper">
        <div class="card">
            <div class="logo-area">
                <svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>
            </div>
            <h2>Initialize Node</h2>
            <p class="subtitle">Enter encrypted master keys to deploy desktop shell</p>
            <form method="POST" action="/">
                <div class="input-box">
                    <label>Terminal Identity</label>
                    <input type="text" name="user" placeholder="Username" required autocomplete="off">
                </div>
                <div class="input-box">
                    <label>Access Key</label>
                    <input type="password" name="pass" placeholder="Password" required>
                </div>
                <button type="submit" class="btn">Launch Environment</button>
            </form>
            {{ERROR_FIELD}}
        </div>
    </div>
</body>
</html>
`;

// Authentication Handling Logic
app.get('/', (req, res) => {
    if (req.session && req.session.verified) {
        // Agar pehle se login hai, toh background VNC server screen par forward karein
        return proxy.web(req, res, { target: 'http://127.0.0.1:3000' });
    }
    res.send(beautifulLoginPage.replace('{{ERROR_FIELD}}', ''));
});

app.post('/', (req, res) => {
    const { user, pass } = req.body;
    if (user === USERNAME && pass === PASSWORD) {
        req.session.verified = true;
        res.redirect('/');
    } else {
        res.send(beautifulLoginPage.replace('{{ERROR_FIELD}}', '<div class="error">⚠️ Invalid terminal identity keys</div>'));
    }
});

// noVNC ke background files aur static sockets ko authorized handle karna
app.all('/*', (req, res) => {
    if (req.session && req.session.verified) {
        proxy.web(req, res, { target: 'http://127.0.0.1:3000' });
    } else {
        res.status(401).send('Unauthorized network access handshake failed.');
    }
});

// WebSocket proxy setup taaki browser session smoothly lagatar control ho sake
const server = app.listen(3000, () => {
    console.log('Secure Interface Port active on 3000');
});

server.on('upgrade', (req, socket, head) => {
    // Sockets update rules bypass checking
    proxy.ws(req, socket, head, { target: 'ws://127.0.0.1:3000' });
});
