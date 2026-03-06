# Wine Blog — Claude Code Build Plan

## Project Overview

A personal wine blog with an elegant, minimal aesthetic. Topics: wine reviews, travel & wine regions, personal stories, and education/guides. Wife can manage content independently via a CMS UI. Comments section to be added in a future phase.

---

## Tech Stack

| Layer | Choice | Reason |
|---|---|---|
| Frontend framework | **Nuxt 3** | Vue-based (familiar), great for content sites |
| Content layer | **Nuxt Content v2** | Query markdown files like a DB, no backend needed |
| CMS (for wife) | **Decap CMS** | Free, Git-based, web UI for writing posts |
| Hosting | **Netlify** | Free tier, auto-deploy from Git, native Decap support |
| DNS | **AWS Route 53** | Already owned — just point to Netlify |
| Comments (later) | **Giscus** | GitHub Discussions-based, free, easy to embed |

---

## Phase 1 — Project Scaffold

```
Initialize a Nuxt 3 project called "wine-blog" with the following:
- @nuxt/content v2 module
- TypeScript support
- Basic folder structure:
  content/
    posts/         ← blog posts as .md files
    authors/       ← author bio as .md
  pages/
    index.vue      ← homepage with recent posts
    blog/
      index.vue    ← all posts, filterable by category
      [slug].vue   ← single post page
    about.vue      ← about page
  components/
    PostCard.vue
    CategoryFilter.vue
    NavBar.vue
    Footer.vue
  public/
    images/
```

---

## Phase 2 — Content Schema

Each blog post markdown file should have this frontmatter:

```yaml
---
title: "Discovering Burgundy"
date: 2024-03-15
category: travel          # wine-review | travel | personal | education
excerpt: "A short summary shown on the card"
coverImage: /images/burgundy.jpg
author: "Your Name"
draft: false
---
```

Create 3 sample posts covering one of each category: wine-review, travel, personal.

---

## Phase 3 — Pages & Components

### Homepage (`pages/index.vue`)
- Hero section with blog name, tagline, subtle wine-themed background
- Grid of 3 most recent posts using `PostCard.vue`
- "View all posts" link

### Blog index (`pages/blog/index.vue`)
- Category filter tabs: All | Wine Reviews | Travel | Personal | Education
- Responsive grid of `PostCard.vue` components
- Filter works client-side via Nuxt Content query

### Post page (`pages/blog/[slug].vue`)
- Full post rendering with `<ContentRenderer>`
- Cover image, title, date, category badge
- Author name at bottom
- Previous / Next post navigation

### About page (`pages/about.vue`)
- Photo + bio text (hardcoded or from content/)
- Keep it simple and personal

### PostCard component
- Cover image thumbnail
- Category badge
- Title, excerpt, date
- Hover effect (subtle scale or shadow)

---

## Phase 4 — Styling

Use Nuxt's built-in CSS or a minimal CSS framework. Target aesthetic: Elizabeth Gabay's blog — clean whitespace, serif headings, muted earth/wine tones.

Design tokens to set globally:
```css
--color-bg: #faf8f5;
--color-text: #2c2c2c;
--color-accent: #722f37;   /* wine red */
--color-muted: #9e8e82;
--font-heading: 'Cormorant Garamond', serif;  /* import from Google Fonts */
--font-body: 'Lato', sans-serif;
```

Apply these in `assets/css/main.css` and register in `nuxt.config.ts`.

---

## Phase 5 — Decap CMS Setup

1. Create `public/admin/index.html` — standard Decap CMS entry point
2. Create `public/admin/config.yml`:

```yaml
backend:
  name: git-gateway
  branch: main

media_folder: public/images
public_folder: /images

collections:
  - name: posts
    label: Blog Posts
    folder: content/posts
    create: true
    slug: "{{slug}}"
    fields:
      - { label: Title, name: title, widget: string }
      - { label: Date, name: date, widget: datetime }
      - { label: Category, name: category, widget: select, options: [wine-review, travel, personal, education] }
      - { label: Excerpt, name: excerpt, widget: text }
      - { label: Cover Image, name: coverImage, widget: image }
      - { label: Draft, name: draft, widget: boolean, default: false }
      - { label: Body, name: body, widget: markdown }
```

3. Enable **Netlify Identity** and **Git Gateway** in Netlify dashboard after deploy
4. Invite wife as a user via Netlify Identity

---

## Phase 6 — Netlify Deploy

1. Push project to a GitHub repository
2. Connect repo to Netlify (new site from Git)
3. Build settings:
   - Build command: `npm run generate`
   - Publish directory: `.output/public`
4. Enable Netlify Identity (for CMS auth)
5. Enable Git Gateway

---

## Phase 7 — Custom Domain (AWS Route 53)

In Netlify:
- Site settings → Domain management → Add custom domain

In AWS Route 53:
- Add a CNAME record pointing `www.yourdomain.com` → `[your-site].netlify.app`
- Or update nameservers to Netlify's NS records for full DNS delegation

Netlify auto-provisions SSL via Let's Encrypt.

---

## Future Phase — Comments

When ready, add Giscus:
1. Enable GitHub Discussions on the blog's GitHub repo
2. Visit https://giscus.app to generate embed config
3. Create `components/Comments.vue` with the Giscus script
4. Add `<Comments />` at the bottom of `pages/blog/[slug].vue`

No backend, no database, free forever.

---

## Folder Structure (Final)

```
wine-blog/
├── assets/
│   └── css/main.css
├── components/
│   ├── NavBar.vue
│   ├── Footer.vue
│   ├── PostCard.vue
│   └── CategoryFilter.vue
├── content/
│   └── posts/
│       ├── sample-wine-review.md
│       ├── sample-travel.md
│       └── sample-personal.md
├── pages/
│   ├── index.vue
│   ├── about.vue
│   └── blog/
│       ├── index.vue
│       └── [slug].vue
├── public/
│   ├── images/
│   └── admin/
│       ├── index.html
│       └── config.yml
├── nuxt.config.ts
└── package.json
```
