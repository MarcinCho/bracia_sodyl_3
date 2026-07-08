<script setup>
import { categories, mediaUrl } from '../data/realizacje'
</script>

<template>
  <section class="page-header bg-dark">
    <div class="container">
      <nav class="breadcrumbs" aria-label="Okruszki">
        <router-link to="/">Strona główna</router-link>
        <span>/</span>
        <span>Realizacje</span>
      </nav>
      <p class="eyebrow">Portfolio</p>
      <h1>Realizacje wg głównych obszarów</h1>
      <p class="page-lead">Cztery obszary pracy pracowni. Wybierz jeden, aby od razu zobaczyć galerię zdjęć.</p>
    </div>
  </section>

  <section>
    <div class="container">
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
            <span class="link-cta">{{ cat.images.length }} zdjęć — zobacz galerię →</span>
          </div>
        </router-link>
      </div>
    </div>
  </section>
</template>
