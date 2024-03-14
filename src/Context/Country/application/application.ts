import { inject, injectable } from "inversify";
import type { CountryRepository } from "../domain/domain";

@injectable()
export class Country {
  constructor(
    @inject("CountryRepository") private readonly repository: CountryRepository
  ) {}

  async getToken(): Promise<any[]> {
    const country = await this.repository.getToken();
    return country;
  }

  async findCountry(): Promise<any[]> {
    const country = await this.repository.findCountry();
    return country;
  }

  async findState(country?: string): Promise<any[]> {
    const state = await this.repository.findState(country);
    return state;
  }

  async findCity(states?: string): Promise<any[]> {
    const city = await this.repository.findCity(states);
    return city;
  }
}
