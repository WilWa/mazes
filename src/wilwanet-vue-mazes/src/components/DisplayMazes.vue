<!-- eslint-disable vue/html-self-closing -->
<!-- Some kind of conflict on the above with the input tags ??? -->
<template>
  <div>
    <div>
      Columns
      <button @click="columns--">Less</button>
      <button @click="columns++">More</button>
    </div>
    <div>
      Width
      <button @click="cellWidth--">Less</button>
      <button @click="cellWidth++">More</button>
    </div>
    <div>
      Rows
      <button @click="rows--">Less</button>
      <button @click="rows++">More</button>
    </div>
    <div>
      Height
      <button @click="cellHeight--">Less</button>
      <button @click="cellHeight++">More</button>
    </div>
    <div>
      Algorithm
      <select v-model="algorithmChoice">
        <option>AldousBroder</option>
        <option>BinaryTree</option>
        <option>Sidewinder</option>
        <option>Wilsons</option>
      </select>
    </div>
    <div>
      Options
      <input
        v-model="displayStart"
        type="checkbox" />
      Start
      <input
        v-model="displayGoal"
        type="checkbox" />
      Goal
      <input
        v-model="displayPath"
        type="checkbox" />
      Path
      <input
        v-model="displayColorMap"
        type="checkbox" />
      Color Map
    </div>
  </div>
  <div>{{ algorithmChoice }}: {{ rows }} x {{ columns }}, cells {{ cellWidth }} x {{ cellHeight }}</div>
  <button @click="mazeKey++">New Maze</button>
  <div class="mazeDisplay">
    <MazeGridCanvas
      :key="mazeKey"
      :algorithm="algorithm"
      :cell-height="cellHeight"
      :cell-width="cellWidth"
      :columns="columns"
      :display-color-map="displayColorMap"
      :display-goal="displayGoal"
      :display-path="displayPath"
      :display-start="displayStart"
      :rows="rows" />
  </div>
</template>

<script setup lang="ts">
  import { computed, ref } from 'vue'
  import AldousBroder from '@/types/algorithms/AldousBroder'
  import BinaryTree from '@/types/algorithms/BinaryTree'
  import MazeGridCanvas from './MazeGridCanvas.vue'
  import Sidewinder from '@/types/algorithms/Sidewinder'
  import Wilsons from '@/types/algorithms/Wilsons'

  const algorithmChoice = ref('BinaryTree')
  const cellHeight = ref(20)
  const cellWidth = ref(20)
  const columns = ref(20)
  const displayColorMap = ref(true)
  const displayGoal = ref(true)
  const displayPath = ref(true)
  const displayStart = ref(true)
  const mazeKey = ref(0)
  const rows = ref(20)

  const algorithm = computed(() => {
    switch (algorithmChoice.value) {
      case 'AldousBroder':
        return new AldousBroder()
      case 'BinaryTree':
        return new BinaryTree()
      case 'Sidewinder':
        return new Sidewinder()
      case 'Wilsons':
        return new Wilsons()
      default:
        return new BinaryTree()
    }
  })
</script>

<style scoped lang="scss">
  .mazeDisplay {
    display: flex;
    gap: 5px;
    flex-wrap: wrap;
  }
</style>
