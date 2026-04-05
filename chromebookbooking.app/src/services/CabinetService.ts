import type IHttpClient from "../http/IHttpClient";
import type { Cabinet } from "../types/cabinet";

export default class CabinetService {
  constructor(private readonly httpClient: IHttpClient, private readonly baseUrl: string) { }

  async getAllCabinets(): Promise<Cabinet[]> {
    return await this.httpClient.get(`${this.baseUrl}/cabinets`)
  }

  async getCabinetById(id: number): Promise<Cabinet> {
    return await this.httpClient.get(`${this.baseUrl}/cabinets/${id}`)
  }

  async createCabinet(name: string): Promise<Cabinet> {
    return await this.httpClient.post(`${this.baseUrl}/cabinets`, { name })
  }

  async updateCabinet(id: number, name: string): Promise<void> {
    return await this.httpClient.put(`${this.baseUrl}/cabinets/${id}`, { name })
  }

  async activateCabinet(id: number): Promise<void> {
    return await this.httpClient.patch(`${this.baseUrl}/cabinets/${id}/activate`, {})
  }

  async deactivateCabinet(id: number): Promise<void> {
    return await this.httpClient.patch(`${this.baseUrl}/cabinets/${id}/deactivate`, {})
  }

  async deleteCabinet(id: number): Promise<void> {
    return await this.httpClient.delete(`${this.baseUrl}/cabinets/${id}`)
  }
}
