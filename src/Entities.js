import Entity from './Entity'

export class Floor extends Entity {
  get tilename() {
    if (!this._tilename) {
      this._tilename = 'floor_' + Math.floor(Math.random() * 8 + 1)
    }

    return this._tilename
  }
}

export class Wall extends Entity {
  tilename = 'wall_mid'
  collidable = true
}

export class Hole extends Entity {
  tilename = 'hole'
}