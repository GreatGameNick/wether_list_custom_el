export interface IAPIWeatherSet {
  id: string
  coord: {
    lon: string
    lat: string
  }
  main: {
    temp: string
    feels_like: string
  }
}

export class CardWeatherSet {
  id: string
  lon: string
  lat: string
  temp: string
  'feels temp': string

  constructor(weatherSet: IAPIWeatherSet) {
    this.id = weatherSet.id
    this.lon = weatherSet.coord.lon
    this.lat = weatherSet.coord.lat
    this.temp = weatherSet.main.temp
    this['feels temp'] = weatherSet.main.feels_like
  }

  getForCard() {
    return {
      lon: this.lon,
      lat: this.lat,
      temp: this.temp,
      'feels temp': this['feels temp'],
    }
  }

}

export type TLSCoordinates = Array<(string | number)[]>  // [['lon', 'lat'], ]