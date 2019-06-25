export function indexToCoordinates(index, width) {
  return {
    x: (index % width),
    y: Math.floor(index / width)
  }
}