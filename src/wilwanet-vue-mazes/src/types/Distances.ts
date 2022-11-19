import type Cell from '@/types/Cell'

// https://en.wikipedia.org/wiki/Dijkstra%27s_algorithm
class Distances {
  private distanceMap: Map<Cell, number>

  public start: Cell

  constructor(start: Cell) {
    this.start = start
    this.distanceMap = new Map<Cell, number>()
    this.distanceMap.set(start, 0)
  }

  public cells(): Cell[] {
    return Array.from(this.distanceMap.keys())
  }

  public getDistance(cell: Cell) {
    return this.distanceMap.get(cell)
  }

  public pathTo(goal: Cell) {
    let currentCell: Cell = goal
    const breadCrumbs = new Distances(this.start)
    breadCrumbs.setDistance(currentCell, this.getDistance(currentCell))
    while (currentCell !== this.start) {
      const currentCellDistance = this.getDistance(currentCell)
      for (const link of currentCell.links()) {
        const linkedCellDistance = this.getDistance(link)
        if (
          linkedCellDistance !== undefined &&
          currentCellDistance !== undefined &&
          linkedCellDistance < currentCellDistance
        ) {
          breadCrumbs.setDistance(link, this.getDistance(link))
          currentCell = link
          break
        }
      }
    }
    return breadCrumbs
  }

  public setDistance(cell: Cell, distance: number | undefined) {
    if (distance !== undefined) {
      this.distanceMap.set(cell, distance)
    }
  }

  public max() {
    let maxDistance = 0
    let maxCell = this.start
    for (const [cell, distance] of this.distanceMap) {
      if (distance > maxDistance) {
        maxCell = cell
        maxDistance = distance
      }
    }
    return maxCell
  }
}

export default Distances
