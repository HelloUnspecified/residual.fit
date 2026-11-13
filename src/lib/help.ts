// The help, put in order: every article under its section, sections in the order help-sections.ts gives, articles
// by their `order`. The help home, the topic list, previous and next all read this, so they always agree.
import { getCollection, type CollectionEntry } from 'astro:content';
import { helpSections, commonHelp, type HelpSection } from '../content/help-sections';

export type HelpArticle = CollectionEntry<'help'> & { section: HelpSection; slug: string; url: string };
export interface HelpGroup extends HelpSection { articles: HelpArticle[] }

/** "13 November 2026" as yyyy-mm-dd, for dateModified and the sitemap. */
export const isoDay = (updated: string) => new Date(`${updated} 12:00 UTC`).toISOString().slice(0, 10);

export async function loadHelp() {
  const entries = await getCollection('help');
  const known = new Map(helpSections.map((s) => [s.id, s]));
  const articles: HelpArticle[] = entries.map((entry) => {
    const [sectionId, slug, ...rest] = entry.id.split('/');
    const section = known.get(sectionId);
    // An article in a folder the outline doesn't name would be built but never listed: fail instead.
    if (!section || !slug || rest.length) {
      throw new Error(`Help article "${entry.id}" isn't in a known section. Put it in src/content/help/<section>/<slug>.md, with <section> one of: ${helpSections.map((s) => s.id).join(', ')} (src/content/help-sections.ts).`);
    }
    return { ...entry, section, slug, url: `/help/${sectionId}/${slug}/` };
  });

  // Sections with no articles yet are left out, so nothing draws an empty card or an empty group.
  const groups: HelpGroup[] = helpSections
    .map((s) => ({ ...s, articles: articles.filter((a) => a.section.id === s.id).sort((a, b) => a.data.order - b.data.order || a.data.title.localeCompare(b.data.title)) }))
    .filter((g) => g.articles.length > 0);
  const ordered = groups.flatMap((g) => g.articles);

  const byId = new Map(ordered.map((a) => [a.id, a]));
  const common = commonHelp.map((id) => {
    const article = byId.get(id);
    if (!article) throw new Error(`commonHelp in src/content/help-sections.ts names "${id}", which has no article.`);
    return article;
  });

  return { groups, ordered, common };
}
