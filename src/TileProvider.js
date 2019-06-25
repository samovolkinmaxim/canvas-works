import tileset_img from './assets/tileset.png'
import tileset_table from './assets/animations.json'
import animated_tiles from './assets/animatedTiles'

export default class TileProvider {
  constructor() { // Promise?
    this.initialized = new Promise((resolve, reject) => {
      this.tiles = new Image()
      this.tiles.onload = () => resolve(this.tiles)
      this.tiles.onerror = () => reject()
      this.tiles.src = tileset_img
    })
    .then(image => {
      this.tileMap = this._initTileMap(this.tiles, 16)
    })

    this.ticker = (function* (step) {
      let timestamp = Date.now()
      let i = 0
      while (true) {
        let now = Date.now()
        if (now - timestamp < step) {
          yield i
        } else {
          timestamp = now
          yield i++
        }
      }
    })(100)
  }

  _initTileMap(image, tileSize) {
    const width = image.width
    const height = image.height

    const tilemap = {}
    let id = 0
    for (let i = 0; i < width; i = i + tileSize) {
      for (let j = 0; j < height; j = j + tileSize) {
        tilemap[++id] = {
          x: j,
          y: i,
          w: tileSize,
          h: tileSize,
          count: animated_tiles[id],
        }
      }
    }

    return tilemap
  }

  getTileData(name) {
    if (tileset_table.hasOwnProperty(name)) {
      const tile = { ...tileset_table[name], tileset: this.tiles }

      if (tile.count && tile.count !== 0) {
        tile.x = tile.x + tile.w * (this.ticker.next().value % tile.count)
      }

      return tile
    }
  }

  getTileById(id) {
    const tile = {...this.tileMap[id],  tileset: this.tiles}

    if (tile.count) {
      tile.x = tile.x + tile.w * (this.ticker.next().value % tile.count)
    }

    return tile
  }
}
