<template>
  <div>
    <canvas
      ref="canvas"
      class="gridCanvasDisplay" />
  </div>
</template>

<script setup lang="ts">
  import { type PropType, computed, onMounted, onUpdated, ref } from 'vue'
  import type BaseGridAlgorithm from '@/types/algorithms/BaseGridAlgorithm'
  import BinaryTree from '@/types/algorithms/BinaryTree'
  import CanvasPainter from '@/types/CanvasPainter'
  import CanvasPainterOptions from '@/types/CanvasPainterOptions'
  import Grid from '@/types/Grid'

  // https://stackoverflow.com/a/72558059
  const props = defineProps({
    algorithm: { type: Object as PropType<BaseGridAlgorithm>, default: new BinaryTree() },
    cellHeight: { type: Number, default: 25 },
    cellWidth: { type: Number, default: 25 },
    columns: { type: Number, default: 5 },
    displayColorMap: { type: Boolean, default: true },
    displayGoal: { type: Boolean, default: true },
    displayPath: { type: Boolean, default: true },
    displayStart: { type: Boolean, default: true },
    rows: { type: Number, default: 5 }
  })

  const canvas = ref<HTMLCanvasElement>()

  let hue = Math.floor(Math.random() * 200) + 75

  const grid = computed(() => {
    return makeGrid()
  })

  const height = computed(() => {
    return props.cellHeight * props.rows
  })

  const makeGrid = () => {
    const newGrid = new Grid(props.columns, props.rows)
    props.algorithm.on(newGrid)
    newGrid.calculateDistances()
    hue = Math.floor(Math.random() * 200) + 75
    return newGrid
  }

  const updateCanvas = () => {
    if (canvas.value) {
      const context = canvas.value.getContext('2d')
      canvas.value.style.height = height.value + 'px'
      canvas.value.style.width = width.value + 'px'
      const scale = window.devicePixelRatio
      canvas.value.height = height.value * scale
      canvas.value.width = width.value * scale
      context?.scale(scale, scale)
      if (context !== null) {
        context.beginPath()
        context.fillStyle = 'rgba(0, 0, 0, 255)'
        context.clearRect(0, 0, canvas.value.width, canvas.value.height)
        context.stroke()
        const canvasPainterOptions = new CanvasPainterOptions()
        canvasPainterOptions.cellHeight = props.cellHeight
        canvasPainterOptions.cellWidth = props.cellWidth
        canvasPainterOptions.displayColorMap = props.displayColorMap
        canvasPainterOptions.displayGoal = props.displayGoal
        canvasPainterOptions.displayPath = props.displayPath
        canvasPainterOptions.displayStart = props.displayStart
        canvasPainterOptions.hue = hue
        CanvasPainter.draw(canvasPainterOptions, context, grid.value)
      }
    }
  }

  const width = computed(() => {
    return props.cellWidth * props.columns
  })

  onMounted(() => {
    updateCanvas()
  })

  onUpdated(() => {
    updateCanvas()
  })
</script>

<style scoped lang="scss">
  .gridCanvasDisplay {
    display: block;
  }
</style>
