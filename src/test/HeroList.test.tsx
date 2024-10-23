/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import HeroList from '../components/HeroList';
import { fetchHeroes } from '../services/api';
import { vi, describe, it, beforeEach, expect } from 'vitest';  // Make sure expect is imported from vitest

vi.mock('../services/api');

const heroesMock = {
  results: [
    { id: 1, name: 'Luke Skywalker', url: 'https://sw-api.starnavi.io/people/1/' },
    { id: 2, name: 'Darth Vader', url: 'https://sw-api.starnavi.io/people/2/' },
  ],
  totalPages: 2,
};

describe('HeroList', () => {
  beforeEach(() => {
    (fetchHeroes as any).mockResolvedValue(heroesMock);  // Use 'any' to bypass TypeScript errors
  });

  it('renders hero list', async () => {
    render(<HeroList onSelect={() => {}} />);
    const heroItems = await screen.findAllByRole('listitem');
    expect(heroItems).toHaveLength(heroesMock.results.length);
  });

  it('calls onSelect with hero id when a hero is clicked', async () => {
    const onSelect = vi.fn();
    render(<HeroList onSelect={onSelect} />);
    const heroItems = await screen.findAllByRole('listitem');
    fireEvent.click(heroItems[0]);
    expect(onSelect).toHaveBeenCalledWith(1);  // Hero ID from mock data
  });

  it('handles pagination', async () => {
    render(<HeroList onSelect={() => {}} />);
    const nextButton = screen.getByText('→');
    expect(nextButton).not.toBeDisabled();
    fireEvent.click(nextButton);
    expect(fetchHeroes).toHaveBeenCalledWith(2);  // New page number
  });
});
