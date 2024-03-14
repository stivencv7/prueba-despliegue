import { inject, injectable } from "inversify";
import { environment } from "./environments/environment.dev";
import { HttpRepository, HttpRequestParams } from "./index";

@injectable()
export class FetchClientRepository implements HttpRepository {
  //   private readonly authorization = '';

  constructor(@inject("baseUrl") private readonly baseUrl: string) {}

  async get<T>(url: string, params?: HttpRequestParams): Promise<T> {
    console.log(`${environment.country.baseUrl}${url}`);
    console.log({ ...params?.headers });

    const response = await fetch(`${environment.country.baseUrl}${url}`, {
      method: "GET",
      headers: {
        ...params?.headers,
        "Content-Type": "application/json",
        // Authorization: this.authorization,
      },
      // credentials: "include",
      mode: "cors",
    });    

    const data = await response.json();
    return data;
  }

  async getToken<T>(url: string, params?: HttpRequestParams): Promise<T> {
    let headers = {};

    if (params?.token) {
      headers["Authorization"] = `Bearer ${params?.token}`;
      headers["Accept"] = "application/json";
    }

    const response = await fetch(`${environment.country.baseUrl}${url}`, {
      method: "GET",
      headers: {
        ...params?.headers,
        "Content-Type": "application/json",
        // Authorization: this.authorization,
      },
      // credentials: "include",
      mode: "cors",
    });

    const data = await response.json();
    return data;
  }

  async post<T>(
    url: string,
    body: any,
    params?: HttpRequestParams
  ): Promise<T> {
    // const { headers = {}, } = params;

    const response = await fetch(`${this.baseUrl} + ${url}`, {
      method: "POST",
      headers: {
        ...params?.headers,
        // ...headers,
        "Content-Type": "application/json",
        // Authorization: this.authorization,
      },
      credentials: "include",
      mode: "cors",
      body: JSON.stringify(body),
    });

    const data = await response.json();
    return data;
  }

  async put<T>(url: string, body: any, params?: HttpRequestParams): Promise<T> {

    const response = await fetch(`${this.baseUrl} + ${url}`, {
      method: "PUT",
      headers: {
        ...params?.headers,
        "Content-Type": "application/json",
        // Authorization: this.authorization,
      },
      credentials: "include",
      mode: "cors",
      body: JSON.stringify(body),
    });

    const data = await response.json();
    return data;
  }

  async patch<T>(
    url: string,
    body: any,
    params?: HttpRequestParams
  ): Promise<T> {

    const response = await fetch(`${this.baseUrl} + ${url}`, {
      method: "PATCH",
      headers: {
        ...params?.headers,
        "Content-Type": "application/json",
        // Authorization: this.authorization,
      },
      credentials: "include",
      mode: "cors",
      body: JSON.stringify(body),
    });

    const data = await response.json();
    return data;
  }

  async delete<T>(url: string, params?: HttpRequestParams): Promise<T> {
    const response = await fetch(`${this.baseUrl} + ${url}`, {
      method: "DELETE",
      headers: {
        // ...headers,
        ...params?.headers,
        "Content-Type": "application/json",
        // Authorization: this.authorization,
      },
      credentials: "include",
      mode: "cors",
    });
    const data = await response.json();
    return data;
  }
}
