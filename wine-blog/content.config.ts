import { defineContentConfig, defineCollection, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    posts: defineCollection({
      type: 'page',
      source: 'posts/**/*.md',
      schema: z.object({
        title: z.string(),
        date: z.string(),
        category: z.enum(['wine-review', 'travel', 'personal', 'education']),
        excerpt: z.string(),
        coverImage: z.string(),
        author: z.string(),
        draft: z.boolean().default(false),
      }),
    }),
  },
})
