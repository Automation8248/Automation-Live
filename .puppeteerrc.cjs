const { join } = require('path');

/**
 * @type {import("puppeteer").Configuration}
 */
module.exports = {
  // Yeh Puppeteer ko sahi path par browser download aur load karne ke liye guide karega
  cacheDirectory: join(__dirname, '.cache', 'puppeteer'),
};
