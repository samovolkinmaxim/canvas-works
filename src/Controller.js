import Handler from './Handler'

const actions = {
  w: (controlled) => {
    controlled.direction.y = -controlled.speed
  },
  s: (controlled) => {
    controlled.direction.y = controlled.speed
  },
  a: (controlled) => {
    controlled.direction.x = -controlled.speed
  },
  d: (controlled) => {
    controlled.direction.x = controlled.speed
  },
}



export default class Controller extends Handler {
  handle(tools, ext, services) {
    const { controlled } = ext
    const { keyboard } = services

    if (!controlled) {
      return
    }

    keyboard.getPressedKeys().forEach(key => actions[key] && actions[key](controlled))
  }
}