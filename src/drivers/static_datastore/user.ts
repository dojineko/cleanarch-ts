import UserDataStore from '~/src/drivers/datastore/user'
import { UserDataStructure } from '~/src/adapters/repositories/user'

export default class UserStaticDataStore implements UserDataStore {
  private readonly userList: UserDataStructure[] = [
    { id: 1, name: 'static1', score: 1 },
    { id: 2, name: 'static2', score: 10 },
    { id: 3, name: 'static3', score: 100 },
  ]

  public async list(): Promise<UserDataStructure[]> {
    return this.userList
  }

  public async findOne(name: string): Promise<UserDataStructure | null> {
    const x = this.userList.find((i) => i.name === name)
    return x || null
  }
}
