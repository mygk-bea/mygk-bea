const fs = require('fs');
let txt = fs.readFileSync('profile-3d-contrib/profile-night-rainbow.svg', 'utf-8');

// Remove ALL injected title groups
txt = txt.replace(/<g transform="translate\(1240, 60\)">[\s\S]*?<\/g>/g, '');

const injection = `
<g transform="translate(1240, 60)">
  <text font-family="'Ubuntu', 'Helvetica', 'Arial', sans-serif" font-size="64" font-weight="bold" fill="#ffffff" text-anchor="end" style="filter: drop-shadow(0px 0px 15px rgba(255, 255, 255, 0.9));">
    <tspan x="0" dy="0">Commit's</tspan>
    <tspan x="0" dy="70">City</tspan>
  </text>
</g>`;

// Append just the new one
txt = txt.replace('</svg>', injection + '\n</svg>');
fs.writeFileSync('profile-3d-contrib/profile-night-rainbow.svg', txt);
