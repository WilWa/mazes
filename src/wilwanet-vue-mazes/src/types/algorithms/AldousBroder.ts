import BaseGridAlgorithm from './BaseGridAlgorithm'
import type Cell from '../Cell'
import type Grid from '@/types/Grid'

// https://weblog.jamisbuck.org/2011/1/17/maze-generation-aldous-broder-algorithm
class AldousBroder extends BaseGridAlgorithm {
  public on(grid: Grid) {
    let cell: Cell = grid.randomCell()
    let unvisited = grid.columnCount * grid.rowCount - 1

    while (unvisited > 0) {
      const randomNeighborIndex = Math.floor(Math.random() * cell.neighbors().length)
      const neighbor: Cell = cell.neighbors()[randomNeighborIndex]
      if (neighbor.links().length < 1) {
        cell.link(neighbor)
        unvisited -= 1
      }
      cell = neighbor
    }
  }
}

export default AldousBroder
