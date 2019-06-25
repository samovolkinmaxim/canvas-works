import { indexToCoordinates } from './util'

export default class Scene {
  constructor(tools) {
    const { objects, map } = tools.init

    const walls = []
    const wallLayer = map.layers.find(layer => layer.name.toLowerCase() === 'walls')
    
    if (wallLayer) {
      wallLayer.chunks.forEach(chunk => {
        chunk.data.forEach((id, index) => {
          if (id !== 0) {
            const {x, y} = indexToCoordinates(index, chunk.width)
            walls.push({
              x: chunk.x * 16 + x * 16,
              y: chunk.y * 16 + y * 16
            })
          }
        })
      })
    }

    this.objects = objects
    this.walls = walls
    console.log(walls)
  }

  getObjects() {
    return this.objects
  }

  getWalls() {
    return this.walls
  }
}

