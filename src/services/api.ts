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
