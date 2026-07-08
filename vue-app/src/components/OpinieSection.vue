<template>
  <section id="opinie">
    <div class="container">
      <div class="section-head">
        <p class="eyebrow">Opinie</p>
        <h2>Co mówią nasi klienci</h2>
        <p>Miejsce na realne opinie klientów — treść do uzupełnienia po zebraniu referencji / ocen Google.</p>
      </div>
      <div class="testi-grid">
        <div class="testi-card" v-for="n in 3" :key="n">
          <span class="placeholder-tag">Do uzupełnienia</span>
          <p>[Miejsce na opinię klienta — treść i podpis do pozyskania, np. z wizytówki Google lub bezpośrednio od zadowolonego klienta.]</p>
        </div>
      </div>
    </div>
  </section>
</template>
