import type Cell from './Cell'
import type Distances from './Distances'
import Grid from './Grid'

class ColorGrid extends Grid {
  public distances!: Distances
  private hue = Math.floor(Math.random() * 360)

  public cellColor(cell: Cell): string {
    const distance = this.distances.getDistance(cell)

    const maxCell = this.distances.max()
    const maxDistance = this.distances.getDistance(maxCell)
    if (distance !== undefined && maxDistance !== undefined) {
      const intensity = (maxDistance - distance) / maxDistance
      const saturation = Math.floor(intensity * 100)
      const lightness = Math.floor(intensity * 50) + 25
      return `hsl(${this.hue}, ${saturation}%, ${lightness}%)`
    }
    return 'white'
  }

  public cellContents(cell: Cell): string {
    if (cell === this.distances.start) {
      return 'S'
    }
    if (cell === this.distances.max()) {
      return 'E'
    }
    return ''
  }
}

export default ColorGrid
