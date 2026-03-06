<template>
  <div class="filter">
    <button
      v-for="cat in categories"
      :key="cat.value"
      class="filter__btn"
      :class="{ 'filter__btn--active': modelValue === cat.value }"
      @click="$emit('update:modelValue', cat.value)"
    >
      {{ cat.label }}
    </button>
  </div>
</template>

<script setup lang="ts">
defineProps<{ modelValue: string }>()
defineEmits<{ (e: 'update:modelValue', val: string): void }>()

const categories = [
  { value: 'all', label: 'All' },
  { value: 'wine-review', label: 'Wine Reviews' },
  { value: 'travel', label: 'Travel' },
  { value: 'personal', label: 'Personal' },
  { value: 'education', label: 'Education' },
]
</script>

<style scoped>
.filter {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 2.5rem;
}

.filter__btn {
  font-family: var(--font-body);
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  padding: 0.45rem 1rem;
  border: 1px solid #d4c8be;
  border-radius: 100px;
  background: transparent;
  color: var(--color-muted);
  cursor: pointer;
  transition: all 0.2s;
}

.filter__btn:hover {
  border-color: var(--color-accent);
  color: var(--color-accent);
}

.filter__btn--active {
  background: var(--color-accent);
  border-color: var(--color-accent);
  color: #fff;
}
</style>
