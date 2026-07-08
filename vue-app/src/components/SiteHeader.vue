<script setup>
import { ref } from 'vue'

const navOpen = ref(false)
function toggleNav() {
  navOpen.value = !navOpen.value
}
function closeNav() {
  navOpen.value = false
}
</script>

<template>
  <header class="site-header">
    <div class="header-top">
      <a class="logo" href="#main" @click="closeNav">
        <span class="logo-mark">BS</span>
        <span class="logo-text"><strong>Bracia Sordyl</strong><span>Pracownia Stolarska od 1932 r.</span></span>
      </a>
      <nav class="main-nav" :class="{ open: navOpen }" aria-label="Nawigacja główna">
        <router-link to="/realizacje" @click="closeNav">Realizacje</router-link>
        <router-link to="/#oferta" @click="closeNav">Oferta</router-link>
        <router-link to="/#dlaczego-my" @click="closeNav">Dlaczego my</router-link>
        <router-link to="/#historia" @click="closeNav">Historia</router-link>
        <router-link to="/#warsztat" @click="closeNav">Warsztat</router-link>
        <router-link to="/#kontakt" @click="closeNav">Kontakt</router-link>
      </nav>
      <div class="header-actions">
        <a class="header-phone" href="tel:+48604408916"><span class="label">Zadzwoń:</span> <strong>604 408 916</strong></a>
        <router-link class="btn" to="/#kontakt">Zapytaj o wycenę</router-link>
        <button class="nav-toggle" aria-label="Otwórz menu" @click="toggleNav">☰</button>
      </div>
    </div>
  </header>
</template>
