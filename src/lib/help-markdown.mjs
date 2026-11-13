// The help's Markdown conventions, as two small plugins for Astro's Markdown processor (Sätteri, Astro's own, so
// no extra package). They run on src/content/help/ only; the privacy page, the Terms and the release notes are
// built exactly as before. The conventions are the ones a writer can keep in their head without looking anything
// up, and .claude/rules/help.md is their guide:
//
//   > [!NOTE] Title          a callout: a card on the page, with its title. A plain `>` quote is one without a title.
//   > [!OFF] Title           the amber callout, only for "the day is off": amber means what it means on Today.
//   `More → Daily targets`   a place in the app, drawn as a path. Backticks mean "in the app" and nothing else.
//   ![Alt](shot:03a-drift "Caption")   a screenshot in the phone, from src/assets/shots, light and dark.
//   1. 2. 3.                 steps, numbered in circles (global CSS: every ordered list in an article is steps).
//   | a | b |                a table, on its own card and scrolling sideways on a phone rather than the page.
//
// A blockquote's marker and an image are rewritten in the Markdown tree, before Astro collects images: a `shot:`
// image is a capture the page draws with Phone.astro, never a file for Astro to fetch. The page (pages/help/
// [section]/[slug].astro) swaps each `<figure data-shot>` for the phone.

const inHelp = (ctx) => Boolean(ctx.fileURL && decodeURIComponent(ctx.fileURL.pathname).includes('/src/content/help/'));
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const where = (ctx) => (ctx.fileURL ? decodeURIComponent(ctx.fileURL.pathname).replace(/^.*\/src\//, 'src/') : 'a help article');

export const helpMdast = (factory) => inHelp(factory) && {
  name: 'help-markdown-blocks',
  blockquote(node, ctx) {
    const [first, ...rest] = node.children;
    const text = first?.type === 'paragraph' ? ctx.textContent(first) : '';
    const marker = /^\[!([A-Za-z]+)\][ \t]*(.*)$/s.exec(text);
    if (!marker) {
      // A plain quote: the neutral callout, no title.
      ctx.replaceNode(node, [{ raw: '<div class="callout">', mdxExpressions: false }, ...node.children, { raw: '</div>', mdxExpressions: false }]);
      return;
    }
    const kind = marker[1].toUpperCase();
    const title = marker[2].trim();
    if (kind !== 'NOTE' && kind !== 'OFF') {
      throw new Error(`${where(ctx)}: "[!${marker[1]}]" isn't a callout. Use [!NOTE], or [!OFF] for the day being off.`);
    }
    // The title is the marker's own line. Body text run on beneath it, with no blank `>` line between, would be
    // swallowed into the title, so it's an error rather than a quietly odd page.
    if (title.includes('\n')) {
      throw new Error(`${where(ctx)}: put a line with just ">" between "[!${kind}] ${title.split('\n')[0]}" and the callout's text.`);
    }
    const open = `<div class="callout${kind === 'OFF' ? ' callout--off' : ''}">${title ? `<span class="callout__title">${esc(title)}</span>` : ''}`;
    ctx.replaceNode(node, [{ raw: open, mdxExpressions: false }, ...rest, { raw: '</div>', mdxExpressions: false }]);
  },
  paragraph(node, ctx) {
    const shots = node.children.filter((c) => c.type === 'image' && String(c.url).startsWith('shot:'));
    if (!shots.length) return;
    if (node.children.length !== 1) {
      throw new Error(`${where(ctx)}: put each screenshot (![…](shot:…)) on a line of its own.`);
    }
    const image = shots[0];
    const name = String(image.url).slice('shot:'.length);
    if (!image.alt) throw new Error(`${where(ctx)}: the screenshot ${name} needs alt text: say what the screen shows.`);
    ctx.replaceNode(node, {
      raw: `<figure class="shot" data-shot="${esc(name)}" data-alt="${esc(image.alt)}"><figcaption>${esc(image.title ?? '')}</figcaption></figure>`,
      mdxExpressions: false,
    });
  },
};

export const helpHast = (factory) => inHelp(factory) && {
  name: 'help-markdown-inline',
  element: [
    {
      // `More → Daily targets`: each step stays whole, and the path may wrap between steps. "->" is accepted
      // for "→" so a writer without the arrow key isn't stuck.
      filter: ['code'],
      visit(node, ctx) {
        if (ctx.parent(node)?.tagName === 'pre') return;
        const steps = ctx.textContent(node).split(/\s*(?:→|->)\s*/).filter(Boolean);
        return {
          type: 'element',
          tagName: 'span',
          properties: { className: ['path'] },
          children: steps.map((step) => ({ type: 'element', tagName: 'span', properties: {}, children: [{ type: 'text', value: step }] })),
        };
      },
    },
    {
      // A table sits on its own card, which scrolls sideways on a narrow phone instead of the page.
      filter: ['table'],
      visit(node, ctx) {
        ctx.wrapNode(node, { type: 'element', tagName: 'div', properties: { className: ['table'] }, children: [] });
      },
    },
  ],
};
