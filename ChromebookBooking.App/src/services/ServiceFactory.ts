import type IHttpClient from "../http/IHttpClient"
import CabinetService from "./CabinetService"
import UserService from "./UserService"
import SectionService from "./SectionService"
import BookingService from "./BookingService"
import ClassPeriodService from "./ClassPeriodService"


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

  createBookingService() {
    return new BookingService(this.httpClient, this.baseUrl)
  }

  createClassPeriodService() {
    return new ClassPeriodService(this.httpClient, this.baseUrl)
  }

}
