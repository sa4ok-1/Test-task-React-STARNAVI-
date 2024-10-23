/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';

const API_URL = 'https://sw-api.starnavi.io';

export const fetchHeroes = async (page: number) => {
    const response = await axios.get(`${API_URL}/people?page=${page}`);
    return response.data;
};

export const fetchHeroDetails = async (id: number) => {
    const response = await axios.get(`${API_URL}/people/${id}`);
    return response.data;
};

// Fetch vehicles by film ID
export const fetchVehiclesByFilm = async (filmId: number) => {
    const response = await axios.get(`${API_URL}/vehicles`);
    return response.data.results.filter((vehicle: any) => vehicle.films.includes(filmId));
  };
  