import React, { Component } from 'react';
import {Route, Link} from 'react-router-dom';
import './App.css';
import Landing from './components/Landing.js';
import Library from './components/Library.js';
import Album from './components/Album.js';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header>
          <div id="nav-container">
            <nav id="nav-bar">
              <h1 id="logo">Bl<span></span>c Jams</h1>
              <Link to='/'>Landing </Link>
              <Link to='/library'>Library</Link>
            </nav>
          </div>
        </header>
        <main>
          <Route exact path="/" component={Landing} />
          <Route path="/library" component={Library} />
          <Route path = "/album/:slug" component = {Album} />
        </main>
      </div>
    );
  }
}

export default App;
