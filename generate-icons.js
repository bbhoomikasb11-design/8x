import fs from 'fs';
import sharp from 'sharp';

const svg = `
<svg width="512" height="512" xmlns="http://www.w3.org/2000/svg">
  <circle cx="256" cy="256" r="256" fill="#13092e" />
  <text 
    x="256" 
    y="360" 
    font-family="Playfair Display, serif" 
    font-style="italic" 
    font-size="340" 
    fill="#ffffff" 
    text-anchor="middle"
  >A</text>
</svg>
`;

fs.writeFileSync('public/icon.svg', svg);

async function generateIcons() {
  await sharp(Buffer.from(svg))
    .resize(192, 192)
    .png()
    .toFile('public/icon-192.png');
    
  await sharp(Buffer.from(svg))
    .resize(512, 512)
    .png()
    .toFile('public/icon-512.png');
    
  console.log('Icons generated successfully.');
}

generateIcons().catch(console.error);
