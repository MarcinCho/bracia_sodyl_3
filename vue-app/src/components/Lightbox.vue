<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { mediaUrl } from '../data/realizacje'

const props = defineProps({
  title: { type: String, required: true },
  images: { type: Array, required: true },
  startIndex: { type: Number, default: 0 }
})
const emit = defineEmits(['close'])

const index = ref(props.startIndex)

function next() {
  index.value = (index.value + 1) % props.images.length
}
function prev() {
  index.value = (index.value - 1 + props.images.length) % props.images.length
}
function close() {
  emit('close')
}
function onKeydown(e) {
  if (e.key === 'Escape') close()
  else if (e.key === 'ArrowRight') next()
  else if (e.key === 'ArrowLeft') prev()
}

onMounted(() => window.addEventListener('keydown', onKeydown))
onUnmounted(() => window.removeEventListener('keydown', onKeydown))
</script>

<template>
  <Teleport to="body">
    <div class="lightbox-overlay" @click.self="close">
      <div class="lightbox-box">
        <button class="lightbox-close" aria-label="Zamknij" @click="close">✕</button>

        <button
          v-if="images.length > 1"
          class="lightbox-nav lightbox-prev"
          aria-label="Poprzednie zdjęcie"
          @click="prev"
        >‹</button>

        <div class="lightbox-image">
          <img :src="mediaUrl(images[index].key)" :alt="images[index].alt || title" loading="eager">
        </div>

        <button
          v-if="images.length > 1"
          class="lightbox-nav lightbox-next"
          aria-label="Następne zdjęcie"
          @click="next"
        >›</button>

        <div class="lightbox-caption">
          <strong>{{ title }}</strong>
          <span v-if="images.length > 1">{{ index + 1 }} / {{ images.length }}</span>
        </div>
      </div>
    </div>
  </Teleport>
</template>
