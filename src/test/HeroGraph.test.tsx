/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import HeroDetails from '../components/HeroGraph';
import { fetchHeroDetails, fetchVehiclesByFilm } from '../services/api';
import { vi, describe, it, beforeEach, expect } from 'vitest';

vi.mock('../services/api');

const heroDetailsMock = {
    hero: { id: 1, name: 'Luke Skywalker' },
    films: [
        { episode_id: 1, title: 'A New Hope', url: 'https://sw-api.starnavi.io/films/1/' },
        { episode_id: 2, title: 'The Empire Strikes Back', url: 'https://sw-api.starnavi.io/films/2/' }
    ],
    vehicles: [
        { id: 4, name: 'Sand Crawler', url: 'https://sw-api.starnavi.io/vehicles/4/' }
    ]
};

const vehiclesByFilmMock = [
    { id: 4, name: 'Sand Crawler' }
];

describe('HeroDetails', () => {
    beforeEach(() => {
        (fetchHeroDetails as any).mockResolvedValue(heroDetailsMock);
        (fetchVehiclesByFilm as any).mockResolvedValue(vehiclesByFilmMock);
    });

    it('renders hero node and film nodes', async () => {
        render(<HeroDetails id={1} />);

        const heroNode = await screen.findByText('Luke Skywalker');
        expect(heroNode).toBeInTheDocument();

        const filmNodes = await screen.findAllByText(/Film/);
        expect(filmNodes).toHaveLength(heroDetailsMock.films.length);
    });

    it('renders vehicles when a film node is clicked', async () => {
        render(<HeroDetails id={1} />);

        // Wait for film nodes to be rendered
        const filmNode = await screen.findByText('A New Hope');
        fireEvent.click(filmNode);

        const vehicleNode = await screen.findByText('Sand Crawler');
        expect(vehicleNode).toBeInTheDocument();
    });
});
