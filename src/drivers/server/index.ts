import UserController from '~/src/adapters/controller/user'

export interface Controllers {
  user: UserController
}

export default interface ServerDriver {
  run(): Promise<void>
}
