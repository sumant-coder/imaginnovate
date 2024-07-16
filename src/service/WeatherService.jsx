import axios from 'axios';

const API_KEY = '1635890035cbba097fd5c26c8ea672a1';
const BASE_URL = 'http://api.openweathermap.org/data/2.5/forecast';

export const getWeatherForecast = async (city) => {
    try {
      const response = await axios.get(BASE_URL, {
        params: {
          q: city,
          appid: API_KEY,
          units: 'metric', 
        },
      });
      return response.data.list.slice(0, 40); 
    } catch (error) {
      console.error('Error fetching weather data:', error);
      throw error;
    }
  };
