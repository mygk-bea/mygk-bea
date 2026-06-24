const fs = require('fs');

let txt = fs.readFileSync('profile-3d-contrib/profile-night-rainbow.svg', 'utf-8');

txt = txt.replace(/<g transform="translate\(1240, [0-9]+\)">[\s\S]*?<\/g>/g, '');
txt = txt.replace(/<style id="custom-font">[\s\S]*?<\/style>\n?/g, '');

const injection = `
<g transform="translate(1240, 150)">
  <text style="font-family: sans-serif; filter: drop-shadow(0px 0px 0px 2px rgba(0, 0, 0, 1));" font-size="100" font-weight="bold" fill="#bf4064" text-anchor="end">
    <tspan x="0" dy="0">Commit's</tspan>
    <tspan x="-30" dy="90">City</tspan>
  </text>
</g>`;

txt = txt.replace('</svg>', injection + '\n</svg>');

fs.writeFileSync('profile-3d-contrib/profile-night-rainbow.svg', txt);
console.log("SVG successfully updated with custom position and color!");
