import UserReadUsecase, { UserReadUsecaseResponse } from '~/src/applications/usecases/user_read'
import UserListUsecase, { UserListUsecaseResponse } from '~/src/applications/usecases/user_list'

export type UserReadControllerResponse = UserReadUsecaseResponse
export type UserListControllerResponse = UserListUsecaseResponse

export default class UserController {
  private readUsecase: UserReadUsecase
  private listUsecase: UserListUsecase

  public constructor(readUsecase: UserReadUsecase, listUsecase: UserListUsecase) {
    this.readUsecase = readUsecase
    this.listUsecase = listUsecase
  }

  public async read(name: string): Promise<UserReadControllerResponse> {
    const res = await this.readUsecase.execute({ name })
    return res
  }

  public async list(): Promise<UserListControllerResponse> {
    const res = await this.listUsecase.execute()
    return res
  }
}
