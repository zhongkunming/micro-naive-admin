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
async function toggleDark({ clientX, clientY }) {
  function handler() {
    appStore.toggleDark()
    useToggle(isDark)()
  }

  if (!document.startViewTransition) {
    return handler()
  }

  const clipPath = [
    `circle(0px at ${clientX}px ${clientY}px)`,
    `circle(${Math.hypot(
      Math.max(clientX, window.innerWidth - clientX),
      Math.max(clientY, window.innerHeight - clientY),
    )}px at ${clientX}px ${clientY}px)`,
  ]

  await document.startViewTransition(handler).ready

  document.documentElement.animate(
    { clipPath: isDark.value ? clipPath.reverse() : clipPath },
    {
      duration: 500,
      easing: 'ease-in',
      pseudoElement: `::view-transition-${isDark.value ? 'old' : 'new'}(root)`,
    },
  )

  // const maxRadius = Math.hypot(
  //   Math.max(clientX, window.innerWidth - clientX),
  //   Math.max(clientY, window.innerHeight - clientY),
  // )
  // const style = document.documentElement.style
  // style.setProperty('--circle-x', `${clientX}px`)
  // style.setProperty('--circle-y', `${clientY}px`)
  // style.setProperty('--circle-r', `${maxRadius}px`)

  // function handler() {
  //   appStore.toggleDark()
  //   useToggle(isDark)()
  // }

  // document.startViewTransition
  //   ? document.startViewTransition(handler)
  //   : handler()
}
</script>
