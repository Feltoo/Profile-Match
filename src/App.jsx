import React, { useState, useEffect } from 'react';
import './App.css';
import { level1 } from './data/level';

function App() {
  // gridState maps entityId -> { categoryId -> optionId }
  const [gridState, setGridState] = useState({});
  const [activeCell, setActiveCell] = useState(null); // { entityId, categoryId }
  const [lives, setLives] = useState(3);
  const [gameState, setGameState] = useState('playing'); // 'playing', 'won', 'lost'

  const handleCellClick = (entityId, categoryId) => {
    if (gameState !== 'playing') return;
    // Toggle active cell off if clicking the same one
    if (activeCell && activeCell.entityId === entityId && activeCell.categoryId === categoryId) {
      setActiveCell(null);
    } else {
      setActiveCell({ entityId, categoryId });
    }
  };

  const handleOptionSelect = (entityId, categoryId, option) => {
    setActiveCell(null);

    // Check against solution
    const isCorrect = level1.solution[entityId][categoryId] === option.id;

    if (isCorrect) {
      setGridState(prev => ({
        ...prev,
        [entityId]: {
          ...(prev[entityId] || {}),
          [categoryId]: option
        }
      }));
    } else {
      setLives(prev => {
        const newLives = prev - 1;
        if (newLives <= 0) setGameState('lost');
        return newLives;
      });
    }
  };

  // Check for win condition whenever gridState changes
  useEffect(() => {
    let allCorrect = true;
    let totalCells = 0;
    let filledCells = 0;

    level1.entities.forEach(entity => {
      level1.categories.forEach(category => {
        totalCells++;
        const filledOption = gridState[entity.id]?.[category.id];
        if (filledOption) {
          filledCells++;
          if (filledOption.id !== level1.solution[entity.id][category.id]) {
            allCorrect = false;
          }
        } else {
          allCorrect = false;
        }
      });
    });

    if (allCorrect && filledCells === totalCells) {
      setGameState('won');
    }
  }, [gridState]);

  const resetGame = () => {
    setGridState({});
    setActiveCell(null);
    setLives(3);
    setGameState('playing');
  };

  return (
    <div className="app-container">
      <div className="top-bar">
        <div className="level-title">{level1.title}</div>
        <div className="hearts">
          {'❤️'.repeat(lives)}{'🤍'.repeat(3 - lives)}
        </div>
      </div>

      <div className="grid-container">
        <table className="logic-table">
          <thead>
            <tr>
              <th className="category-col"></th>
              {level1.entities.map(entity => (
                <th key={entity.id} className="cat-header">
                  {entity.image ? (
                    <img src={entity.image} alt={entity.label} className="cat-image" />
                  ) : (
                    <span className="cat-emoji">{entity.emoji}</span>
                  )}
                  {entity.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {level1.categories.map(category => (
              <tr key={category.id}>
                <td className="category-col">{category.label}</td>
                {level1.entities.map(entity => {
                  const isActive = activeCell?.entityId === entity.id && activeCell?.categoryId === category.id;
                  const filledOption = gridState[entity.id]?.[category.id];
                  
                  // Specific logic to mimic the screenshot triangles
                  let indicatorClass = '';
                  if (filledOption) {
                    if (category.id === 'element' && filledOption.id === 'e_fire') indicatorClass = 'locked-pink';
                    if (category.id === 'origin' && filledOption.id === 'o_shop') indicatorClass = 'locked-green';
                  }

                  return (
                    <td 
                      key={entity.id} 
                      className={`${isActive ? 'active' : ''} ${indicatorClass}`}
                      onClick={() => handleCellClick(entity.id, category.id)}
                    >
                      <div className="cell-content">
                        {filledOption && (
                          <div className="cell-option solved">
                            {filledOption.emoji && <span>{filledOption.emoji}</span>}
                            <span>{filledOption.label}</span>
                            <span className="solved-check">✔️</span>
                          </div>
                        )}
                      </div>

                      {/* Popover Menu */}
                      {isActive && (
                        <div className="popover-container" onClick={e => e.stopPropagation()}>
                          {category.options.map(opt => {
                            // Don't show options already placed correctly elsewhere?
                            // For simplicity, show all options.
                            return (
                              <button 
                                key={opt.id} 
                                className="popover-btn"
                                onClick={() => handleOptionSelect(entity.id, category.id, opt)}
                              >
                                {opt.emoji && <span className="emoji">{opt.emoji}</span>}
                                <span>{opt.label}</span>
                              </button>
                            )
                          })}
                        </div>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="clues-panel">
        <div className="clues-badge">
          <div className="clues-badge-icon">
            <span style={{ fontSize: '1.4rem' }}>❔</span>
          </div>
          <div className="clues-badge-progress" style={{ 
            width: `calc(40px + ${(
              level1.entities.reduce((acc, entity) => 
                acc + level1.categories.filter(cat => gridState[entity.id]?.[cat.id]?.id === level1.solution[entity.id][cat.id]).length
              , 0) / (level1.entities.length * level1.categories.length)
            ) * 100}%)` 
          }}></div>
          <span className="clues-badge-text">
            Clues: {level1.entities.reduce((acc, entity) => 
              acc + level1.categories.filter(cat => gridState[entity.id]?.[cat.id]?.id === level1.solution[entity.id][cat.id]).length
            , 0)}/{level1.entities.length * level1.categories.length}
          </span>
        </div>
        
        <div className="clues-scroll">
          {level1.clues.map(clue => (
            <div 
              key={clue.id} 
              className={`clue-card ${clue.status === 'highlight' ? 'highlight' : ''}`}
            >
              <div dangerouslySetInnerHTML={{ __html: clue.text }} />
            </div>
          ))}
        </div>
      </div>

      {gameState === 'won' && (
        <div className="overlay">
          <h1 style={{ color: '#2e7d32' }}>You Win! 🎉</h1>
          <button className="btn-restart" onClick={resetGame}>Play Again</button>
        </div>
      )}

      {gameState === 'lost' && (
        <div className="overlay">
          <h1 style={{ color: '#e53935' }}>Game Over 💔</h1>
          <button className="btn-restart" onClick={resetGame}>Try Again</button>
        </div>
      )}
    </div>
  );
}

export default App;
