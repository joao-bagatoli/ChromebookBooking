import type IHttpClient from '../http/IHttpClient'
import type { User, UserRole, LoggedUser } from '../types/user'

export default class UserService {
  constructor(private readonly httpClient: IHttpClient, private readonly baseUrl: string) { }

  async getAllUsers(): Promise<User[]> {
    return await this.httpClient.get(`${this.baseUrl}/users`)
  }

  async getUserById(id: number): Promise<User> {
    return await this.httpClient.get(`${this.baseUrl}/users/${id}`)
  }

  async createUser(name: string, email: string, role: UserRole, sectionIds: number[]): Promise<User> {
    return await this.httpClient.post(`${this.baseUrl}/users`, { name, email, role, sectionIds })
  }

  async updateUser(id: number, payload: { name: string, role: UserRole, isActive: boolean, sectionIds: number[] }): Promise<void> {
    return await this.httpClient.put(`${this.baseUrl}/users/${id}`, payload)
  }

  async getLoggedUser(): Promise<LoggedUser> {
    return await this.httpClient.get(`${this.baseUrl}/users/me`)
  }

  async deleteUser(id: number): Promise<void> {
    return await this.httpClient.delete(`${this.baseUrl}/users/${id}`)
  }

}
