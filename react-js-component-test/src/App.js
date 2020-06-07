/*
 * @Author: Lambda
 * @Begin: 2020-06-07 10:22:05
 * @Update: 2020-06-07 11:21:31
 * @Update log: 更新日志
 */ 
import React from 'react';
import logo from './logo.svg';
import { Button, Icon, Menu }  from 'react-ts-component-library'
import './App.css';

function App() {
  return (
    <div className="App">
      <Button btnType="primary">Primary</Button>
      <Icon icon="check-circle" theme="primary" />
      <Menu></Menu> 
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
