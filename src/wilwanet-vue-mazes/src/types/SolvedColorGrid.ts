import type Cell from './Cell'
import ColorGrid from './ColorGrid'
import type Distances from './Distances'

class SolvedColorGrid extends ColorGrid {
  public breadcrumbs!: Distances

  public cellContents(cell: Cell): string {
    if (cell === this.distances.start) {
      return '🐢'
    }
    if (cell === this.distances.max()) {
      return '🕳️'
    }
    if (this.breadcrumbs.getDistance(cell) !== undefined) {
      return '🐾'
    }
    return ''
  }
}

export default SolvedColorGrid
