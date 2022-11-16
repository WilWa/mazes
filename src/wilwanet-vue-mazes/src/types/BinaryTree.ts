import Grid from '@/types/Grid'

class BinaryTree {
  public static on(grid: Grid) {
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
