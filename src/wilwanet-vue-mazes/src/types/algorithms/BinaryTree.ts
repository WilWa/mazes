import BaseGridAlgorithm from './BaseGridAlgorithm'
import type Grid from '@/types/Grid'

// https://weblog.jamisbuck.org/2011/2/1/maze-generation-binary-tree-algorithm
class BinaryTree extends BaseGridAlgorithm {
  public on(grid: Grid) {
    for (const cell of grid.getCells()) {
      const neighbors = []
      if (cell.north) {
        neighbors.push(cell.north)
      }
      if (cell.east) {
        neighbors.push(cell.east)
      }
      const index = Math.floor(Math.random() * neighbors.length)
      const neighbor = neighbors[index]
      if (neighbor) {
        cell.link(neighbor)
      }
    }
  }
}

export default BinaryTree
