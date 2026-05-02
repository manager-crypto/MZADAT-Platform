import sharp from 'sharp';
import { readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';

const svgPath = resolve('public/favicon.svg');
const icoPath = resolve('public/favicon.ico');
const pngPath = resolve('public/favicon-32.png');

const svgBuffer = readFileSync(svgPath);

await sharp(svgBuffer)
  .resize(32, 32)
  .png()
  .toFile(pngPath);

const pngBuffer = readFileSync(pngPath);
writeFileSync(icoPath, pngBuffer);

console.log('✅ favicon.ico generated successfully');
