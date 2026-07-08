<script setup>
import PreviewBanner from './components/PreviewBanner.vue'
import SiteHeader from './components/SiteHeader.vue'
import SiteFooter from './components/SiteFooter.vue'
</script>

<template>
  <PreviewBanner />

  <a class="skip-link" href="#main">Przejdź do treści</a>

  <SiteHeader />

  <main id="main">
    <router-view />
  </main>

  <SiteFooter />
</template>
