import { CONFIG } from '../../constants/config';
import { WeatherCondition } from '../../types';
import { StorageService, STORAGE_KEYS } from '../storage/storage.service';

export class FMIWeatherService {
  // Fetch current weather for coordinates
  static async getCurrentWeather(
    latitude: number,
    longitude: number
  ): Promise<WeatherCondition> {
    try {
      // Check cache first
      const cached = await this.getCachedWeather();
      if (cached && !this.isCacheExpired(cached.timestamp)) {
        return cached;
      }

      // FMI API request
      const params = new URLSearchParams({
        service: 'WFS',
        version: '2.0.0',
        request: 'getFeature',
        storedquery_id: 'fmi::observations::weather::simple',
        latlon: `${latitude},${longitude}`,
        parameters: 'temperature,windspeedms,humidity,weathersymbol3',
        timestep: '60', // Last hour
      });

      const response = await fetch(`${CONFIG.FMI_API_BASE_URL}?${params}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch weather data');
      }

      const xmlText = await response.text();
      const weather = this.parseWeatherXML(xmlText, latitude, longitude);

      // Cache the result
      await StorageService.save(STORAGE_KEYS.CACHED_WEATHER, weather);

      return weather;
    } catch (error) {
      console.error('Weather fetch error:', error);
      
      // Return cached data if available, even if expired
      const cached = await this.getCachedWeather();
      if (cached) {
        return cached;
      }

      // Return default weather if no cache
      return this.getDefaultWeather();
    }
  }

  private static parseWeatherXML(xmlText: string, lat: number, lon: number): WeatherCondition {
    
    const temp = this.extractValue(xmlText, 'temperature') || 15;
    const wind = this.extractValue(xmlText, 'windspeedms') || 3;
    const humidity = this.extractValue(xmlText, 'humidity') || 70;
    const symbol = this.extractValue(xmlText, 'weathersymbol3') || 1;

    return {
      temperature: temp,
      feelsLike: temp - (wind * 0.7), // Simple wind chill approximation
      description: this.getWeatherDescription(symbol),
      icon: this.getWeatherIcon(symbol),
      humidity: humidity,
      windSpeed: wind,
      timestamp: new Date(),
      isExtreme: this.isExtremeWeather(temp, wind),
    };
  }

  // Extract numeric value from XML
  private static extractValue(xml: string, parameter: string): number | null {
    const regex = new RegExp(`<${parameter}>([^<]+)</${parameter}>`, 'i');
    const match = xml.match(regex);
    return match ? parseFloat(match[1]) : null;
  }

  // Convert FMI weather symbol to description
  private static getWeatherDescription(symbol: number): string {
    const descriptions: { [key: number]: string } = {
      1: 'Clear',
      2: 'Partly cloudy',
      3: 'Cloudy',
      21: 'Light rain showers',
      22: 'Rain showers',
      23: 'Heavy rain showers',
      31: 'Light rain',
      32: 'Rain',
      33: 'Heavy rain',
      41: 'Light snow showers',
      42: 'Snow showers',
      43: 'Heavy snow showers',
      51: 'Light snow',
      52: 'Snow',
      53: 'Heavy snow',
      61: 'Thunderstorm',
      62: 'Heavy thunderstorm',
      63: 'Thunder',
      64: 'Heavy thunder',
      71: 'Light sleet showers',
      72: 'Sleet showers',
      73: 'Heavy sleet showers',
      81: 'Light sleet',
      82: 'Sleet',
      83: 'Heavy sleet',
      91: 'Fog',
      92: 'Fog',
    };
    return descriptions[symbol] || 'Unknown';
  }

  // Convert symbol to icon name
  private static getWeatherIcon(symbol: number): string {
    if (symbol === 1) return 'sunny';
    if (symbol >= 2 && symbol <= 3) return 'partly-sunny';
    if (symbol >= 21 && symbol <= 33) return 'rainy';
    if (symbol >= 41 && symbol <= 53) return 'snow';
    if (symbol >= 61 && symbol <= 64) return 'thunderstorm';
    return 'cloudy';
  }

  // Check weather warnings
  private static isExtremeWeather(temp: number, wind: number): boolean {
    return (
      temp < -15 || // Very cold
      temp > 30 || // Very hot
      wind > 15 // Strong wind (>50 km/h)
    );
  }

  // Get cached weather
  private static async getCachedWeather(): Promise<WeatherCondition | null> {
    const cached = await StorageService.load<WeatherCondition>(STORAGE_KEYS.CACHED_WEATHER);
    if (cached && cached.timestamp) {
      cached.timestamp = new Date(cached.timestamp);
    }
    return cached;
  }

  // Check if cache is expired
  private static isCacheExpired(timestamp: Date): boolean {
    const now = new Date().getTime();
    const cacheTime = new Date(timestamp).getTime();
    return (now - cacheTime) > CONFIG.CACHE.WEATHER_EXPIRY_MS;
  }

  // Default weather when all else fails
  private static getDefaultWeather(): WeatherCondition {
    return {
      temperature: 15,
      feelsLike: 15,
      description: 'Unable to fetch weather',
      icon: 'cloudy',
      humidity: 70,
      windSpeed: 3,
      timestamp: new Date(),
      isExtreme: false,
    };
  }
}