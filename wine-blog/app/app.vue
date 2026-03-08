<template>
  <div>
    <NuxtRouteAnnouncer />
    <NavBar />
    <main>
      <NuxtPage />
    </main>
    <Footer />
  </div>
</template>

<script setup>
useHead({
  script: [
    { src: 'https://identity.netlify.com/v1/netlify-identity-widget.js' }
  ]
})

onMounted(() => {
  if (window.netlifyIdentity) {
    window.netlifyIdentity.on('init', user => {
      if (!user) {
        window.netlifyIdentity.on('login', () => {
          document.location.href = '/admin/'
        })
      }
    })
  }
})
</script>
