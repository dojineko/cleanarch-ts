import fs from 'fs'
import UserDataStore from '~/src/drivers/datastore/user'
import { UserDataStructure } from '~/src/adapters/repositories/user'

export default class UserJsonDataStore implements UserDataStore {
  private source: string

  constructor(source: string) {
    this.source = source
  }

  private loadData() {
    const raw: { users?: Partial<UserDataStructure>[] } = JSON.parse(fs.readFileSync(this.source).toString())
    if (!raw.users) {
      throw new Error('user json is invalid')
    }
    return raw.users
  }

  public async list(): Promise<UserDataStructure[]> {
    const users = this.loadData().map((i): UserDataStructure => ({
      id: i.id || 0,
      name: i.name || '',
      score: i.score || 0
    }))
    return users
  }

  public async findOne(name: string): Promise<UserDataStructure | null> {
    const user = this.loadData().find((i) => i.name === name)
    return user ? {
      id: user.id || 0,
      name: user.name || '',
      score: user.score || 0,
    } : null
  }
}
