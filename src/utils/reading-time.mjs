/**
 * Remark plugin to inject reading time into frontmatter.
 * Uses 230 WPM — appropriate for thoughtful long-form prose.
 */
export function remarkReadingTime() {
  return function (tree, { data }) {
    // Extract text from the AST
    const text = extractText(tree);
    const words = text.split(/\s+/).filter(w => w.length > 0).length;
    const minutes = Math.max(1, Math.round(words / 230));
    
    data.astro.frontmatter.readingTime = minutes;
    data.astro.frontmatter.wordCount = words;
  };
}

function extractText(node) {
  if (node.type === 'text' || node.type === 'inlineCode') {
    return node.value || '';
  }
  if (node.children) {
    return node.children.map(extractText).join(' ');
  }
  return '';
}
