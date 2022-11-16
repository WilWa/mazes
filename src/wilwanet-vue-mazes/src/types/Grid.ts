import Cell from '@/types/Cell'

class Grid {
  private columns: number
  private grid: Cell[][] = []
  private rows: number

  constructor(columns: number, rows: number) {
    this.columns = columns
    this.rows = rows
    this.prepareGrid(columns, rows)
    this.configureCells()
  }

  public *getCells() {
    let column = 0
    let row = 0
    while (column < this.columns) {
      while (row < this.rows) {
        yield this.grid[column][row]
        row++
      }
      row = 0
      column++
    }
  }

  public *getRows() {
    let row = 0
    while (row < this.rows) {
      const rowCells: Cell[] = []
      for (let column = 0; column < this.columns; column++) {
        rowCells.push(this.grid[column][row])
      }
      yield rowCells
      row++
    }
  }

  public toString() {
    const output = []
    output.push('+')
    for (let column = 0; column < this.grid.length; column++) {
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
        const body = '   '
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
    for (let column = 0; column < this.grid.length; column++) {
      for (let row = 0; row < this.grid[column].length; row++) {
        this.grid[column][row].east = this.getCell(column + 1, row)
        this.grid[column][row].north = this.getCell(column, row - 1)
        this.grid[column][row].south = this.getCell(column, row + 1)
        this.grid[column][row].west = this.getCell(column - 1, row)
      }
    }
  }

  private getCell(column: number, row: number): Cell | undefined {
    if (column >= 0 && column < this.columns && row >= 0 && row < this.rows) {
      return this.grid[column][row]
    }
    return undefined
  }

  private prepareGrid(columns: number, rows: number) {
    for (let column = 0; column < columns; column++) {
      this.grid.push([])
      for (let row = 0; row < rows; row++) {
        this.grid[column].push(new Cell(column, row))
      }
    }
  }

  private randomCell() {
    const randomColumn = Math.floor(Math.random() * this.columns)
    const randomRow = Math.floor(Math.random() * this.rows)
    return this.grid[randomColumn][randomRow]
  }
}

export default Grid
