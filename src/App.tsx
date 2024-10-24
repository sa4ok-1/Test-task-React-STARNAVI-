import React, { useState } from 'react';
import HeroList from './components/HeroList';
import HeroDetails from './components/HeroGraph';
import './App.css';

const App: React.FC = () => {
  const [selectedHeroId, setSelectedHeroId] = useState<number | null>(null);

  return (
    <div className="App">
      <div className="container">
        <div className="character-list">
          <HeroList onSelect={setSelectedHeroId} />
        </div>
        <div className="react-flow-css">
          {selectedHeroId && <HeroDetails id={selectedHeroId} />}
        </div>
      </div>
    </div>
  );
};

export default App;
