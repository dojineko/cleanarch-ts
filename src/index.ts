import path from 'path'
import ServerDriver from './drivers/server'
import KoaDriver from './drivers/koa'
import ExpressDriver from './drivers/express'
import UserController from './adapters/controller/user'
import { UserGateway } from './adapters/repositories/user'
import { UserReadInteractor } from './applications/usecases/user_read'
import { UserListInteractor } from './applications/usecases/user_list'
import UserDataStore from './drivers/datastore/user'
import UserJsonDataStore from './drivers/json_datastore/user'
import UserStaticDataStore from './drivers/static_datastore/user'

(async () => {
  const userDataStore = ((): UserDataStore => {
    const storeType = process.env.STORE_TYPE
    if (storeType === 'json') {
      return new UserJsonDataStore(path.join(process.cwd(), 'data/users.json'))
    }
    if (storeType === 'static') {
      return new UserStaticDataStore()
    }
    throw new Error('unknown store type')
  })()

  const userRepository = new UserGateway(userDataStore)
  const userReadUsecase = new UserReadInteractor(userRepository)
  const userListUsecase = new UserListInteractor(userRepository)
  const controllers = {
    user: new UserController(userReadUsecase, userListUsecase)
  }

  const port = 3000
  const server = ((): ServerDriver => {
    const serverType = process.env.SERVER_TYPE
    if (serverType === 'koa') {
      return new KoaDriver(port, controllers)
    }
    if (serverType === 'express') {
      return new ExpressDriver(port, controllers)
    }
    throw new Error('unknown server type')
  })()

  server.run()
  console.debug(`http://localhost:${port}`)
})()
