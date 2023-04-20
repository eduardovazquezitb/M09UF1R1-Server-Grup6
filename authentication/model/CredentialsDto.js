const example =
{ mail: 'elibi.json', username: 'ibi', password: 'eljuego', superuser: true }

export default class CredentialsDto {
  constructor (params) {
    Object.keys(example).forEach(key => {
      this[key] = params[key]
    })
  }

  Equals (object) {
    if (!CredentialsDto.typeOf(object)) {
      return false
    }
    if (Object.keys(example).some(key =>
      object[key] !== this[key]
    )) {
      return false
    }
    return true
  }

  static typeOf (object) {
    if (!object) {
      return false
    }
    if (Object.keys(example).some(key =>
      !Object.prototype.hasOwnProperty.call(object, key) ||
      typeof (object[key]) !== typeof (example[key])
    )) {
      return false
    }
    return true
  }
}
