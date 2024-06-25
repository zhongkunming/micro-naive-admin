<template>
  <i
    class="mr-16 cursor-pointer"
    :class="isDark ? 'i-fe:moon' : 'i-fe:sun'"
    @click="toggleDark"
  />
</template>

<script setup>
import { useDark, useToggle } from '@vueuse/core'
import { useAppStore } from '@/store'

const appStore = useAppStore()
const isDark = useDark()
function toggleDark({ clientX, clientY }) {
  const maxRadius = Math.hypot(
    Math.max(clientX, window.innerWidth - clientX),
    Math.max(clientY, window.innerHeight - clientY),
  )
  const style = document.documentElement.style
  style.setProperty('--circle-x', `${clientX}px`)
  style.setProperty('--circle-y', `${clientY}px`)
  style.setProperty('--circle-r', `${maxRadius}px`)

  function handler() {
    appStore.toggleDark()
    useToggle(isDark)()
  }

  document.startViewTransition
    ? document.startViewTransition(handler)
    : handler()
}
</script>
