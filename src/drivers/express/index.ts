import express from 'express'
import ServerDriver, { Controllers } from '~/src/drivers/server'
import Router from './routes'

export default class ExpressDriver implements ServerDriver {
  private app = express()
  private port: number

  constructor(port = 3000, controllers: Controllers) {
    this.port = port
    new Router(this.app).init(controllers)
  }

  async run(): Promise<void> {
    this.app.listen(this.port)
    console.debug('express server running...')
  }
}
