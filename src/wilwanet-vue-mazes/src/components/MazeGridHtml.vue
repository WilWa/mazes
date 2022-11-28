<template>
  <div class="gridHtmlDisplay">
    <div
      v-for="(row, rowIndex) of grid.getRows()"
      :key="rowIndex"
      class="gridHtmlDisplay__row">
      <div
        v-for="(cell, cellIndex) of row"
        :key="cellIndex"
        class="gridHtmlDisplay__cell"
        :class="getComputedClass(cell)"
        :style="getComputedStyle(cell)">
        {{ getCellContents(cell) }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { type PropType, computed } from 'vue'
  import type BaseGridAlgorithm from '@/types/algorithms/BaseGridAlgorithm'
  import BinaryTree from '@/types/algorithms/BinaryTree'
  import type Cell from '@/types/Cell'
  import Grid from '@/types/Grid'

  // https://stackoverflow.com/a/72558059
  const props = defineProps({
    algorithm: { type: Object as PropType<BaseGridAlgorithm>, default: new BinaryTree() },
    columns: { type: Number, default: 5 },
    displayColorMap: { type: Boolean, default: true },
    displayGoal: { type: Boolean, default: true },
    displayPath: { type: Boolean, default: true },
    displayStart: { type: Boolean, default: true },
    rows: { type: Number, default: 5 }
  })

  let hue = Math.floor(Math.random() * 200) + 75

  const cellColor = (cell: Cell): string => {
    const distance = grid.value.distances.getDistance(cell)

    const maxCell = grid.value.distances.max()
    const maxDistance = grid.value.distances.getDistance(maxCell)
    if (distance !== undefined && maxDistance !== undefined) {
      const intensity = (maxDistance - distance) / maxDistance
      const saturation = Math.floor(intensity * 50) + 25
      const lightness = Math.floor(intensity * 50) + 25
      return `hsl(${hue}, ${saturation}%, ${lightness}%)`
    }
    return 'white'
  }

  const grid = computed(() => {
    return getGrid()
  })

  const getCellContents = (cell: Cell) => {
    if (props.displayGoal && cell === grid.value.distances.max()) {
      return 'G'
    }
    if (
      props.displayPath &&
      cell !== grid.value.distances.start &&
      grid.value.breadcrumbs.getDistance(cell) !== undefined
    ) {
      return '·'
    }
    if (props.displayStart && cell === grid.value.distances.start) {
      return 'S'
    }

    return '  '
  }

  const getGrid = () => {
    hue = Math.floor(Math.random() * 200) + 75
    const newGrid = new Grid(props.columns, props.rows)
    props.algorithm.on(newGrid)
    newGrid.calculateDistances()
    return newGrid
  }

  const getComputedClass = (cell: Cell) => {
    const computedStyle: string[] = []
    if (cell.column === grid.value.columnCount - 1 && !cell.isLinked(cell.east)) {
      computedStyle.push('gridHtmlDisplay__cell--eastWall')
    }
    if (!cell.isLinked(cell.north)) {
      computedStyle.push('gridHtmlDisplay__cell--northWall')
    }
    if (cell.row === grid.value.rowCount - 1 && !cell.isLinked(cell.south)) {
      computedStyle.push('gridHtmlDisplay__cell--southWall')
    }
    if (!cell.isLinked(cell.west)) {
      computedStyle.push('gridHtmlDisplay__cell--westWall')
    }
    computedStyle.push('background-color:' + grid.value.cellColor(cell))
    return computedStyle.join(' ')
  }

  const getComputedStyle = (cell: Cell) => {
    if (props.displayColorMap) {
      const computedStyle: string[] = []
      computedStyle.push('background-color:' + cellColor(cell))
      return computedStyle.join(' ')
    }
    return ''
  }
</script>

<style scoped lang="scss">
  .gridHtmlDisplay {
    &__row {
      display: flex;
    }

    &__cell {
      align-items: center;
      box-sizing: border-box;
      display: flex;
      font-size: 11px;
      font-weight: bold;
      height: 12px;
      justify-content: center;
      width: 12px;

      &--eastWall {
        border-right: 2px solid #444;
      }

      &--northWall {
        border-top: 2px solid #444;
      }

      &--southWall {
        border-bottom: 1px solid #444;
      }

      &--westWall {
        border-left: 2px solid #444;
      }
    }
  }
</style>
