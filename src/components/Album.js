import React, {Component} from 'react';
import albumData from './../data/albums';
import PlayerBar from './PlayerBar';
import './Album-style.css';


class Album extends Component{
    constructor(props){
        super(props);

        const album = albumData.find( album => {
            return album.slug === this.props.match.params.slug
        });

        this.state = {
            album: album,
            currentSong: album.songs[0],
            isPlaying: false,
            hoverSong: null,
            currentTime: 0,
            duration: album.songs[0].duration, 
            
        };
        this.audioElement = document.createElement('audio');
        this.audioElement.src = album.songs[0].audioSrc;
    }

    play() {
        this.audioElement.play();
        this.setState({
            isPlaying: true
        });
    }

    pause() {
        this.audioElement.pause();
        this.setState({
            isPlaying: false
        });
    }

    componentDidMount() {
        this.eventListeners = {
            timeupdate: e => {
                this.setState({
                    currentTime: this.audioElement.currentTime
                });
            },
            durationchange: e => {
                this.setState({
                    duration: this.audioElement.duration
                });
            }
        };
        this.audioElement.addEventListener('timeupdate', this.eventListeners.timeupdate);
        this.audioElement.addEventListener('durationchange', this.eventListeners.durationchange);
    }

    componentWillUnmount() {
        this.audioElement.src = null;
        this.audioElement = null;
        this.audioElement.removeEventListener('timeupdate', this.eventListeners.timeupdate);
        this.audioElement.removeEventListener('durationchange', this.eventListeners.durationchange);
    }

    setSong(song){
        this.audioElement.src = song.audioSrc;
        this.setState({
            currentSong: song
        });
    }

    handleSongClick(song) {
        const isSameSong = this.state.currentSong === song;
        if (this.state.isPlaying && isSameSong) {
            this.pause();
        } else {
            if (!isSameSong) {
                this.setSong(song);
            }
            this.play();
        }
    }

    handlePrevClick() {
        const currentIndex = this.state.album.songs.findIndex(song => this.state.currentSong === song);
        const newIndex = Math.max(0, currentIndex - 1);
        const newSong = this.state.album.songs[newIndex];
        this.setSong(newSong);
        this.play();
    }

    handleNextClick() {
        const currentIndex = this.state.album.songs.findIndex(song => this.state.currentSong === song);
        console.log(currentIndex);
        console.log((this.state.album.songs.length) - 1);
        const newIndex =  (currentIndex >= (this.state.album.songs.length) - 1) ? 0 : currentIndex+1; //could have used Math.min but wanted loopability
        const newSong = this.state.album.songs[newIndex];
        this.setSong(newSong);
        this.play();
    }

    handleTimeChange(e) {
        const newTime = this.audioElement.duration * e.target.value;
        this.audioElement.currentTime = newTime;
        this.setState({
            currentTime: newTime
        });
    }

    handleMouseEnter(song) {
        this.setState({hoverSong: song})
        this.songNum(song);
    }

    songNum(song, index){
        const pauseIcon = this.state.isPlaying && (this.state.currentSong === song);

        if (pauseIcon) { 
            return (<span id="pauseIcon"></span>);
        }
        else if (!pauseIcon && (this.state.hoverSong === song)) {
            return (<span id="playIcon"></span>);
        }else{
            return (<span>{index + 1}</span>);
        }
    }
        
    
    
    render(){   
       return(
        <section className="album">
            <section id="album-info">
                <img id="album-cover-art" src={this.state.album.albumCover} alt={this.state.album.title}/>
                <div className="album-details">
                    <h1 id="album-title">{this.state.album.title}</h1>
                    <h2 className="artist">{this.state.album.artist}</h2>
                    <div id="release-info">{this.state.album.releaseInfo}</div>
                </div>
            </section>
            <table id="song-list">
                <colgroup>
                    <col id="song-number-column" />
                    <col id="song-title-column" />
                    <col id="song-duration-column" />
                </colgroup>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Title</th>
                        <th>Time</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.album.songs.map((song, index) =>
                        <tr id="song-row" key={index} 
                        onMouseEnter={() => this.handleMouseEnter(song)}
                        onMouseLeave={() => this.setState({hoverSong: null})}
                        onClick={() => this.handleSongClick(song)}>
                            <td>
                                {this.songNum(song, index)}
                            </td>
                            <td id="title">{song.title}</td>
                            <td>{song.duration}</td>
                        </tr>
                    )}
                </tbody>
            </table>
            <PlayerBar
                isPlaying={this.state.isPlaying}
                currentSong={this.state.currentSong}
                currentTime={this.audioElement.currentTime}
                duration={this.audioElement.duration}
                handleSongClick={() => this.handleSongClick(this.state.currentSong)}
                handlePrevClick={() => this.handlePrevClick()}
                handleNextClick={() => this.handleNextClick()}
                handleTimeChange={(e) => this.handleTimeChange(e)}
            />
        </section>
       );
    } 
}

export default Album;