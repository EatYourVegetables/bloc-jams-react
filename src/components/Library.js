import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import albumData from './../data/albums';
import './../styles/Library-style.css';
import PlayerBar from './PlayerBar';


class Library extends Component {
    constructor(props){
        super(props);
        this.state = {
            albums: albumData
        };
    }

    getAlbumArt(index) {
        const albumImage = {
            background: 'url(' + this.state.albums[index].albumCover + ') center',
            backgroundSize: 'cover',
        }
        return albumImage;
    }

    render(){
        return(
            <section className = 'library'>
                <div id="library-header-container">
                    <div id="library-header"><h1><span>YOUR</span> ALBUMS</h1></div>
                </div>
                <div id="library-grid-container">
                    {
                        this.state.albums.map((album, index) => 
                            <Link to={`/album/${album.slug}`} key={index}>
                                <div className="album-content-container">
                                    <div className="library-album-cover-art" style={this.getAlbumArt(index)}>
                                        <div className="album-overlay"> 
                                            <button className="play">Listen</button>
                                            <span><div>{album.songs.length} SONGS</div></span>
                                        </div>
                                    </div>
                                    <div className="album-info-container">
                                        <div className="library-title">{album.title}</div>
                                        <div className="library-artist">{album.artist}</div>
                                    </div>
                                    {/* */}
                                </div>
                            </Link>
                        )
                    }
                </div>
                <PlayerBar>
                    
                </PlayerBar>
            </section>
        );
    }
}

export default Library;