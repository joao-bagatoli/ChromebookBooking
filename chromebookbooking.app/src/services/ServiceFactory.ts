import type IHttpClient from "../http/IHttpClient"
import CabinetService from "./CabinetService"

export default class ServiceFactory {
  constructor(private readonly httpClient: IHttpClient, private readonly baseUrl: string) { }

  createCabinetService() {
    return new CabinetService(this.httpClient, this.baseUrl)
  }
}
