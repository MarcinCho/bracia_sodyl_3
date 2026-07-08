<script setup>
import { categories, mediaUrl } from '../data/realizacje'
</script>

<template>
  <section id="oferta">
    <div class="container">
      <div class="section-head">
        <p class="eyebrow">Oferta</p>
        <h2>Cztery obszary pracy, jeden poziom rzemiosła</h2>
        <p>Każdy projekt wykonujemy indywidualnie — od koncepcji, przez materiał, po montaż.</p>
      </div>
      <div class="cat-grid">
        <router-link
          v-for="cat in categories"
          :key="cat.slug"
          :to="`/realizacje/${cat.slug}`"
          class="cat-card cat-card-link"
        >
          <div class="project-cover"><img :src="mediaUrl(cat.cover)" :alt="cat.title" loading="lazy"></div>
          <div class="cat-card-body">
            <p class="eyebrow">{{ cat.label }}</p>
            <h3>{{ cat.title }}</h3>
            <p>{{ cat.shortDesc }}</p>
            <span class="link-cta">Zobacz galerię →</span>
          </div>
        </router-link>
      </div>
    </div>
  </section>
</template>
