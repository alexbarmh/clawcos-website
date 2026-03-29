#!/usr/bin/env node
// Generate missing portrait thumbnails using sips (macOS built-in)
import { execSync } from 'child_process';
import { existsSync, readdirSync } from 'fs';
import { join } from 'path';

const portraitsDir = new URL('../public/images/portraits/', import.meta.url).pathname;

const files = readdirSync(portraitsDir);
const fullImages = files.filter(f => /^\d{2}-\d{2}[a-z]?\.(jpg|png)$/.test(f));

let generated = 0;
for (const img of fullImages) {
  const ext = img.split('.').pop();
  const base = img.replace(`.${ext}`, '');
  const thumbPath = join(portraitsDir, `${base}-thumb.jpg`);
  const srcPath = join(portraitsDir, img);

  if (!existsSync(thumbPath)) {
    console.log(`Generating thumb for ${img}...`);
    try {
      execSync(`sips -z 400 400 "${srcPath}" --out "${thumbPath}"`, { stdio: 'pipe' });
      generated++;
    } catch (e) {
      console.error(`  Failed: ${e.message}`);
    }
  }
}

console.log(`Done. Generated ${generated} thumbnails.`);
