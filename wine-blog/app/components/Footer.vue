<template>
  <footer class="footer">
    <div class="footer__inner">
      <p class="footer__brand">Out of the Bottle</p>
      <p class="footer__copy">&copy; {{ year }} — A personal wine journal</p>
    </div>
  </footer>
</template>

<script setup lang="ts">
const year = new Date().getFullYear()
</script>

<style scoped>
.footer {
  border-top: 1px solid #e8e1d9;
  margin-top: 5rem;
  padding: 2.5rem 1.5rem;
  text-align: center;
}

.footer__brand {
  font-family: var(--font-heading);
  font-size: 1.1rem;
  color: var(--color-accent);
  margin: 0 0 0.25rem;
}

.footer__copy {
  font-family: var(--font-body);
  font-size: 0.85rem;
  color: var(--color-muted);
  margin: 0;
}
</style>
