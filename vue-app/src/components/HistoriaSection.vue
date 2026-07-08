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
          <h2>Rzemiosło przekazywane od 1932 roku</h2>
          <p>
            Tradycja Pracowni Stolarskiej Braci Sordyl sięga 1932 roku, kiedy do Andrychowa przybył
            Jan Krzak — mistrz kołodziejski, dziadek braci Sordyl. Przez 46 lat rzemieślniczej
            działalności zdobył sobie renomę rzetelnego wykonawcy, m.in. wozów strażackich i
            wystroju regionalnych karczm.
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
