/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react';
import { fetchHeroes } from '../services/api';
import './HeroList.css';

const HeroList: React.FC<{ onSelect: (id: number) => void }> = ({ onSelect }) => {
  const [heroes, setHeroes] = useState<any[]>([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchHeroes(page).then(data => setHeroes(data.results));
  }, [page]);

  const loadMore = () => setPage(prev => prev + 1);

  return (
    <div className='container'>
      <ul className="hero-list">
        {heroes.map(hero => (
          <li key={hero.id} onClick={() => onSelect(hero.id)}>
            {hero.name}
          </li>
        ))}
        <button className="load-more" onClick={loadMore}>Load More</button>
      </ul>

    </div>
  );
};

export default HeroList;
