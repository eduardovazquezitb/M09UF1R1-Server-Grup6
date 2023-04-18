class Credentials {
  constructor (mail, username, password, superuser) {
    this.mail = mail
    this.username = username
    this.password = password
    this.superuser = superuser
  }
}

export class AuthData {
  constructor (mail, password) {
    this.mail = mail
    this.password = password
  }

  Equals (object) {
    if (!object) { return false }
    if (!Object.prototype.hasOwnProperty.call(object, 'mail') || object.mail !== this.mail) { return false }
    if (!Object.prototype.hasOwnProperty.call(object, 'password') || object.password !== this.password) { return false }
    return true
  }
}
