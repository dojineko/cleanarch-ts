import UserRepository from '~/src/adapters/repositories/user'
import ProfileEntity from '~/src/domains/entities/profile'

export interface UserReadUsecaseRequest {
  name: string
}

export type UserReadUsecaseResponse = {
  id: number
  name: string
  isHeavyUser: boolean
}

export default interface UserReadUsecase {
  execute(req: UserReadUsecaseRequest): Promise<UserReadUsecaseResponse>
}

export class UserReadInteractor implements UserReadUsecase {
  userRepo: UserRepository

  public constructor(userRepo: UserRepository) {
    this.userRepo = userRepo
  }

  public async execute(req: UserReadUsecaseRequest): Promise<UserReadUsecaseResponse> {
    const res = await this.userRepo.findOne(req.name)
    if (!res) {
      throw new Error('user not found')
    }
    const profile = new ProfileEntity(res.name, res.score)
    return {
      id: res.id,
      name: res.name,
      isHeavyUser: profile.isHeavyUser,
    }
  }
}
