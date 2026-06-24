const fs = require('fs');
const path = require('path');

let txt = fs.readFileSync('profile-3d-contrib/profile-night-rainbow.svg', 'utf-8');

txt = txt.replace(/<g transform="translate\(1240, [0-9]+\)">[\s\S]*?<\/g>/g, '');
txt = txt.replace(/<g id="custom-gifs">[\s\S]*?<\/g>\n?/g, '');

const titleInjection = `
<g transform="translate(1240, 150)">
  <text style="font-family: sans-serif; filter: drop-shadow(5px 5px 0px rgba(170, 18, 61, 1));" font-size="80" font-weight="600" fill="rgba(207, 69, 108, 1)" text-anchor="end">
    <tspan x="0" dy="0">My Commit's</tspan>
    <tspan x="-30" dy="90">✨🌃 City</tspan>
  </text>
</g>`;

const gifs = [
  { file: 'mew_shiny.gif', x: 110, y: 130, width: 90, height: 100 },
  { file: 'gengar.gif', x: 790, y: 500, width: 120, height: 120 },
  { file: 'glaceon.gif', x: 550, y: 440, width: 150, height: 100 },
  { file: 'sylveon.gif', x: 390, y: 290, width: 75, height: 110, flip: true },
  { file: 'pikachu.gif', x: 270, y: 215, width: 70, height: 90 },
  { file: 'charmander.gif', x: 1100, y: 650, width: 60, height: 100 },
  { file: 'psyduck.gif', x: 900, y: 590, width: 120, height: 90 },
  { file: 'cyndaquil.gif', x: 870, y: 650, width: 70, height: 90, flip: true }
];

let gifsInjection = '<g id="custom-gifs">\n';

gifs.forEach(gif => {
  const filePath = path.join(__dirname, 'assets', gif.file);
  if (fs.existsSync(filePath)) {
    const base64 = fs.readFileSync(filePath, 'base64');
    
    let xPos = gif.x;
    let transform = '';
    
    if (gif.flip) {
      xPos = -(gif.x + gif.width);
      transform = ' transform="scale(-1, 1)"';
    }
    
    gifsInjection += `  <image x="${xPos}" y="${gif.y}" width="${gif.width}" height="${gif.height}" href="data:image/gif;base64,${base64}"${transform} />\n`;
  } else {
    console.warn(`⚠️ GIF não encontrado na pasta assets: ${gif.file}`);
  }
});
gifsInjection += '</g>';

txt = txt.replace('</svg>', gifsInjection + '\n' + titleInjection + '\n</svg>');

fs.writeFileSync('profile-3d-contrib/profile-night-rainbow.svg', txt);
console.log("✅ SVG successfully updated with custom title and embedded GIFs!");
