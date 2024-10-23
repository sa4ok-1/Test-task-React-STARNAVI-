/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react';
import { fetchHeroes } from '../services/api';
import './style/HeroList.css';

const HeroList: React.FC<{ onSelect: (id: number) => void }> = ({ onSelect }) => {
  const [heroes, setHeroes] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1); // Додаємо стан для кількості сторінок

  useEffect(() => {
    fetchHeroes(page).then(data => {
      setHeroes(data.results);
      setTotalPages(data.totalPages); // Припустимо, що API повертає загальну кількість сторінок
    });
  }, [page]);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  return (
    <><div className='container'>
      <ul className="hero-list">
        {heroes.map(hero => (
          <li key={hero.id} onClick={() => onSelect(hero.id)}>
            {hero.name}
          </li>
        ))}
      </ul>

      {/* Пагінація */}
    </div><div className="pagination">
        <button
          className="pagination-btn"
          disabled={page === 1}
          onClick={() => handlePageChange(page - 1)}
        >
          ←
        </button>

        <button
          className="pagination-btn"
          disabled={page === totalPages}
          onClick={() => handlePageChange(page + 1)}
        >
          →
        </button>
      </div></>
  );
};

export default HeroList;
