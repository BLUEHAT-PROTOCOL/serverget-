// chrome-fix.js
const { exec } = require('child_process');
const os = require('os');
const path = require('path');

console.log('🔧 Chrome CORS Fix Tool');
console.log('=======================');

const platform = os.platform();

const commands = {
  win32: `start chrome.exe --disable-web-security --user-data-dir="${path.join(os.tmpdir(), 'chrome_dev')}" --disable-site-isolation-trials`,
  darwin: `open -n -a /Applications/Google\\ Chrome.app/Contents/MacOS/Google\\ Chrome --args --user-data-dir="${path.join(os.tmpdir(), 'chrome_dev')}" --disable-web-security`,
  linux: `google-chrome --disable-web-security --user-data-dir="${path.join(os.tmpdir(), 'chrome_dev')}" --disable-site-isolation-trials`
};

if (commands[platform]) {
  console.log(`🚀 Starting Chrome with CORS disabled for ${platform}...`);
  exec(commands[platform], (error, stdout, stderr) => {
    if (error) {
      console.error(`❌ Error: ${error.message}`);
      return;
    }
    if (stderr) {
      console.error(`⚠️ Warning: ${stderr}`);
    }
    console.log(`✅ Chrome started with CORS disabled`);
    console.log(`📌 Temp profile: ${path.join(os.tmpdir(), 'chrome_dev')}`);
  });
} else {
  console.log(`❌ Unsupported platform: ${platform}`);
  console.log('Manual steps for Chrome:');
  console.log('1. Open chrome://flags/#block-insecure-private-network-requests');
  console.log('2. Set to "Disabled"');
  console.log('3. Restart Chrome');
}