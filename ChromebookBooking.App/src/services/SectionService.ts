import type IHttpClient from '../http/IHttpClient'
import type { Section } from '../types/section'

export default class SectionService {
  constructor(private readonly httpClient: IHttpClient, private readonly baseUrl: string) { }

  async getAllSections(): Promise<Section[]> {
    return await this.httpClient.get(`${this.baseUrl}/sections`)
  }
}
