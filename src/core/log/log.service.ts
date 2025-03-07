export class LoggerService {
  private name: string | undefined

  constructor(name: string = 'LoggerService') {
    if (name) this.name = `[${name}]`
  }

  log = (message: string, ...args: unknown[]): void => {
    message = `${this.name} ${message}`

    return console.log(message, ...args)
  }
}
