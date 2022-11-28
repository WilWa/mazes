import Cell from '@/types/Cell'
import Distances from './Distances'

class Grid {
  private grid: Cell[][] = []

  public breadcrumbs!: Distances
  public columnCount: number
  public distances!: Distances
  public rowCount: number

  constructor(columnCount: number, rowCount: number) {
    this.columnCount = columnCount
    this.rowCount = rowCount
    this.prepareGrid(columnCount, rowCount)
    this.configureCells()
  }

  public calculateDistances() {
    this.distances = this.getMaximumDistances()
    this.breadcrumbs = this.distances.pathTo(this.distances.max())
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public cellColor(cell: Cell): string {
    return '#FFFFFFFF'
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public cellContents(cell: Cell): string {
    return '  '
  }

  public getCell(column: number, row: number): Cell | undefined {
    if (column >= 0 && column < this.columnCount && row >= 0 && row < this.rowCount) {
      return this.grid[row][column]
    }
    return undefined
  }

  public *getCells() {
    for (const row of this.grid) {
      for (const cell of row) {
        yield cell
      }
    }
  }

  public getMaximumDistances(): Distances {
    let maximumDistances = undefined
    for (const cell of this.getCells()) {
      const cellDistances = cell.distances()
      const cellMaxPathLength = cellDistances.pathTo(cellDistances.max()).length()
      if (maximumDistances === undefined || cellMaxPathLength > maximumDistances.length()) {
        maximumDistances = cellDistances
      }
    }
    return maximumDistances ?? new Distances(this.randomCell())
  }

  public *getRows() {
    for (const row of this.grid) {
      yield row
    }
  }

  public randomCell() {
    const randomColumn = Math.floor(Math.random() * this.columnCount)
    const randomRow = Math.floor(Math.random() * this.rowCount)
    return this.grid[randomRow][randomColumn]
  }

  public toString() {
    const output = []
    output.push('+')
    for (let column = 0; column < this.columnCount; column++) {
      output.push('---+')
    }
    output.push('\n')
    for (const row of this.getRows()) {
      const top = []
      top.push('|')
      const bottom = []
      bottom.push('+')
      for (let cell of row) {
        if (!cell) cell = new Cell(-1, -1)
        const body = this.cellContents(cell)
        const east = cell.isLinked(cell.east) ? ' ' : '|'
        top.push(body, east)
        const south = cell.isLinked(cell.south) ? '   ' : '---'
        const corner = '+'
        bottom.push(south, corner)
      }
      output.push(top.join(''), '\n')
      output.push(bottom.join(''), '\n')
    }
    return output.join('')
  }

  private configureCells() {
    for (const row of this.grid) {
      for (const cell of row) {
        cell.east = this.getCell(cell.column + 1, cell.row)
        cell.north = this.getCell(cell.column, cell.row - 1)
        cell.south = this.getCell(cell.column, cell.row + 1)
        cell.west = this.getCell(cell.column - 1, cell.row)
      }
    }
  }

  private prepareGrid(columns: number, rows: number) {
    for (let row = 0; row < rows; row++) {
      this.grid.push([])
      for (let column = 0; column < columns; column++) {
        this.grid[row].push(new Cell(column, row))
      }
    }
  }
}

export default Grid
