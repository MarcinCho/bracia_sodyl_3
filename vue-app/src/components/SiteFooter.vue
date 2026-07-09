<script setup>
import { categories } from '../data/realizacje'

const year = new Date().getFullYear()
</script>

<template>
  <footer class="site-footer">
    <div class="container footer-grid">
      <div>
        <h4>Pracownia Stolarska Bracia Sordyl</h4>
        <p style="max-width:280px;font-size:.88rem;">Rodzinna pracownia stolarska w Andrychowie, tworząca indywidualne schody, meble i wnętrza z drewna.</p>
        <div class="social-row">
          <a href="#" aria-label="Facebook">f</a>
          <a href="#" aria-label="Instagram">in</a>
        </div>
      </div>
      <div>
        <h4>Oferta</h4>
        <router-link v-for="cat in categories" :key="cat.slug" :to="`/realizacje/${cat.slug}`">{{ cat.title }}</router-link>
      </div>
      <div>
        <h4>Firma</h4>
        <a href="#historia">Historia</a>
        <a href="#warsztat">Pracownia w akcji</a>
        <router-link to="/realizacje">Realizacje</router-link>
        <a href="#kontakt">Kontakt</a>
      </div>
      <div>
        <h4>Kontakt</h4>
        <a href="tel:+48604408916">604 408 916</a>
        <a href="mailto:braciasordyl@op.pl">braciasordyl@op.pl</a>
        <a href="#">ul. Krakowska 70, Andrychów</a>
      </div>
    </div>
    <div class="footer-bottom">
      <span>© {{ year }} Pracownia Stolarska Bracia Sordyl.</span>
      <span>Wersja podglądowa v2 — nie indeksować (meta robots: noindex).</span>
    </div>
  </footer>
</template>
