<template>
  <NuxtLink :to="`/blog/${post.stem?.split('/').pop()}`" class="card">
    <div class="card__image-wrap">
      <img
        v-if="post.coverImage"
        :src="post.coverImage"
        :alt="post.title"
        class="card__image"
      />
      <div v-else class="card__image-placeholder" />
    </div>
    <div class="card__body">
      <span class="card__category">{{ categoryLabel }}</span>
      <h2 class="card__title">{{ post.title }}</h2>
      <p class="card__excerpt">{{ post.excerpt }}</p>
      <time class="card__date">{{ formattedDate }}</time>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
const props = defineProps<{
  post: {
    stem?: string
    title: string
    date: string
    category: string
    excerpt: string
    coverImage?: string
  }
}>()

const categoryMap: Record<string, string> = {
  'wine-review': 'Wine Review',
  travel: 'Travel',
  personal: 'Personal',
  education: 'Education',
}

const categoryLabel = computed(() => categoryMap[props.post.category] ?? props.post.category)

const formattedDate = computed(() => {
  const d = new Date(props.post.date)
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
})
</script>

<style scoped>
.card {
  display: flex;
  flex-direction: column;
  border-radius: 6px;
  overflow: hidden;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.07);
  text-decoration: none;
  color: inherit;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.card:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
}

.card__image-wrap {
  aspect-ratio: 16 / 9;
  overflow: hidden;
  background: #e8e1d9;
}

.card__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.card:hover .card__image {
  transform: scale(1.03);
}

.card__image-placeholder {
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #e8ddd4 0%, #d4c8be 100%);
}

.card__body {
  padding: 1.25rem 1.5rem 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  flex: 1;
}

.card__category {
  font-family: var(--font-body);
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--color-accent);
}

.card__title {
  font-family: var(--font-heading);
  font-size: 1.35rem;
  font-weight: 600;
  line-height: 1.3;
  color: var(--color-text);
  margin: 0;
}

.card__excerpt {
  font-family: var(--font-body);
  font-size: 0.9rem;
  color: #5a5148;
  line-height: 1.6;
  margin: 0;
  flex: 1;
}

.card__date {
  font-family: var(--font-body);
  font-size: 0.8rem;
  color: var(--color-muted);
  margin-top: 0.25rem;
}
</style>
