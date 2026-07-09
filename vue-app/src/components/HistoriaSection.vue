<script setup>
import { mediaUrl } from '../data/realizacje'
</script>

<template>
  <section id="historia" class="bg-dark">
    <div class="container">
      <div class="historia">
        <div class="project-cover historia-cover">
          <img :src="mediaUrl('images/stories/historia1.webp')" alt="Pracownia Stolarska Bracia Sordyl — zdjęcie archiwalne" loading="lazy">
        </div>
        <div class="historia-copy">
          <p class="eyebrow">Nasza historia</p>
          <h2>Rzemiosło przekazywane z pokolenia na pokolenie</h2>
          <p>
            Pracownia Stolarska Braci Sordyl wywodzi się z warsztatu Jana Krzaka — mistrza
            kołodziejskiego i dziadka braci Sordyl, który zdobył sobie renomę rzetelnego wykonawcy,
            m.in. wozów strażackich i wystroju regionalnych karczm.
          </p>
          <p>
            Dziś tę tradycję kontynuują wnukowie kołodzieja — Jacek i Wojciech Sordyl — prowadząc
            pracownię przy ulicy Krakowskiej w Andrychowie i realizując projekty zgodnie z
            oczekiwaniami klienta.
          </p>
          <a class="btn-outline" href="#kontakt">Poznaj naszą pracownię</a>
        </div>
      </div>
    </div>
  </section>
</template>
