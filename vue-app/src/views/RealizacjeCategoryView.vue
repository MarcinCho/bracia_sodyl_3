<script setup>
import { computed, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { categories, getCategory, mediaUrl } from '../data/realizacje'
import Lightbox from '../components/Lightbox.vue'

const props = defineProps({
  kategoria: { type: String, required: true }
})
const router = useRouter()

const category = computed(() => getCategory(props.kategoria))

// Nieznana kategoria w adresie -> wróć do przeglądu realizacji.
watch(category, (val) => {
  if (!val) router.replace('/realizacje')
}, { immediate: true })

const activeIndex = ref(null)
function openPhoto(i) {
  activeIndex.value = i
}
function closeLightbox() {
  activeIndex.value = null
}
</script>

<template>
  <template v-if="category">
    <section class="page-header bg-dark">
      <div class="container">
        <nav class="breadcrumbs" aria-label="Okruszki">
          <router-link to="/">Strona główna</router-link>
          <span>/</span>
          <router-link to="/realizacje">Realizacje</router-link>
          <span>/</span>
          <span>{{ category.title }}</span>
        </nav>
        <p class="eyebrow">{{ category.label }}</p>
        <h1>{{ category.title }}</h1>
        <p class="page-lead">{{ category.shortDesc }}</p>

        <div class="category-tabs">
          <router-link
            v-for="cat in categories"
            :key="cat.slug"
            :to="`/realizacje/${cat.slug}`"
            class="category-tab"
            :class="{ active: cat.slug === category.slug }"
          >{{ cat.title }}</router-link>
        </div>
      </div>
    </section>

    <section>
      <div class="container">
        <div v-if="category.images.length" class="photo-grid">
          <button
            v-for="(img, i) in category.images"
            :key="img.key"
            class="photo-tile"
            type="button"
            @click="openPhoto(i)"
          >
            <img :src="mediaUrl(img.key)" :alt="img.alt || category.title" loading="lazy">
          </button>
        </div>
        <p v-else class="empty-state">Brak zdjęć w tym obszarze — [DO WERYFIKACJI: uzupełnić po zebraniu materiału].</p>

        <div class="section-cta">
          <router-link class="btn" to="/#kontakt">Chcę podobną realizację — zapytaj o wycenę</router-link>
        </div>
      </div>
    </section>

    <Lightbox
      v-if="activeIndex !== null"
      :title="category.title"
      :images="category.images"
      :start-index="activeIndex"
      @close="closeLightbox"
    />
  </template>
</template>
