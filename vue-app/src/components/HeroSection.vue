<script setup>
const specItems = [
  { value: '1932', label: 'Rok założenia' },
  { value: 'III', label: 'Pokolenie rzemiosła' },
  { value: '4', label: 'Głównych obszarów pracy' },
  { value: '100%', label: 'Na indywidualne zamówienie' }
]
</script>

<template>
  <section class="hero">
    <div class="hero-grid">
      <div class="hero-copy">
        <p class="eyebrow">Pracownia Stolarska Bracia Sordyl · Andrychów</p>
        <h1>Schody, meble i wnętrza z drewna szyte na miarę — od 1932 roku</h1>
        <p class="lead">
          Projektujemy i wykonujemy indywidualne, prestiżowe realizacje stolarskie: od schodów i mebli
          kuchennych, przez wystrój wnętrz, po meble na wymiar. Trzecie pokolenie rzemiosła
          w jednej rodzinie.
        </p>
        <div class="hero-ctas">
          <a class="btn" href="#kontakt">Zapytaj o bezpłatną wycenę</a>
          <a class="btn-outline" href="#realizacje">Zobacz realizacje</a>
        </div>
      </div>

      <div class="hero-drawing plate" aria-hidden="true">
        <svg viewBox="0 0 460 340" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <marker id="dimArrow" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto">
              <path d="M0,0 L8,4 L0,8 Z" fill="#93a3a1" />
            </marker>
          </defs>

          <!-- podłoga / spocznik -->
          <line x1="20" y1="298" x2="430" y2="298" stroke="#3a5964" stroke-width="1.5" />
          <line x1="390" y1="298" x2="390" y2="74" stroke="#3a5964" stroke-width="1" stroke-dasharray="2 4" />

          <!-- profil schodów skrzynkowych -->
          <path
            class="blueprint-line"
            d="M54,298 L96,298 L96,270 L138,270 L138,242 L180,242 L180,214 L222,214 L222,186
               L264,186 L264,158 L306,158 L306,130 L348,130 L348,102 L390,102 L390,74 L430,74"
            fill="none" stroke="#f7f2e4" stroke-width="2.25" stroke-linejoin="round"
          />

          <!-- poręcz -->
          <line class="blueprint-line" x1="54" y1="266" x2="390" y2="42" stroke="#a9863f" stroke-width="2" />
          <line x1="88" y1="256" x2="88" y2="279" stroke="#a9863f" stroke-width="1.5" />
          <line x1="150" y1="238" x2="150" y2="261" stroke="#a9863f" stroke-width="1.5" />
          <line x1="212" y1="219" x2="212" y2="242" stroke="#a9863f" stroke-width="1.5" />
          <line x1="274" y1="200" x2="274" y2="223" stroke="#a9863f" stroke-width="1.5" />
          <line x1="336" y1="152" x2="336" y2="175" stroke="#a9863f" stroke-width="1.5" />
          <line x1="380" y1="110" x2="380" y2="133" stroke="#a9863f" stroke-width="1.5" />

          <!-- wymiar wysokości H -->
          <line x1="412" y1="296" x2="412" y2="76" stroke="#93a3a1" stroke-width="1"
                marker-start="url(#dimArrow)" marker-end="url(#dimArrow)" />
          <text x="420" y="190" class="diagram-label" transform="rotate(90 420 190)">WYSOKOŚĆ CAŁK. — H</text>

          <!-- wymiar długości L -->
          <line x1="54" y1="316" x2="390" y2="316" stroke="#93a3a1" stroke-width="1"
                marker-start="url(#dimArrow)" marker-end="url(#dimArrow)" />
          <text x="140" y="332" class="diagram-label">DŁUGOŚĆ BIEGU — L</text>

          <!-- adnotacja materiału -->
          <line x1="180" y1="242" x2="180" y2="200" stroke="#93a3a1" stroke-width="1" />
          <line x1="180" y1="200" x2="234" y2="200" stroke="#93a3a1" stroke-width="1" />
          <circle cx="180" cy="242" r="2.5" fill="#93a3a1" />
        </svg>
        <p class="hero-drawing-caption">
          <span>RYS. POGLĄDOWY — SCHODY SKRZYNKOWE</span>
          <span>SKALA NIEZDEFINIOWANA</span>
        </p>
      </div>
    </div>

    <div class="container">
      <div class="spec-block">
        <div class="spec-item" v-for="item in specItems" :key="item.label">
          <div class="spec-value">{{ item.value }}</div>
          <div class="spec-label">{{ item.label }}</div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.diagram-label {
  font-family: var(--font-mono);
  font-size: 9.5px;
  letter-spacing: .04em;
  fill: #93a3a1;
  text-transform: uppercase;
}
</style>
