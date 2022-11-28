import BaseGridAlgorithm from './BaseGridAlgorithm'
import type Grid from '@/types/Grid'

// https://weblog.jamisbuck.org/2011/2/3/maze-generation-sidewinder-algorithm.html
class Sidewinder extends BaseGridAlgorithm {
  public on(grid: Grid) {
    for (const row of grid.getRows()) {
      let run = []
      for (const cell of row) {
        run.push(cell)
        const atEastBoundary = !cell.east
        const atNorthBoundary = !cell.north
        const shouldCloseOut = atEastBoundary || (!atNorthBoundary && Math.random() < 0.33)
        if (shouldCloseOut) {
          const index = Math.floor(Math.random() * run.length)
          const member = run[index]
          if (member.north) {
            member.link(member.north)
            run = []
          }
        } else if (cell.east) {
          cell.link(cell.east)
        }
      }
    }
  }
}

export default Sidewinder
