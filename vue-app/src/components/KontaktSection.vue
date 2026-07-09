<script setup>
import { reactive, ref } from 'vue'

const form = reactive({
  name: '',
  phone: '',
  email: '',
  type: '',
  message: '',
  file: null
})
const submitted = ref(false)

function onFileChange(e) {
  form.file = e.target.files?.[0]?.name ?? null
}

function submitForm() {
  // Formularz demonstracyjny — brak wysyłki. W wersji produkcyjnej
  // podłączyć do skrzynki firmowej / systemu CRM (np. przez Cloudflare Workers + e-mail API).
  submitted.value = true
}
</script>

<template>
  <section id="kontakt" class="bg-dark">
    <div class="container">
      <div class="contact-wrap">
        <div class="contact-info">
          <p class="eyebrow">Kontakt</p>
          <h2>Porozmawiajmy o Twoim projekcie</h2>
          <p>Im więcej szczegółów prześlesz, tym szybciej przygotujemy wstępną wycenę.</p>
          <ul class="contact-list">
            <li><b>Adres</b>ul. Krakowska 70, 34-120 Andrychów</li>
            <li><b>Telefon / fax</b><a href="tel:+48338754690">+48 33 875 46 90</a></li>
            <li><b>Telefon komórkowy</b><a href="tel:+48604408916">+48 604 408 916</a></li>
            <li><b>E-mail</b><a href="mailto:braciasordyl@op.pl">braciasordyl@op.pl</a></li>
          </ul>
        </div>
        <form class="quote-form" @submit.prevent="submitForm">
          <h3 style="margin-bottom:18px;color:#2b2820;">Zapytaj o wycenę</h3>

          <div v-if="submitted" class="form-success">
            Dziękujemy! To formularz demonstracyjny wersji podglądowej — w wersji produkcyjnej zapytanie
            trafiłoby teraz na skrzynkę firmową.
          </div>

          <template v-else>
            <div class="row">
              <div class="field">
                <label for="f-name">Imię i nazwisko *</label>
                <input id="f-name" v-model="form.name" type="text" required>
              </div>
              <div class="field">
                <label for="f-phone">Telefon *</label>
                <input id="f-phone" v-model="form.phone" type="tel" required>
              </div>
            </div>
            <div class="row">
              <div class="field">
                <label for="f-email">E-mail *</label>
                <input id="f-email" v-model="form.email" type="email" required>
              </div>
              <div class="field">
                <label for="f-type">Rodzaj projektu *</label>
                <select id="f-type" v-model="form.type" required>
                  <option value="">Wybierz...</option>
                  <option>Schody</option>
                  <option>Kuchnie</option>
                  <option>Wnętrza</option>
                  <option>Meble na wymiar</option>
                  <option>Inne</option>
                </select>
              </div>
            </div>
            <div class="field">
              <label for="f-msg">Opis projektu *</label>
              <textarea id="f-msg" v-model="form.message" required placeholder="Opisz pomieszczenie, wymiary, styl, termin realizacji..."></textarea>
            </div>
            <div class="field">
              <label for="f-file">Zdjęcie lub plan wnętrza (opcjonalnie)</label>
              <input id="f-file" type="file" @change="onFileChange">
              <p class="file-hint">Możesz dołączyć zdjęcie pomieszczenia, szkic lub inspirację — pomoże nam to szybciej przygotować wycenę.</p>
            </div>
            <button class="btn" type="submit">Wyślij zapytanie</button>
            <p class="form-note">Formularz demonstracyjny — w wersji produkcyjnej zostanie podłączony do skrzynki firmowej / systemu CRM.</p>
          </template>
        </form>
      </div>
    </div>
  </section>
</template>
