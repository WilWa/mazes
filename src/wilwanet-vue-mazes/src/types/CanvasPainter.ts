import type Grid from './Grid'

class CanvasPainter {
  public static draw(context: CanvasRenderingContext2D, cellSize: number, grid: Grid, drawBackground = false) {
    for (const cell of grid.getCells()) {
      const x1 = cell.column * cellSize
      const x2 = (cell.column + 1) * cellSize
      const y1 = cell.row * cellSize
      const y2 = (cell.row + 1) * cellSize

      if (drawBackground) {
        context.fillStyle = grid.cellColor(cell)
        context.fillRect(x1, y1, cellSize, cellSize)
        context.stroke()
      }

      context.fillStyle = '#000000FF'
      context.font = '20px Arial'

      context.fillText(grid.cellContents(cell), x1, y1 + 17)

      if (!cell.north) {
        context.moveTo(x1, y1)
        context.lineTo(x2, y1)
        context.stroke()
      }

      if (!cell.west) {
        context.moveTo(x1, y1)
        context.lineTo(x1, y2)
        context.stroke()
      }

      if (!cell.isLinked(cell.east)) {
        context.moveTo(x2, y1)
        context.lineTo(x2, y2)
        context.stroke()
      }

      if (!cell.isLinked(cell.south)) {
        context.moveTo(x1, y2)
        context.lineTo(x2, y2)
        context.stroke()
      }
    }
  }
}

export default CanvasPainter
