export default interface IHttpClient {
  get<T>(url: string, params?: Record<string, unknown>): Promise<T>
  post<T>(url: string, body: unknown): Promise<T>
  put(url: string, body: unknown, params?: Record<string, unknown>): Promise<void>
  patch(url: string, body: unknown): Promise<void>
  delete(url: string): Promise<void>
}
