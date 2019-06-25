import Entity from './Entity'
import Vector from './Vector'

export default class Player extends Entity {
  constructor(props) {
    super(props)

    const {position, direction} = props
    this.position = position
    this.direction = direction
    this.speed = 8 // todo: add width and height based on tile
  }

  movable = true
  tilename = 'knight_f_run_anim'

  hasBeenPositioned() {
    this.direction = new Vector(0, 0)
  }
}