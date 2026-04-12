import axios, { type AxiosInstance } from "axios";
import type IHttpClient from "./IHttpClient";

export default class AxiosHttpClient implements IHttpClient {
  private readonly axios: AxiosInstance

  constructor(getToken: () => string | null) {
    this.axios = axios.create()
    this.axios.interceptors.request.use(config => {
      const token = getToken()
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
      return config
    })
  }

  async get<T>(url: string, params?: Record<string, unknown>): Promise<T> {
    const { data } = await this.axios.get<T>(url, { params })
    return data
  }

  async post<T>(url: string, body: unknown): Promise<T> {
    const { data } = await this.axios.post<T>(url, body)
    return data
  }

  async put<T>(url: string, body: unknown, params?: Record<string, unknown>): Promise<void> {
    await this.axios.put<T>(url, body, { params })
  }

  async patch<T>(url: string, body: unknown): Promise<void> {
    await this.axios.patch<T>(url, body)
  }

  async delete<T>(url: string): Promise<void> {
    await this.axios.delete<T>(url)
  }
}
