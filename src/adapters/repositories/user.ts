import UserDataStore from '~/src/drivers/datastore/user'

export default interface UserRepository {
  list(): Promise<UserDataStructure[]>
  findOne(name: string): Promise<UserDataStructure | null>
}

export interface UserDataStructure {
  id: number
  name: string
  score: number
}

export class UserGateway implements UserRepository {
  private store: UserDataStore

  public constructor(store: UserDataStore) {
    this.store = store
  }

  public async list() {
    const res = await this.store.list()
    return res.map((i): UserDataStructure => ({
      id: i.id || 0,
      name: i.name || '',
      score: i.score || 0
    }))
  }

  public async findOne(name: string) {
    const res = await this.store.findOne(name)
    return res ? {
      id: res.id || 0,
      name: res.name || '',
      score: res.score || 0
    } : null
  }
}
