import type IHttpClient from '../http/IHttpClient'
import type { ClassPeriod } from '../types/classPeriod'

export default class ClassPeriodService {
  constructor(private readonly httpClient: IHttpClient, private readonly baseUrl: string) { }

  async getAllClassPeriods(): Promise<ClassPeriod[]> {
    return await this.httpClient.get(`${this.baseUrl}/classperiods`)
  }
}
