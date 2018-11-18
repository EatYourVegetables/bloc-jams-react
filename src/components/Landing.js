import React from 'react';
import './../styles/Landing-style.css';
import PlayerBar from './PlayerBar';

const Landing = () => (
    <section id="landing">
        <div id= "logo-container">
            <div id="logo-big">
                <h1>BLOC<span>JAMS</span></h1>
            </div>
            <div id="logo-small">
                <h2>TURN UP THE MUSIC</h2>
            </div>
        </div>
        <div id= "content">
        <section id="selling-points">
        <div id="points-container">
            <div class="point">
                <h2 class="point-title">Choose <span>your</span> music</h2>
                <p class="point-description">Why should you have to listen to music that someone else chose?</p>
                
                <div id="music-container"></div>
            </div>


            
            <div class="point">
                <h2 class="point-title"><span>Ad-free</span> streaming</h2>
                <p class="point-description">No arbitrary limits. No distractions.</p>
                <div id="headphones-container"></div>
            </div>
            

            
            <div class="point">
                <h2 class="point-title"><span>Endless</span> music options</h2>
                <p class="point-description">Have access to one of the biggest and best collection of music out there.</p>
                < div id = "albums-collage-container" ></div>
            
            </div>
        </div>
        <div id="listen-button-section">
            <a href="/library">
                <div id="listen-button-container">
                    <div id="listen-button">Start listening</div>
                </div>
            </a>
        </div>
        </section>
        
        </div>
        <PlayerBar
            />
    </section>
);

export default Landing;