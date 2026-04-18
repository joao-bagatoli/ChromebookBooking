import type IHttpClient from "../http/IHttpClient"
import CabinetService from "./CabinetService"
import UserService from "./UserService"

export default class ServiceFactory {
  constructor(private readonly httpClient: IHttpClient, private readonly baseUrl: string) { }

  createUserService() {
    return new UserService(this.httpClient, this.baseUrl)
  }

  createCabinetService() {
    return new CabinetService(this.httpClient, this.baseUrl)
  }
}
