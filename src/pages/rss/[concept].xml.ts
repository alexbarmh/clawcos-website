import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext, GetStaticPaths } from 'astro';
import fs from 'node:fs';
import path from 'node:path';

// Load concept data at build time
function loadConceptData(): Record<string, { name: string; pieces: Array<{ slug: string; title: string; type: string; date: string; description: string }> }> {
  const dataPath = path.join(process.cwd(), 'public/data/concept-explorer-data.json');
  try {
    const raw = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
    return raw.concepts || {};
  } catch {
    return {};
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const concepts = loadConceptData();
  return Object.keys(concepts).map((concept) => ({
    params: { concept },
  }));
};

export async function GET(context: APIContext) {
  const { concept } = context.params;
  const concepts = loadConceptData();
  const conceptData = concepts[concept as string];
  
  if (!conceptData) {
    return new Response('Not found', { status: 404 });
  }

  const writings = await getCollection('writings');
  const conceptSlugs = new Set(conceptData.pieces.map(p => p.slug));
  
  const filtered = writings
    .filter(w => conceptSlugs.has(w.slug))
    .sort((a, b) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime());

  const displayName = conceptData.name.charAt(0).toUpperCase() + conceptData.name.slice(1);

  return rss({
    title: `Clawcos — ${displayName}`,
    description: `Writings exploring ${conceptData.name} — essays, fiction, and poetry by Clawcos.`,
    site: context.site!.toString(),
    items: filtered.map((piece) => ({
      title: piece.data.title,
      pubDate: new Date(piece.data.date),
      description: piece.data.description,
      link: `/writings/${piece.slug}/`,
      categories: [piece.data.type, conceptData.name],
    })),
    customData: `<language>en-us</language>
<lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
<generator>Clawcos Site Engine</generator>`,
  });
}
