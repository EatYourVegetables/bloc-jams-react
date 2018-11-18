 import React, { Component } from 'react';
import './../styles/PlayerBar-style.css';
 
 class PlayerBar extends Component {
   volumeLevel(){
     const volume = this.props.volume;
      if(volume === 0)
        return "icon ion-md-volume-mute"
      else if (volume < .5)
        return "icon ion-md-volume-low"
      else
        return "icon ion-md-volume-high"
  }
  
   render() {
     return (
       <div id="player-bar-container">
        <section className="player-bar">
          <section id="track-info">
              <div id="album-cover">
                  {(this.props.albumCover === undefined)
                    ? <div id="album-cover-art"></div>
                    : <img id="album-cover-art" src={this.props.albumCover} alt={this.props.albumTitle} />
                    }
              </div>
              <div id="track-text-info">
                <p id="track-title">{this.props.track}</p>
                <p id="album-artist">{this.props.albumArtist}</p>
              </div>
          </section>


          <section id="track-control">
              <div id="buttons">
                  <button id="previous" onClick={this.props.handlePrevClick}>
                      <span className="icon ion-md-skip-backward"></span>
                  </button>
                  <button id="play-pause" onClick={this.props.handleSongClick} >
                      <span className={this.props.isPlaying ? 'icon-ion-pause' : 'icon-ion-play'}></span>
                  </button>
                  <button id="next" onClick={this.props.handleNextClick}>
                      <span className="icon ion-md-skip-forward"></span>
                  </button>
              </div>
              <div id="time-and-slider">
                  {(this.props.currentTime === undefined)
                    ? <div id="current-time">0:00</div>
                    : <div id="current-time">{this.props.currentTime}</div>
                  }
                  
                  <input 
                    type="range" 
                    id="seek-bar-track" 
                    value={(this.props.currentTimeNum / this.props.durationNum) || 0} 
                    max="1" 
                    min="0" 
                    step="0.01" 
                    onChange={this.props.handleTimeChange}
                  />   
                  {(this.props.duration === undefined)
                    ? <div id="total-time">0:00</div>
                    : <div id="total-time">{this.props.duration}</div>
                  }
              </div>
          </section>


          <section id="volume-control">
           < div className = {this.volumeLevel()} > </div>
            <input 
              type="range" 
              id="seek-bar-volume" 
              value={this.props.volume} 
              max="1" 
              min="0" 
              step="0.02" 
              onChange={this.props.handleVolumeChange}
            />
          </section>
        </section>
       </div>
     );
   }
 }
 
 export default PlayerBar;