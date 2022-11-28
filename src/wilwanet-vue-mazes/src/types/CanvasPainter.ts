import type CanvasPainterOptions from './CanvasPainterOptions'
import type Cell from './Cell'
import type Grid from './Grid'

class CanvasPainter {
  public static draw(canvasPainterOptions: CanvasPainterOptions, context: CanvasRenderingContext2D, grid: Grid) {
    if (canvasPainterOptions.displayColorMap) {
      for (const cell of grid.getCells()) {
        const x1 = cell.column * canvasPainterOptions.cellWidth
        const x2 = (cell.column + 1) * canvasPainterOptions.cellWidth
        const y1 = cell.row * canvasPainterOptions.cellHeight
        const y2 = (cell.row + 1) * canvasPainterOptions.cellHeight

        CanvasPainter.drawColor(canvasPainterOptions, context, cell, grid, x1, y1, x2, y2)
      }
    }
    for (const cell of grid.getCells()) {
      const x1 = cell.column * canvasPainterOptions.cellWidth
      const x2 = (cell.column + 1) * canvasPainterOptions.cellWidth
      const y1 = cell.row * canvasPainterOptions.cellHeight
      const y2 = (cell.row + 1) * canvasPainterOptions.cellHeight

      CanvasPainter.drawGoal(canvasPainterOptions, cell, grid, context, x1, x2, y1, y2)

      CanvasPainter.drawStart(canvasPainterOptions, cell, grid, context, x1, x2, y1, y2)

      CanvasPainter.drawPath(canvasPainterOptions, cell, grid, context, x1, x2, y1, y2)

      CanvasPainter.drawWalls(cell, context, x1, y1, x2, y2)
    }
  }

  private static cellColor(cell: Cell, grid: Grid, hue: number): string {
    const distance = grid.distances.getDistance(cell)

    const maxCell = grid.distances.max()
    const maxDistance = grid.distances.getDistance(maxCell)
    if (distance !== undefined && maxDistance !== undefined) {
      const intensity = (maxDistance - distance) / maxDistance
      const saturation = Math.floor(intensity * 50) + 25
      const lightness = Math.floor(intensity * 50) + 25
      return `hsl(${hue}, ${saturation}%, ${lightness}%)`
    }
    return 'white'
  }

  private static drawColor(
    canvasPainterOptions: CanvasPainterOptions,
    context: CanvasRenderingContext2D,
    cell: Cell,
    grid: Grid,
    x1: number,
    y1: number,
    x2: number,
    y2: number
  ) {
    const cellColor = this.cellColor(cell, grid, canvasPainterOptions.hue)
    context.beginPath()
    context.fillStyle = cellColor
    context.fillRect(x1, y1, x2, y2)
    context.closePath()
  }

  private static drawGoal(
    canvasPainterOptions: CanvasPainterOptions,
    cell: Cell,
    grid: Grid,
    context: CanvasRenderingContext2D,
    x1: number,
    x2: number,
    y1: number,
    y2: number
  ) {
    if (canvasPainterOptions.displayGoal && cell === grid.distances.max()) {
      context.beginPath()
      if (canvasPainterOptions.displayColorMap) {
        context.fillStyle = '#FFFFFFFF'
      } else {
        context.fillStyle = '#000000FF'
      }
      const fontSize = Math.max(canvasPainterOptions.cellHeight, canvasPainterOptions.cellWidth) - 2
      context.font = 'bold ' + fontSize + 'px sans-serif'
      context.textAlign = 'center'
      context.textBaseline = 'middle'
      context.fillText('G', x1 + (x2 - x1) / 2, y1 + (y2 - y1) / 2)
      context.closePath()
    }
  }

  private static drawPath(
    canvasPainterOptions: CanvasPainterOptions,
    cell: Cell,
    grid: Grid,
    context: CanvasRenderingContext2D,
    x1: number,
    x2: number,
    y1: number,
    y2: number
  ) {
    if (
      canvasPainterOptions.displayPath &&
      cell !== grid.distances.start &&
      cell !== grid.distances.max() &&
      grid.breadcrumbs.getDistance(cell) !== undefined
    ) {
      const neighbors = cell.neighbors()
      for (const neighbor of neighbors) {
        if (cell.isLinked(neighbor) && grid.breadcrumbs.getDistance(neighbor) !== undefined) {
          let xDest
          if (cell.column > neighbor.column) {
            xDest = x1
          } else if (cell.column < neighbor.column) {
            xDest = x2
          } else {
            xDest = x1 + (x2 - x1) / 2
          }
          let yDest
          if (cell.row > neighbor.row) {
            yDest = y1
          } else if (cell.row < neighbor.row) {
            yDest = y2
          } else {
            yDest = y1 + (y2 - y1) / 2
          }
          context.beginPath()
          if (canvasPainterOptions.displayColorMap) {
            context.strokeStyle = '#FFF'
          } else {
            context.strokeStyle = '#111'
          }
          context.moveTo(x1 + (x2 - x1) / 2, y1 + (y2 - y1) / 2)
          context.lineTo(xDest, yDest)
          context.stroke()
          context.closePath()
        }
      }
    }
  }

  private static drawStart(
    canvasPainterOptions: CanvasPainterOptions,
    cell: Cell,
    grid: Grid,
    context: CanvasRenderingContext2D,
    x1: number,
    x2: number,
    y1: number,
    y2: number
  ) {
    if (canvasPainterOptions.displayStart && cell === grid.distances.start) {
      context.beginPath()
      context.fillStyle = '#000000FF'
      const fontSize = Math.max(canvasPainterOptions.cellHeight, canvasPainterOptions.cellWidth) - 2
      context.font = 'bold ' + fontSize + 'px sans-serif'
      context.textAlign = 'center'
      context.textBaseline = 'middle'
      context.fillText('S', x1 + (x2 - x1) / 2, y1 + (y2 - y1) / 2)
      context.closePath()
    }
  }

  private static drawWalls(
    cell: Cell,
    context: CanvasRenderingContext2D,
    x1: number,
    y1: number,
    x2: number,
    y2: number
  ) {
    context.beginPath()
    context.lineCap = 'round'
    context.lineJoin = 'round'
    context.lineWidth = 2
    context.strokeStyle = '#000'
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
    context.closePath()
  }
}

export default CanvasPainter
