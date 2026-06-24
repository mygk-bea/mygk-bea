const fs = require('fs');

let txt = fs.readFileSync('profile-3d-contrib/profile-night-rainbow.svg', 'utf-8');

txt = txt.replace(/<g transform="translate\(1240, [0-9]+\)">[\s\S]*?<\/g>/g, '');
txt = txt.replace(/<style id="custom-font">[\s\S]*?<\/style>\n?/g, '');

const injection = `
<g transform="translate(1240, 150)">
  <text style="font-family: sans-serif; filter: drop-shadow(5px 5px 0px rgba(170, 18, 61, 1));" font-size="80" font-weight="600" fill="rgba(207, 69, 108, 1)" text-anchor="end">
    <tspan x="0" dy="0">My Commit's</tspan>
    <tspan x="-30" dy="90">✨🌃 City</tspan>
  </text>
</g>`;

txt = txt.replace('</svg>', injection + '\n</svg>');

fs.writeFileSync('profile-3d-contrib/profile-night-rainbow.svg', txt);
console.log("SVG successfully updated with custom position and color!");
