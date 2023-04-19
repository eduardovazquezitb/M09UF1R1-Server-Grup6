const example =
{
  mail: 'email@gmail.com',
  newusername: 'a'
}

export default class UpdateUsernameDto {
  constructor (params) {
    Object.keys(example).forEach(key => {
      this[key] = params[key]
    })
  }

  Equals (object) {
    if (!UpdateUsernameDto.typeOf(object)) {
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
      !Object.prototype.hasOwnProperty.call(object, key)
    )) {
      return false
    }
    return true
  }
}
