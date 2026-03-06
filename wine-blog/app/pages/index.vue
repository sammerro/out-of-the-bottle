<template>
  <div>
    <!-- Hero -->
    <section class="hero">
      <div class="hero__inner">
        <p class="hero__eyebrow">A personal wine journal</p>
        <h1 class="hero__title">Out of the Bottle</h1>
        <p class="hero__tagline">Wine reviews, travel stories, and the pleasures of drinking well.</p>
      </div>
    </section>

    <!-- Recent posts -->
    <section class="recent">
      <div class="container">
        <h2 class="section-title">Recent Posts</h2>
        <div class="grid">
          <PostCard v-for="post in recentPosts" :key="post.stem" :post="post" />
        </div>
        <div class="view-all">
          <NuxtLink to="/blog" class="btn">View all posts</NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const { data: recentPosts } = await useAsyncData('recent-posts', () =>
  queryCollection('posts')
    .where('draft', '=', false)
    .order('date', 'DESC')
    .limit(3)
    .all()
)
</script>

<style scoped>
.hero {
  background: var(--color-bg);
  border-bottom: 1px solid #e8e1d9;
  padding: 5rem 1.5rem 4.5rem;
  text-align: center;
  position: relative;
  overflow: hidden;
}

.hero::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse at 50% 100%, rgba(114, 47, 55, 0.06) 0%, transparent 70%);
  pointer-events: none;
}

.hero__inner {
  position: relative;
  max-width: 640px;
  margin: 0 auto;
}

.hero__eyebrow {
  font-family: var(--font-body);
  font-size: 0.8rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--color-accent);
  margin: 0 0 1rem;
}

.hero__title {
  font-family: var(--font-heading);
  font-size: clamp(2.8rem, 6vw, 4.5rem);
  font-weight: 600;
  line-height: 1.1;
  color: var(--color-text);
  margin: 0 0 1rem;
}

.hero__tagline {
  font-family: var(--font-body);
  font-size: 1.1rem;
  color: #5a5148;
  line-height: 1.6;
  margin: 0;
}

.recent {
  padding: 4rem 0;
}

.container {
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

.section-title {
  font-family: var(--font-heading);
  font-size: 1.8rem;
  font-weight: 500;
  color: var(--color-text);
  margin: 0 0 2rem;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.75rem;
}

.view-all {
  margin-top: 2.5rem;
  text-align: center;
}

.btn {
  display: inline-block;
  font-family: var(--font-body);
  font-size: 0.85rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  padding: 0.75rem 2rem;
  border: 1.5px solid var(--color-accent);
  color: var(--color-accent);
  text-decoration: none;
  border-radius: 3px;
  transition: all 0.2s;
}

.btn:hover {
  background: var(--color-accent);
  color: #fff;
}
</style>
