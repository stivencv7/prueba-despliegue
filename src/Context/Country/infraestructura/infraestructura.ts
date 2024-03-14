import { inject, injectable } from "inversify";
import { CountryRepository } from "../domain/domain";
import type { HttpRepository } from "@/apps/Shared/Http";
import { environment } from "@/apps/Shared/Http/environments/environment.dev";

@injectable()
export class HttpCountryRepository implements CountryRepository {
  // private readonly path = "/";

  constructor(
    @inject("HttpRepository")
    private readonly httpRepository: HttpRepository
  ) {}

  async getToken(): Promise<any[]> {
    const response = await this.httpRepository.getToken<any[]>(
      "/getaccesstoken",
      {
        headers: environment.country.headers,
      }
    );
    return response;
  }

  async findCountry(): Promise<any[]> {
    const _token: any = await this.getToken();
    const response = await this.httpRepository.get<any[]>("/countries", {
      headers: {
        Authorization: `Bearer ${_token?.auth_token}`,
        Accept: "application/json",
      },
    });

    return response;
  }

  async findState(country?: string): Promise<any[]> {
    const _token: any = await this.getToken();
    const response = await this.httpRepository.get<any[]>(
      `/states/${country}`,
      {
        headers: {
          Authorization: `Bearer ${_token?.auth_token}`,
          Accept: "application/json",
        },
      }
    );
    return response;
  }

  async findCity(city?: string): Promise<any[]> {
    const _token: any = await this.getToken();
    const response = await this.httpRepository.get<any[]>(`/cities/${city}`, {
      headers: {
        Authorization: `Bearer ${_token?.auth_token}`,
        Accept: "application/json",
      },
    });
    return response;
  }
}
