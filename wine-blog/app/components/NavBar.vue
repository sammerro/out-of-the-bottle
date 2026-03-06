<template>
  <nav class="navbar">
    <div class="navbar__inner">
      <NuxtLink to="/" class="navbar__brand">Out of the Bottle</NuxtLink>
      <ul class="navbar__links">
        <li><NuxtLink to="/">Home</NuxtLink></li>
        <li><NuxtLink to="/blog">Blog</NuxtLink></li>
        <li><NuxtLink to="/about">About</NuxtLink></li>
      </ul>
    </div>
  </nav>
</template>

<style scoped>
.navbar {
  border-bottom: 1px solid #e8e1d9;
  background: var(--color-bg);
  position: sticky;
  top: 0;
  z-index: 100;
}

.navbar__inner {
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 1.5rem;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.navbar__brand {
  font-family: var(--font-heading);
  font-size: 1.4rem;
  font-weight: 600;
  color: var(--color-accent);
  text-decoration: none;
  letter-spacing: 0.02em;
}

.navbar__links {
  list-style: none;
  display: flex;
  gap: 2rem;
  margin: 0;
  padding: 0;
}

.navbar__links a {
  font-family: var(--font-body);
  font-size: 0.9rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--color-text);
  text-decoration: none;
  transition: color 0.2s;
}

.navbar__links a:hover,
.navbar__links a.router-link-active {
  color: var(--color-accent);
}
</style>
