import type IHttpClient from '../http/IHttpClient'
import type { Section } from '../types/section'

export default class SectionService {
  constructor(private readonly httpClient: IHttpClient, private readonly baseUrl: string) { }

  async getAllSections(): Promise<Section[]> {
    return await this.httpClient.get(`${this.baseUrl}/sections`)
  }

  async createSection(name: string): Promise<Section> {
    return await this.httpClient.post(`${this.baseUrl}/sections`, { name })
  }

  async updateSection(id: number, payload: { name: string, isActive: boolean }): Promise<void> {
    return await this.httpClient.put(`${this.baseUrl}/sections/${id}`, payload)
  }
}
