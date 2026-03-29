import { readdirSync } from 'node:fs';
import { join } from 'node:path';

// Build-time map of portrait slug -> actual file extension
const extMap: Record<string, string> = {};
try {
  const dir = join(process.cwd(), 'public/images/portraits');
  for (const f of readdirSync(dir)) {
    const m = f.match(/^(\d{2}-\d{2}[a-z]?)\.(jpg|png)$/);
    if (m) extMap[m[1]] = m[2];
  }
} catch {}

/** Returns the file extension for a portrait slug (e.g. "jpg" or "png"). */
export function portraitExt(slug: string): string {
  return extMap[slug] ?? 'jpg';
}
