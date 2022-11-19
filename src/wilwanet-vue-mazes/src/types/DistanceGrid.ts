import type Cell from './Cell'
import type Distances from './Distances'
import Grid from './Grid'

class DistanceGrid extends Grid {
  public distances!: Distances

  public cellContents(cell: Cell): string {
    const distance = this.distances.getDistance(cell)
    return distance !== undefined ? distance.toString() : '  '
  }
}

export default DistanceGrid
