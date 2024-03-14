export interface HttpRequestParams {
  headers?: Record<string, any>;
  token?: string;
  query?: Record<string, any>;
  timeout?: number;
}

export interface HttpRepository {
  get<T>(url: string, params?: HttpRequestParams): Promise<T>;
  getToken<T>(url: string, params?: HttpRequestParams): Promise<T>;
  post<T>(url: string, body: any, params?: HttpRequestParams): Promise<T>;
  put<T>(url: string, body: any, params?: HttpRequestParams): Promise<T>;
  patch<T>(url: string, body: any, params?: HttpRequestParams): Promise<T>;
  delete(url: string, params?: HttpRequestParams): Promise<boolean>;
}
