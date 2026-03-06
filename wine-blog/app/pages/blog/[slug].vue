<template>
  <div>
    <article v-if="post" class="container">
      <!-- Cover image -->
      <div v-if="post.coverImage" class="cover">
        <img :src="post.coverImage" :alt="post.title" class="cover__img" />
      </div>

      <!-- Header -->
      <header class="post-header">
        <span class="category-badge">{{ categoryLabel }}</span>
        <h1 class="post-title">{{ post.title }}</h1>
        <div class="post-meta">
          <time>{{ formattedDate }}</time>
          <span class="separator">·</span>
          <span>{{ post.author }}</span>
        </div>
      </header>

      <!-- Body -->
      <div class="post-body">
        <ContentRenderer :value="post" />
      </div>

      <!-- Prev / Next navigation -->
      <nav class="post-nav">
        <NuxtLink v-if="prevPost" :to="`/blog/${prevPost.stem?.split('/').pop()}`" class="post-nav__link post-nav__link--prev">
          <span class="post-nav__label">← Previous</span>
          <span class="post-nav__title">{{ prevPost.title }}</span>
        </NuxtLink>
        <div v-else />
        <NuxtLink v-if="nextPost" :to="`/blog/${nextPost.stem?.split('/').pop()}`" class="post-nav__link post-nav__link--next">
          <span class="post-nav__label">Next →</span>
          <span class="post-nav__title">{{ nextPost.title }}</span>
        </NuxtLink>
        <div v-else />
      </nav>
    </article>

    <div v-else class="container not-found">
      <p>Post not found.</p>
      <NuxtLink to="/blog">← Back to blog</NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const slug = route.params.slug as string

const { data: post } = await useAsyncData(`post-${slug}`, () =>
  queryCollection('posts').path(`/posts/${slug}`).first()
)

if (!post.value) {
  throw createError({ statusCode: 404, message: 'Post not found' })
}

// All posts for prev/next navigation
const { data: allPosts } = await useAsyncData('all-posts-nav', () =>
  queryCollection('posts')
    .where('draft', '=', false)
    .order('date', 'DESC')
    .all()
)

const currentIndex = computed(() =>
  allPosts.value?.findIndex((p) => p.stem?.split('/').pop() === slug) ?? -1
)
const prevPost = computed(() =>
  currentIndex.value > 0 ? allPosts.value![currentIndex.value - 1] : null
)
const nextPost = computed(() =>
  currentIndex.value < (allPosts.value?.length ?? 0) - 1
    ? allPosts.value![currentIndex.value + 1]
    : null
)

const categoryMap: Record<string, string> = {
  'wine-review': 'Wine Review',
  travel: 'Travel',
  personal: 'Personal',
  education: 'Education',
}

const categoryLabel = computed(() =>
  post.value ? (categoryMap[post.value.category] ?? post.value.category) : ''
)

const formattedDate = computed(() => {
  if (!post.value) return ''
  return new Date(post.value.date).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
})

useSeoMeta({
  title: post.value?.title,
  description: post.value?.excerpt,
})
</script>

<style scoped>
.container {
  max-width: 760px;
  margin: 0 auto;
  padding: 3rem 1.5rem 5rem;
}

.cover {
  margin: -3rem -1.5rem 2.5rem;
  aspect-ratio: 21 / 9;
  overflow: hidden;
  background: #e8e1d9;
}

.cover__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.post-header {
  margin-bottom: 2.5rem;
}

.category-badge {
  display: inline-block;
  font-family: var(--font-body);
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--color-accent);
  margin-bottom: 0.75rem;
}

.post-title {
  font-family: var(--font-heading);
  font-size: clamp(2rem, 5vw, 3rem);
  font-weight: 600;
  line-height: 1.2;
  color: var(--color-text);
  margin: 0 0 1rem;
}

.post-meta {
  font-family: var(--font-body);
  font-size: 0.875rem;
  color: var(--color-muted);
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.separator {
  color: #d4c8be;
}

.post-body :deep(h2) {
  font-family: var(--font-heading);
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-text);
  margin: 2.5rem 0 1rem;
}

.post-body :deep(p) {
  font-family: var(--font-body);
  font-size: 1.05rem;
  line-height: 1.8;
  color: #3a3230;
  margin: 0 0 1.25rem;
}

.post-body :deep(hr) {
  border: none;
  border-top: 1px solid #e8e1d9;
  margin: 2rem 0;
}

.post-body :deep(blockquote) {
  border-left: 3px solid var(--color-accent);
  margin: 1.5rem 0;
  padding: 0.5rem 1.25rem;
  color: var(--color-muted);
  font-style: italic;
}

.post-body :deep(strong) {
  color: var(--color-text);
  font-weight: 600;
}

.post-body :deep(em) {
  font-style: italic;
}

.post-nav {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  margin-top: 4rem;
  padding-top: 2rem;
  border-top: 1px solid #e8e1d9;
}

.post-nav__link {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  text-decoration: none;
  color: inherit;
}

.post-nav__link--next {
  text-align: right;
}

.post-nav__label {
  font-family: var(--font-body);
  font-size: 0.75rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--color-muted);
}

.post-nav__title {
  font-family: var(--font-heading);
  font-size: 1rem;
  color: var(--color-accent);
  transition: opacity 0.2s;
}

.post-nav__link:hover .post-nav__title {
  opacity: 0.7;
}

.not-found {
  text-align: center;
  padding-top: 5rem;
  font-family: var(--font-body);
  color: var(--color-muted);
}

.not-found a {
  color: var(--color-accent);
}
</style>
