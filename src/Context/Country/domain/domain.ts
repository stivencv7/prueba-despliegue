export interface CountryRepository {
    getToken(): Promise<any[]>
    findCountry(): Promise<any[]>
    findState(country?: string): Promise<any[]>
    findCity(states?: string): Promise<any[]>
}