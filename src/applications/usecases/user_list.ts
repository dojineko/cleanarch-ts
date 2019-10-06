import UserRepository from '~/src/adapters/repositories/user'

export type UserListEntry = {
  id: number
  name: string
  path: string
}

export type UserListUsecaseResponse = {
  users: UserListEntry[]
}

export default interface UserListUsecase {
  execute(): Promise<UserListUsecaseResponse>
}

export class UserListInteractor implements UserListUsecase {
  userRepo: UserRepository

  public constructor(userRepo: UserRepository) {
    this.userRepo = userRepo
  }

  public async execute(): Promise<UserListUsecaseResponse> {
    const res = await this.userRepo.list()
    const users = res.map((i): UserListEntry => ({
      id: i.id,
      name: i.name,
      path: `/profile/${i.name}`,
    }))
    return { users }
  }
}
