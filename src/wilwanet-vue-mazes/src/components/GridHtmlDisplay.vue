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
        {{ grid.cellContents(cell) }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import type Cell from '@/types/Cell'
  import type Grid from '@/types/Grid'

  const props = defineProps<{
    grid: Grid
  }>()

  const getComputedClass = (cell: Cell) => {
    const computedStyle: string[] = []
    if (cell.column === props.grid.columnCount - 1 && !cell.isLinked(cell.east)) {
      computedStyle.push('gridHtmlDisplay__cell--eastWall')
    }
    if (!cell.isLinked(cell.north)) {
      computedStyle.push('gridHtmlDisplay__cell--northWall')
    }
    if (cell.row === props.grid.rowCount - 1 && !cell.isLinked(cell.south)) {
      computedStyle.push('gridHtmlDisplay__cell--southWall')
    }
    if (!cell.isLinked(cell.west)) {
      computedStyle.push('gridHtmlDisplay__cell--westWall')
    }
    computedStyle.push('background-color:' + props.grid.cellColor(cell))
    return computedStyle.join(' ')
  }

  const getComputedStyle = (cell: Cell) => {
    const computedStyle: string[] = []
    computedStyle.push('background-color:' + props.grid.cellColor(cell))
    return computedStyle.join(' ')
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
      font-size: large;
      font-weight: bold;
      height: 25px;
      justify-content: center;
      width: 25px;

      &--eastWall {
        border-right: 2px solid black;
      }

      &--northWall {
        border-top: 2px solid black;
      }

      &--southWall {
        border-bottom: 1px solid black;
      }

      &--westWall {
        border-left: 2px solid black;
      }
    }
  }
</style>
