import type IHttpClient from "../http/IHttpClient"
import CabinetService from "./CabinetService"
import AuthService from "./AuthService"

export default class ServiceFactory {
  constructor(private readonly httpClient: IHttpClient, private readonly baseUrl: string) { }

  createAuthService() {
    return new AuthService()
  }

  createCabinetService() {
    return new CabinetService(this.httpClient, this.baseUrl)
  }
}
