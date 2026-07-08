<script setup>
import { categories, mediaUrl } from '../data/realizacje'
</script>

<template>
  <section id="realizacje" class="bg-dark">
    <div class="container">
      <div class="section-head">
        <p class="eyebrow">Portfolio</p>
        <h2>Realizacje wg głównych obszarów</h2>
        <p>Wybierz obszar, aby od razu zobaczyć pełną galerię zrealizowanych projektów.</p>
      </div>
      <div class="real-grid">
        <router-link
          v-for="cat in categories"
          :key="cat.slug"
          :to="`/realizacje/${cat.slug}`"
          class="real-card project-card cat-card-link"
        >
          <div class="project-cover"><img :src="mediaUrl(cat.cover)" :alt="cat.title" loading="lazy"></div>
          <div class="project-card-body">
            <h3>{{ cat.title }}</h3>
            <p class="project-meta">{{ cat.images.length }} zdjęć</p>
            <span class="link-cta">Zobacz galerię →</span>
          </div>
        </router-link>
      </div>
      <div class="section-cta" style="display:flex; gap:16px; justify-content:center; flex-wrap:wrap;">
        <router-link class="btn-outline" to="/realizacje">Zobacz pełne portfolio</router-link>
        <a class="btn" href="#kontakt">Chcę podobną realizację — zapytaj o wycenę</a>
      </div>
    </div>
  </section>
</template>
