<template>
  <div>Something cool will go here</div>
</template>

<script setup lang="ts">
  import BinaryTree from '@/types/BinaryTree'
  import Grid from '@/types/Grid'
  import SideWinder from '@/types/SideWinder'

  const binaryTreeGrid = new Grid(10, 10)
  BinaryTree.on(binaryTreeGrid)
  console.log('Binary Tree')
  console.log(binaryTreeGrid.toString())

  const sideWinderGrid = new Grid(10, 10)
  SideWinder.on(sideWinderGrid)
  console.log('Sidewinder')
  console.log(sideWinderGrid.toString())
</script>
