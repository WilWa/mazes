import Distances from './Distances'

class Cell {
  private linksMap: Map<Cell, boolean>

  public column: number
  public row: number

  public north: Cell | undefined
  public south: Cell | undefined
  public west: Cell | undefined
  public east: Cell | undefined

  constructor(column: number, row: number) {
    this.column = column
    this.linksMap = new Map<Cell, boolean>()
    this.row = row
  }

  public distances(): Distances {
    const distances = new Distances(this)
    let frontier: Cell[] = [this]
    while (frontier.length > 0) {
      const newFrontier: Cell[] = []
      frontier.forEach((cell) => {
        cell.links().forEach((link) => {
          const cellDistance = distances.getDistance(cell)
          if (cellDistance !== undefined && distances.getDistance(link) === undefined) {
            distances.setDistance(link, cellDistance + 1)
            newFrontier.push(link)
          }
        })
      })
      frontier = newFrontier
    }
    return distances
  }

  public isLinked(cell: Cell | undefined) {
    if (!cell) {
      return false
    }
    return this.linksMap.get(cell)
  }

  public link(cell: Cell, biDirectionally = true) {
    this.linksMap.set(cell, true)
    if (biDirectionally) {
      cell.link(this, false)
    }
  }

  public links(): Cell[] {
    return Array.from(this.linksMap.keys())
  }

  public neighbors(): Cell[] {
    return [this.east, this.north, this.south, this.west].filter((item) => !!item) as Cell[]
  }

  public unlink(cell: Cell, biDirectionally = true) {
    this.linksMap.delete(cell)
    if (biDirectionally) {
      cell.unlink(this, false)
    }
  }
}

export default Cell
