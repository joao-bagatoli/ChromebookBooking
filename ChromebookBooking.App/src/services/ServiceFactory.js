import CabinetService from "./CabinetService";
import UserService from "./UserService";
import SectionService from "./SectionService";
import BookingService from "./BookingService";
import ClassPeriodService from "./ClassPeriodService";
export default class ServiceFactory {
    httpClient;
    baseUrl;
    constructor(httpClient, baseUrl) {
        this.httpClient = httpClient;
        this.baseUrl = baseUrl;
    }
    createUserService() {
        return new UserService(this.httpClient, this.baseUrl);
    }
    createSectionService() {
        return new SectionService(this.httpClient, this.baseUrl);
    }
    createCabinetService() {
        return new CabinetService(this.httpClient, this.baseUrl);
    }
    createBookingService() {
        return new BookingService(this.httpClient, this.baseUrl);
    }
    createClassPeriodService() {
        return new ClassPeriodService(this.httpClient, this.baseUrl);
    }
}
