interface Weather {
  id: number
  main: string
  description: string
  icon: string
}

interface City {
  id: number
  name: string
  country: string
}

interface WeatherHourly {
  dt: string,
  main: {
    temp: number
    feels_like: number
    temp_min: number
    temp_max: number
    pressure: number
    sea_level: number
    grnd_level: number
    humidity: number
  }
  weather: Weather[]
  clouds: {
    all: number
  }
  wind: {
    speed: number
    deg: number
    gust: number
  }
  visibility: number
  dt_txt: string
}

interface OverallInfo {
  list: WeatherHourly[]
  city: City
 
}

export default OverallInfo;