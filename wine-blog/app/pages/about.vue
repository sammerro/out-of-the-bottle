<template>
  <div class="container">
    <div class="about">
      <div class="about__photo-wrap">
        <img src="/images/author.jpg" alt="Kasia Nowak" class="about__photo" onerror="this.style.display='none'" />
      </div>
      <div class="about__content">
        <p class="about__eyebrow">About</p>
        <h1 class="about__name">Kasia Nowak</h1>
        <div class="about__bio">
          <p>
            I started drinking wine seriously in 2011 — <em>seriously</em> meaning I started
            taking notes, reading books, and attending courses rather than just enjoying it at
            dinner. I never stopped.
          </p>
          <p>
            This blog is where I write about the bottles that move me: reviews, travel diaries
            from wine regions I've visited, and the occasional personal story about how a single
            glass changed an evening (or a year).
          </p>
          <p>
            I'm not a sommelier or a professional critic. I'm a curious person who has drunk
            a lot of wine and wants to write about it honestly. I believe the best wine is the
            one you're drinking with people you love, but I also believe some wines are
            genuinely, measurably better than others, and I find it interesting to figure out why.
          </p>
          <p>
            Based in Warsaw. Currently obsessed with Burgundy, natural wines from the Jura,
            and finding good Portuguese reds at reasonable prices.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
useSeoMeta({ title: 'About — Out of the Bottle' })
</script>

<style scoped>
.container {
  max-width: 900px;
  margin: 0 auto;
  padding: 4rem 1.5rem;
}

.about {
  display: grid;
  grid-template-columns: 240px 1fr;
  gap: 4rem;
  align-items: start;
}

.about__photo-wrap {
  border-radius: 6px;
  overflow: hidden;
  aspect-ratio: 3 / 4;
  background: #e8ddd4;
}

.about__photo {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.about__eyebrow {
  font-family: var(--font-body);
  font-size: 0.75rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--color-accent);
  margin: 0 0 0.5rem;
}

.about__name {
  font-family: var(--font-heading);
  font-size: 2.5rem;
  font-weight: 600;
  color: var(--color-text);
  margin: 0 0 2rem;
}

.about__bio p {
  font-family: var(--font-body);
  font-size: 1.05rem;
  line-height: 1.8;
  color: #3a3230;
  margin: 0 0 1.25rem;
}

.about__bio em {
  font-style: italic;
}

@media (max-width: 640px) {
  .about {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .about__photo-wrap {
    max-width: 200px;
  }
}
</style>
