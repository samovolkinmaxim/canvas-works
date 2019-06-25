class Keyboard {
  constructor(tools) {
    this.pressed = []

    // here is a bug with this.pressed overflow
    document.addEventListener('keydown', event => {
      this.pressed.push(event.key)
    })

    document.addEventListener('keyup', event => {
      this.pressed = this.pressed.filter(key => key !== event.key)
    })
  }

  getPressedKeys() {
    return this.pressed
  }
}

export default Keyboard