import EventBus from "./event-bus"
import { isObject } from "./utils"

class EventStore {
  constructor(options) {
    if (!isObject(options.state)) {
      throw new TypeError("the state must be object type")
    }
    if (options.actions && isObject(options.actions)) {
      const values = Object.values(options.actions)
      for (const value of values) {
        if (typeof value !== "function") {
          throw new TypeError("the value of actions must be a function")
        }
      }
      this.actions = options.actions
    }
    this.state = this.reactive(options.state)
    this.event = new EventBus()
    this.eventV2 = new EventBus()
  }
  reactive(state) {
    return new Proxy(state, {
      get: (target, key) => {
        return Reflect.get(target, key)
      },
      set: (target, key, newValue) => {
        Reflect.set(target, key, newValue)
        this.event.emit(key, newValue)
        this.eventV2.emit(key, { [key]: newValue })
        return true
      },
    })
  }

  onState(stateKey, stateCallback) {
    const keys = Object.keys(this.state)
    if (keys.indexOf(stateKey) === -1) {
      throw new Error("the state does not contain your key")
    }
    this.event.on(stateKey, stateCallback)

    // callback
    if (typeof stateCallback !== "function") {
      throw new TypeError("the event callback must be function type")
    }
    const value = this.state[stateKey]
    stateCallback.apply(this.state, [value])
  }

  // ["name", "age"] callback1
  // ["name", "height"] callback2

  onStates(stateKeys, stateCallback) {
    const keys = Object.keys(this.state)
    const value = {}
    for (const theKey of stateKeys) {
      if (keys.indexOf(theKey) === -1) {
        throw new Error("the state does not contain your key")
      }
      this.eventV2.on(theKey, stateCallback)
      value[theKey] = this.state[theKey]
    }

    stateCallback.apply(this.state, [value])
  }

  offStates(stateKeys, stateCallback) {
    const keys = Object.keys(this.state)
    stateKeys.forEach((theKey) => {
      if (keys.indexOf(theKey) === -1) {
        throw new Error("the state does not contain your key")
      }
      this.eventV2.off(theKey, stateCallback)
    })
  }

  offState(stateKey, stateCallback) {
    const keys = Object.keys(this.state)
    if (keys.indexOf(stateKey) === -1) {
      throw new Error("the state does not contain your key")
    }
    this.event.off(stateKey, stateCallback)
  }

  setState(stateKey, stateValue) {
    this.state[stateKey] = stateValue
  }

  dispatch(actionName, ...args) {
    if (typeof actionName !== "string") {
      throw new TypeError("the action name must be string type")
    }
    if (Object.keys(this.actions).indexOf(actionName) === -1) {
      throw new Error("this action name does not exist, please check it")
    }
    const actionFn = this.actions[actionName]
    actionFn.apply(this, [this.state, ...args])
  }
}

export default EventStore
