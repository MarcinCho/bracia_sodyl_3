<script setup>
const usps = [
  { tag: 'Doświadczenie', title: 'Wielopokoleniowe rzemiosło', desc: 'Trzecie pokolenie rzemieślników w rodzinie — wiedza i precyzja przełożone na jakość każdej realizacji.' },
  { tag: 'Projekt indywidualny', title: 'Bez gotowych szablonów', desc: 'Każda realizacja projektowana pod konkretne wnętrze, budynek lub pojazd.' },
  { tag: 'Realizacje nietypowe', title: 'Obiekty wymagające precyzji', desc: 'Obiekty sakralne, hotele i restauracje — projekty o podwyższonych wymaganiach.' },
  { tag: 'Konstrukcja', title: 'Trwałość na lata', desc: 'Stabilność i jakość wykonania pozwalające na wieloletnie, bezpieczne użytkowanie.' }
]
</script>

<template>
  <section id="dlaczego-my" class="bg-dark">
    <div class="container">
      <div class="section-head">
        <p class="eyebrow">Dlaczego Bracia Sordyl</p>
        <h2>Rzemiosło, które wybierają wymagający klienci</h2>
      </div>
      <div class="usp-grid">
        <div class="usp-item" v-for="usp in usps" :key="usp.title">
          <span class="usp-tag">{{ usp.tag }}</span>
          <h3>{{ usp.title }}</h3>
          <p>{{ usp.desc }}</p>
        </div>
      </div>
    </div>
  </section>
</template>
