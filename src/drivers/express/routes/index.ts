import fs from 'fs'
import path from 'path'
import { Express, Router } from 'express'
import { Controllers } from '~/src/drivers/server'

export default class ExpressServerRouter {
  private app: Express
  constructor(app: Express) {
    this.app = app
  }
  public init(controllers: Controllers) {
    const router = Router()
    router.get('/', (_, res, next) => {
      // FIXME: wild code
      res.send(fs.readFileSync(path.join(process.cwd(), 'data/index.html')).toString())
      next()
    })
    router.get('/list', (_, res, next) => {
      controllers.user.list()
      .then((v) => {
        const users: { name: string, path: string }[] = v.users.map((i) => ({
          name: i.name,
          path: i.path,
        }))
        res.send({ engine: 'express', message: 'it works!', users })
        next()
      })
      .catch((err) => {
        next(err)
      })
    })
    router.get('/profile/:name', (req, res, next) => {
      const name: string = req.params.name
      controllers.user.read(name)
      .then((v) => {
        res.send({ engine: 'express', message: `hello ${v.name}`, name: v.name, isVip: v.isHeavyUser })
        next()
      })
      .catch((err) => {
        next(err)
      })
    })
    this.app.use(router)
  }
}
