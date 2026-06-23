const fs = require('fs');
let txt = fs.readFileSync('profile-3d-contrib/profile-night-rainbow.svg', 'utf-8');

// Remove ALL injected title groups (mesmo que tenham várias linhas)
txt = txt.replace(/<g transform="translate\(1240, [0-9]+\)">[\s\S]*?<\/g>/g, '');

const injection = `
<g transform="translate(1240, 100)">
  <text font-family="'Fira Code', 'Consolas', 'Courier New', monospace" font-size="100" font-weight="bold" fill="#ffffff" text-anchor="end" style="filter: drop-shadow(0px 10px 0px rgba(0, 0, 0, 0.9));">
    <tspan x="0" dy="0">Commit's</tspan>
    <tspan x="0" dy="70">City</tspan>
  </text>
</g>`;

// Append just the new one
txt = txt.replace('</svg>', injection + '\n</svg>');

fs.writeFileSync('profile-3d-contrib/profile-night-rainbow.svg', txt);
