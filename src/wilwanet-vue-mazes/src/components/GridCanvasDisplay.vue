<template>
  <canvas
    ref="canvas"
    class="gridCanvasDisplay"
    :height="grid.columnCount * 25"
    :width="grid.rowCount * 25" />
</template>

<script setup lang="ts">
  import { onMounted, onUpdated, ref } from 'vue'
  import CanvasPainter from '@/types/CanvasPainter'
  import type Grid from '@/types/Grid'

  const props = defineProps<{
    grid: Grid
  }>()

  const canvas = ref<HTMLCanvasElement>()

  const draw = () => {
    if (canvas.value) {
      const context = canvas.value.getContext('2d')
      if (context !== null) {
        CanvasPainter.draw(context, 25, props.grid, true)
      }
    }
  }

  onMounted(() => {
    draw()
  })

  onUpdated(() => {
    draw()
  })
</script>

<style scoped lang="scss">
  .gridCanvasDisplay {
    border: 1px solid black;
  }
</style>
