import React from 'react';
import Item from './components/Item/Item'
import Header from './components/Header/Header';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  return (
    <div className="App">
      <Header />
      <Item />
    </div>
  );
};

export default App;