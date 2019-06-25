import Handler from './Handler'
import Vector from './Vector'

export default class Positioner extends Handler {
  handle(tools, ext, services) {
    const { now, timestamp } = ext
    services.scene.getObjects().forEach(object => {
      if (object.movable) {
        const ratio = (now - timestamp) / 100
        let direction = new Vector(object.direction.x * ratio, object.direction.y * ratio)

        services.scene.getWalls().forEach(wall => {
          /* if (!env.collidable) {
            return
          } */

          const px = object.position.x + direction.x
          const py = object.position.y + direction.y
          const {x:cx, y:cy} = wall
          const isColliding = px + 14 >= cx && px <= cx + 14 && // todo: calculate according to tile size or use hitbox later
                              py + 16 >= cy && py <= cy + 5
          
          if (isColliding) {
            direction = new Vector(0 , 0)
          }
        })


        object.position = object.position.add(direction)
        object.hasBeenPositioned && object.hasBeenPositioned()
      }
    })
  }
}