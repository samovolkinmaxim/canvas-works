export default class {
  constructor(props) {
    console.log(props)
    const { entities=[], handlers=[], externals={}, services={}, init } = props

    
    this.externals = {
      ...externals,
      now: Date.now(),
      timestamp: Date.now(),
    }

    this.handlerTools = {
      createEntity: this.createEntity,
      removeEntity: this.removeEntity,
      externals: this.externals,
      init
    }

    this.services = {}
    this.initializers = []
    Object.entries(services).forEach(pair => {
      const key = pair[0]
      const value = pair[1]

      this.services[key] = new value(this.handlerTools, this.externals, this.services)
      const service = this.services[key]
      service.initialized && this.initializers.push(service.initialized)
    })

    Promise.all(this.initializers)
    .then(() => {
      entities.forEach(entity => this.registerEntity(entity.name, entity))
      handlers.forEach(handler => this.registerHandler(handler))
    })
    .then(() => {
      this.initializers = []
      this.initialized = true
    })
  }

  entities = {}
  handlers = []
  instances = []

  registerEntity(name, constructor) {
    if (this.entities.hasOwnProperty(name)) {
      throw new Error(`Entity with the name ${name} already exists`)
    }

    this.entities[name] = constructor
    constructor.hasBeenRegistered(name)

    return name
  }

  createEntity(name, props) {
    const constructor = this.entities[name]
    if (!constructor) {
      throw new Error(`Entity with the name ${name} does'nt exists`)
    }

    const entity = constructor(props)
    this.instances.push(entity)
    entity.hasBeenCreated(this.tools)

    return entity
  }

  removeEntity(ref) { // use Symbol or ref?
    this.instances = this.instances.filter(inst => inst !== ref)
  }

  registerHandler(constructor, role) {
    const handler = new constructor(this.handlerTools, this.externals, this.services)
    this.handlers.push(handler)
    handler.hasBeenRegistered(this.handlerTools, this.externals, this.services)
    return handler
  }

  unregisterHandler(ref) {
    this.handlers = this.handlers.filter(handler => handler !== ref)
  }

  toggleHandlers = () => {
    if (!this.initialized) {
      return
    }
    this.externals.now = Date.now()
    this.handlers.forEach(handler => handler.handle(this.handlerTools, this.externals, this.services))
    this.externals.timestamp = this.externals.now
  }
}
