
import React, { useState, useEffect } from 'react';
import './App.css';

const DEFAULT_LAYOUT = [
  { id: 1, type: 'module1', image: 'module1.png', top: 10, left: 10, color: '#ff0000' },
  { id: 2, type: 'module2', image: 'module2.png', top: 100, left: 100, color: '#00ff00' },
];

const App = () => {
  const [modules, setModules] = useState(DEFAULT_LAYOUT);

  useEffect(() => {
    // Saving layout configuration to localStorage
    localStorage.setItem('dashboardLayout', JSON.stringify(modules));
  }, [modules]);

  const handleDragStart = (e, id) => {
    e.dataTransfer.setData('text/plain', id.toString());
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const moduleId = parseInt(e.dataTransfer.getData('text/plain'));
    const { clientX, clientY } = e;

    // Updating module position
    setModules((prevModules) =>
      prevModules.map((module) =>
        module.id === moduleId
          ? { ...module, top: clientY - 30, left: clientX - 30 }
          : module
      )
    );
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleColorChange = (id, color) => {
    setModules((prevModules) =>
      prevModules.map((module) =>
        module.id === id ? { ...module, color } : module
      )
    );
  };

  const addModule = (type, image) => {
    const newModule = {
      id: modules.length + 1,
      type,
      image,
      top: 50,
      left: 50,
      color: '#ff4444', // Default color
    };

    setModules((prevModules) => [...prevModules, newModule]);
  };

  const resetLayout = () => {
    setModules(DEFAULT_LAYOUT);
  };

  return (
    <div className="app" onDrop={handleDrop} onDragOver={handleDragOver}>
      <div className='btn-box'>
        <button className='module-btn1' onClick={() => addModule('module3', 'module3.png')}>Add Module 3</button>
        <button className='module-btn3' onClick={resetLayout}>Reset Layout</button></div>
      <div className="dashboard">
        {modules.map((module) => (
          <div
            key={module.id}
            className="module"
            style={{
              top: module.top,
              left: module.left,
              backgroundColor: module.color,
              backgroundImage: `url(${module.image})`, // Seting module image
            }}
            draggable
            onDragStart={(e) => handleDragStart(e, module.id)}
          >
            {module.type}
            <input
              type="color"
              className='module-input'
              value={module.color}
              onChange={(e) => handleColorChange(module.id, e.target.value)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
