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

/** Extract a short display title from a portrait's theme field. */
export function shortTheme(theme: string): string {
  const emDashIdx = theme.indexOf(' — ');
  if (emDashIdx > 0 && emDashIdx < 80) return theme.slice(0, emDashIdx);
  if (theme.length > 60) return theme.slice(0, 57) + '...';
  return theme;
}
