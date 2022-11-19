<template>
  <div class="mazeDisplay">
    <div>
      <h1>Binary Tree (Html)</h1>
      <GridHtmlDisplay :grid="binaryTreeGrid" />
    </div>
    <div>
      <h1>Sidewinder (Canvas)</h1>
      <GridCanvasDisplay :grid="sidewinderGrid" />
    </div>
    <div>
      <h1>AldousBroder (Html)</h1>
      <GridHtmlDisplay :grid="aldousBroderGrid" />
    </div>
    <div>
      <h1>Wilson's (Canvas)</h1>
      <GridCanvasDisplay :grid="wilsonsGrid" />
    </div>
  </div>
</template>

<script setup lang="ts">
  import AldousBroder from '@/types/algorithms/AldousBroder'
  import BinaryTree from '@/types/algorithms/BinaryTree'
  import GridCanvasDisplay from './GridCanvasDisplay.vue'
  import GridHtmlDisplay from './GridHtmlDisplay.vue'
  import Sidewinder from '@/types/algorithms/Sidewinder'
  import SolvedColorGrid from '@/types/SolvedColorGrid'
  import Wilsons from '@/types/algorithms/Wilsons'

  const binaryTreeGrid = new SolvedColorGrid(20, 20)
  BinaryTree.on(binaryTreeGrid)
  let startCell = binaryTreeGrid.getCell(0, 0)
  if (startCell) {
    const distances = startCell.distances()
    const startMax = distances.max()
    const backTrackDistances = startMax.distances()
    const newStart = backTrackDistances.max()
    binaryTreeGrid.breadcrumbs = backTrackDistances.pathTo(newStart)
    binaryTreeGrid.distances = newStart.distances()
  }

  const sidewinderGrid = new SolvedColorGrid(20, 20)
  Sidewinder.on(sidewinderGrid)
  startCell = sidewinderGrid.getCell(0, 0)
  if (startCell) {
    const distances = startCell.distances()
    const startMax = distances.max()
    const backTrackDistances = startMax.distances()
    const newStart = backTrackDistances.max()
    sidewinderGrid.breadcrumbs = backTrackDistances.pathTo(newStart)
    sidewinderGrid.distances = newStart.distances()
  }

  const aldousBroderGrid = new SolvedColorGrid(20, 20)
  AldousBroder.on(aldousBroderGrid)
  startCell = aldousBroderGrid.getCell(0, 0)
  if (startCell) {
    const distances = startCell.distances()
    const startMax = distances.max()
    const backTrackDistances = startMax.distances()
    const newStart = backTrackDistances.max()
    aldousBroderGrid.breadcrumbs = backTrackDistances.pathTo(newStart)
    aldousBroderGrid.distances = newStart.distances()
  }

  const wilsonsGrid = new SolvedColorGrid(20, 20)
  Wilsons.on(wilsonsGrid)
  startCell = wilsonsGrid.getCell(0, 0)
  if (startCell) {
    const distances = startCell.distances()
    const startMax = distances.max()
    const backTrackDistances = startMax.distances()
    const newStart = backTrackDistances.max()
    wilsonsGrid.breadcrumbs = backTrackDistances.pathTo(newStart)
    wilsonsGrid.distances = newStart.distances()
  }
</script>

<style scoped lang="scss">
  .mazeDisplay {
    display: flex;
    gap: 5px;
    flex-wrap: wrap;
  }
</style>
