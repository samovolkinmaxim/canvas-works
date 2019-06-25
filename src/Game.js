import Engine from './Engine'
import RenderManager from './RenderManager'
import Keyboard from './Keyboard'
import Player from './Player'
import Vector from './Vector'
import Positioner from './Positioner'
import Controller from './Controller'
import TileProvider from './TileProvider'
import Scene from './Scene'
import map from './assets/map.json'

const player = new Player({
  position: new Vector(16*4, 16*8),
  direction: new Vector(0, 0)
})

export default class Game {
  constructor(props) {
    const defaultProps = {
      entities: [],
      handlers: [Controller, Positioner, RenderManager],
      services: {
        keyboard: Keyboard,
        tileProvider: TileProvider,
        scene: Scene,
      },
      externals: {
        height: 700, width: 900, canvas: props.canvas,
        controlled: player,
      },
      init: {
        objects: [ player ],
        map: map,
      }
    }

    const engine = new Engine(defaultProps)

    Object.defineProperties(this, {
      'engine': {
        value: engine,
      },
    })
  }

  start = () => {
    this.engine.toggleHandlers()
    requestAnimationFrame(this.start)
  }
}