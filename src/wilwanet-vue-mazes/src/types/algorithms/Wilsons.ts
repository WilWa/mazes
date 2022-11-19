import type Cell from '../Cell'
import type Grid from '@/types/Grid'

// https://weblog.jamisbuck.org/2011/1/20/maze-generation-wilson-s-algorithm
class Wilsons {
  public static on(grid: Grid) {
    const unvisited: Cell[] = [...grid.getCells()]
    const firstIndex = Math.floor(Math.random() * unvisited.length)
    unvisited.splice(firstIndex, 1)

    while (unvisited.length > 0) {
      let cell = unvisited[Math.floor(Math.random() * unvisited.length)]
      let path = [cell]
      while (unvisited.includes(cell)) {
        const neighbors = cell.neighbors()
        cell = neighbors[Math.floor(Math.random() * neighbors.length)]
        const position = path.indexOf(cell)
        if (position > -1) {
          path = path.splice(0, position + 1)
        } else {
          path.push(cell)
        }
      }
      for (let index = 0; index < path.length - 1; index++) {
        path[index].link(path[index + 1])
        const unvisitedIndex = unvisited.indexOf(path[index])
        unvisited.splice(unvisitedIndex, 1)
      }
    }
  }
}

export default Wilsons
