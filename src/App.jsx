import React, { useState, useEffect } from 'react';
import './App.css';
import { level1 } from './data/level';

function App() {
  // gridState maps entityId -> { categoryId -> optionId }
  const [gridState, setGridState] = useState(level1.initialState || {});
  const [activeCell, setActiveCell] = useState(null); // { entityId, categoryId }
  const [lives, setLives] = useState(3);
  const [gameState, setGameState] = useState('playing'); // 'playing', 'won', 'lost'

  const handleCellClick = (entityId, categoryId) => {
    if (gameState !== 'playing') return;
    
    // Check if cell is locked by initial state
    if (level1.initialState?.[entityId]?.[categoryId]) return;

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
    setGridState(level1.initialState || {});
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

                  const isLocked = level1.initialState?.[entity.id]?.[category.id];

                  return (
                    <td 
                      key={entity.id} 
                      className={`${isActive ? 'active' : ''} ${indicatorClass} ${isLocked ? 'locked' : ''}`}
                      onClick={() => handleCellClick(entity.id, category.id)}
                    >
                      <div className="cell-content">
                        {filledOption && (
                          <div className={`cell-option ${isLocked ? 'locked-option' : 'solved'}`}>
                            {isLocked && <span className="lock-icon">🔒</span>}
                            {filledOption.emoji && <span>{filledOption.emoji}</span>}
                            {filledOption.image && <img src={filledOption.image} alt={filledOption.label} className="option-image" />}
                            <span>{filledOption.label}</span>
                            {!isLocked && <span className="solved-check">✔️</span>}
                          </div>
                        )}
                      </div>

                      {/* Popover Menu */}
                      {isActive && (
                        <div className="popover-container" onClick={e => e.stopPropagation()}>
                          {category.options.filter(opt => {
                            // Find if this option is already placed in ANY column for this category
                            const isUsed = Object.values(gridState).some(
                              entityMap => entityMap[category.id]?.id === opt.id
                            );
                            return !isUsed;
                          }).map(opt => (
                              <button 
                                key={opt.id} 
                                className="popover-btn"
                                onClick={() => handleOptionSelect(entity.id, category.id, opt)}
                              >
                                {opt.emoji && <span className="emoji">{opt.emoji}</span>}
                                {opt.image && <img src={opt.image} alt={opt.label} className="popover-image" />}
                                <span>{opt.label}</span>
                              </button>
                          ))}
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
          <div className="clues-badge-track">
            <div className="clues-badge-progress" style={{ 
              width: `${(level1.clues.filter(clue => clue.check && clue.check(gridState)).length / level1.clues.length) * 100}%` 
            }}></div>
          </div>
          <span className="clues-badge-text">
            Clues: {level1.clues.filter(clue => clue.check && clue.check(gridState)).length}/{level1.clues.length}
          </span>
        </div>
        
        <div className="clues-scroll">
          {(() => {
            const unsolvedIndices = level1.clues.map((c, i) => c.check && c.check(gridState) ? -1 : i).filter(i => i !== -1);
            const firstUnsolvedIndex = unsolvedIndices.length > 0 ? unsolvedIndices[0] : level1.clues.length;
            
            return level1.clues.map((clue, index) => {
              const isSolved = clue.check && clue.check(gridState);
              const isVisible = index <= firstUnsolvedIndex + 1; // Always show the first unsolved + one more

              if (!isVisible) return null;

              return (
                <div 
                  key={clue.id} 
                  className={`clue-card ${isSolved ? 'solved' : ''} slide-in`}
                >
                  <div dangerouslySetInnerHTML={{ __html: clue.text }} />
                </div>
              );
            });
          })()}
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
