import type IHttpClient from "../http/IHttpClient"
import CabinetService from "./CabinetService"
import UserService from "./UserService"
import SectionService from "./SectionService"

export default class ServiceFactory {
  constructor(private readonly httpClient: IHttpClient, private readonly baseUrl: string) { }

  createUserService() {
    return new UserService(this.httpClient, this.baseUrl)
  }

  createSectionService() {
    return new SectionService(this.httpClient, this.baseUrl)
  }

  createCabinetService() {
    return new CabinetService(this.httpClient, this.baseUrl)
  }
}
