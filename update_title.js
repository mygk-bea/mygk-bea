const fs = require('fs');
const https = require('https');

const fontUrl = 'https://fonts.gstatic.com/s/firacode/v27/uU9eCBsR6Z2vfE9aq3bL0fxyUs4tcw4W_A9sFVc.ttf';

https.get(fontUrl, (res) => {
  const chunks = [];
  res.on('data', (chunk) => chunks.push(chunk));
  res.on('end', () => {
    const fontBuffer = Buffer.concat(chunks);
    const fontBase64 = fontBuffer.toString('base64');
    
    let txt = fs.readFileSync('profile-3d-contrib/profile-night-rainbow.svg', 'utf-8');

    // Remove ALL injected title groups
    txt = txt.replace(/<g transform="translate\(1240, [0-9]+\)">[\s\S]*?<\/g>/g, '');
    txt = txt.replace(/<style id="custom-font">[\s\S]*?<\/style>\n?/g, '');

    const injection = `
<style id="custom-font">
  @font-face {
    font-family: 'Fira Code Custom';
    font-style: normal;
    font-weight: 500;
    src: url(data:font/truetype;charset=utf-8;base64,${fontBase64}) format('truetype');
  }
</style>
<g transform="translate(1240, 150)">
  <text style="font-family: 'Fira Code Custom', Consolas, 'Courier New', monospace; filter: drop-shadow(0px 10px 0px rgba(191, 64, 100, 1));" font-size="100" font-weight="bold" fill="#ffffff" text-anchor="end">
    <tspan x="0" dy="0">Commit's</tspan>
    <tspan x="-30" dy="90">City</tspan>
  </text>
</g>`;

    // Append just the new one
    txt = txt.replace('</svg>', injection + '\n</svg>');

    fs.writeFileSync('profile-3d-contrib/profile-night-rainbow.svg', txt);
    console.log("SVG successfully updated with embedded Fira Code font!");
  });
}).on('error', (e) => {
  console.error(e);
});
