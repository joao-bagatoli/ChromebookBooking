import type IHttpClient from '../http/IHttpClient'
import type { Section, Shift } from '../types/section'

export default class SectionService {
  constructor(private readonly httpClient: IHttpClient, private readonly baseUrl: string) { }

  async getAllSections(): Promise<Section[]> {
    return await this.httpClient.get(`${this.baseUrl}/sections`)
  }

  async createSection(name: string, shift: Shift): Promise<Section> {
    return await this.httpClient.post(`${this.baseUrl}/sections`, { name, shift })
  }

  async updateSection(id: number, payload: { name: string, shift: Shift, isActive: boolean }): Promise<void> {
    return await this.httpClient.put(`${this.baseUrl}/sections/${id}`, payload)
  }

  async deleteSection(id: number): Promise<void> {
    return await this.httpClient.delete(`${this.baseUrl}/sections/${id}`)
  }
}
