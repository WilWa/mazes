import type Grid from '../Grid'

abstract class BaseGridAlgorithm {
  public abstract on(grid: Grid): void
}

export default BaseGridAlgorithm
