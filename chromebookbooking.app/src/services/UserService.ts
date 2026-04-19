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

  async createUser(email: string, role: UserRole): Promise<User> {
    return await this.httpClient.post(`${this.baseUrl}/users`, { email, role })
  }

  async activateUser(id: number): Promise<void> {
    return await this.httpClient.patch(`${this.baseUrl}/users/${id}/activate`, {})
  }

  async deactivateUser(id: number): Promise<void> {
    return await this.httpClient.patch(`${this.baseUrl}/users/${id}/deactivate`, {})
  }

  async getLoggedUser(): Promise<LoggedUser> {
    return await this.httpClient.get(`${this.baseUrl}/users/me`)
  }

}
