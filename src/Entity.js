export default class Entity { 
  constructor(props) {
    this.position = props.position
    props.zIndex && (this.zIndex = props.zIndex)
  }

  static hasBeenRegistered(name) {
    console.log(`Entity ${name} has been registered`)
  }

  hasBeenCreated = (tools) => {

  }

  hasBeenRemoved = (tools) => {

  }
}
