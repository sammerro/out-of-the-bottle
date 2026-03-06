<template>
  <div class="container">
    <h1 class="page-title">Blog</h1>
    <CategoryFilter v-model="activeCategory" />
    <div v-if="filteredPosts?.length" class="grid">
      <PostCard v-for="post in filteredPosts" :key="post.stem" :post="post" />
    </div>
    <p v-else class="empty">No posts in this category yet.</p>
  </div>
</template>

<script setup lang="ts">
const activeCategory = ref('all')

const { data: allPosts } = await useAsyncData('all-posts', () =>
  queryCollection('posts')
    .where('draft', '=', false)
    .order('date', 'DESC')
    .all()
)

const filteredPosts = computed(() => {
  if (activeCategory.value === 'all') return allPosts.value
  return allPosts.value?.filter((p) => p.category === activeCategory.value)
})
</script>

<style scoped>
.container {
  max-width: 1100px;
  margin: 0 auto;
  padding: 3rem 1.5rem;
}

.page-title {
  font-family: var(--font-heading);
  font-size: 2.5rem;
  font-weight: 500;
  color: var(--color-text);
  margin: 0 0 2rem;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.75rem;
}

.empty {
  font-family: var(--font-body);
  color: var(--color-muted);
  font-style: italic;
  margin-top: 2rem;
}
</style>
