import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './App.css'

import RenderSensorData from './RenderSensorData';
import Publisher from './Publisher';

function App() {
  return (
    <>
      <RenderSensorData />
      <Publisher />
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

export default App;
