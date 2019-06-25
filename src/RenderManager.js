import Handler from './Handler'
import Entity from './Entity'
import { indexToCoordinates } from './util'
import map from './assets/map.json'
import animatedTiles from './assets/animatedTiles'

export default class extends Handler {
  constructor(tools, ext, services) {
    super(tools, ext, services)
    const {externals: {height, width, canvas}} = tools

    canvas.height = height
    canvas.width = width
    this.context = canvas.getContext('2d')
    this.context.imageSmoothingEnabled = false
    this.context.scale(2, 2)

    this.buffers = []
    for (let i = 0; i < 4; i++) {
      const outputCanvasCopy = document.createElement('canvas')
      outputCanvasCopy.width = canvas.width
      outputCanvasCopy.height = canvas.height
      const context = outputCanvasCopy.getContext('2d')
      context.imageSmoothingEnabled = false
      this.buffers.push(context)
    }

    this.animated = new Array(this.buffers.length).fill([])

    this.redrawEnviroment = true
  }

  handle = (tools, ext, services) => {
    this.clearContext()
    this.redrawEnviroment && map.layers.forEach((layer, layerIndex) => {
      const context = this.buffers[layerIndex]
      layer.chunks.forEach(chunk => {
        chunk.data.forEach((id, index) => {
          context.save()
          context.translate(-16/2, -16)
          const {x, y} = indexToCoordinates(index, chunk.width)
          const [absoluteX, absoluteY] = [chunk.x*16 + x * 16, chunk.y*16 + y * 16]
          

          const tile = services.tileProvider.getTileById(id)
          if (!tile) {
            context.restore()
            return
          }

          if (tile.count) {
            this.animated[layerIndex].push({
              x: absoluteX,
              y: absoluteY,
              id: id
            })
          }

          this.drawTile(context, tile, absoluteX, absoluteY)
          context.restore()
        })
      })
    })
    this.redrawEnviroment = false

    

    this.buffers.forEach((buffer, index) => {
      
      buffer.save()
      buffer.translate(-16/2, -16)
      this.animated[index].forEach(tileInfo => {
        const tile = services.tileProvider.getTileById(tileInfo.id)
        this.drawTile(buffer, tile, tileInfo.x, tileInfo.y)
      })
      buffer.restore()

      if (index === 3) {
        services.scene.getObjects().forEach(object => {
          if (object instanceof Entity) {
            const context = this.context
            context.save()
            const tile = services.tileProvider.getTileData(object.tilename)
            context.translate(-tile.w/2, -tile.h)
            context.drawImage(tile.tileset, tile.x, tile.y, tile.w, tile.h, object.position.x, object.position.y, tile.w, tile.h)
            
            /* context.strokeStyle = 'red'
            context.strokeRect(object.position.x, object.position.y, tile.w, tile.h) */
            context.restore()
          }
        })
      }

      this.context.drawImage(buffer.canvas, 0, 0)
    })
  }
  
  drawTile = (context, tile, x, y) => {
    context.drawImage(tile.tileset, tile.x, tile.y, tile.w, tile.h, x, y, tile.w, tile.h)
  }

  clearContext() {
    this.context.save()
    this.context.fillStyle = 'grey'
    this.context.fillRect(0, 0, this.context.canvas.width, this.context.canvas.height)
    this.context.restore()
  }
}