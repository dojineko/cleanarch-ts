import { UserDataStructure } from '~/src/adapters/repositories/user'

export default interface UserDataStore {
  list(): Promise<UserDataStructure[]>
  findOne(name: string): Promise<UserDataStructure | null>
}
