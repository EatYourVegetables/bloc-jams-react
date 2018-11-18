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
      <div id="main-background"></div>
      <div id="main-background-gradient"></div>
        <header>
          <div id="nav-container">
            <nav id="nav-bar">
              <div id="main-logo-container">
                <div id="main-logo-big">
                  <h1>BLOC<span>JAMS</span></h1>
                </div>
                <div id="main-logo-small">
                    <h2>TURN UP THE MUSIC</h2>
                </div>
              </div>
              <div id="link-container">
                <Link to='/' id="home">Home</Link>
                <Link to='/library' id="library">Library</Link>
              </div>
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
