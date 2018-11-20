import React, {Component} from 'react';
import albumData from './../data/albums';
import PlayerBar from './PlayerBar';
import './../styles/Album-style.css';


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
            volume: 1
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
            },
            volumechange: e => {
                this.setState({
                    volume: this.audioElement.volume
                })
            }
        };
        this.audioElement.addEventListener('timeupdate', this.eventListeners.timeupdate);
        this.audioElement.addEventListener('durationchange', this.eventListeners.durationchange);
        this.audioElement.addEventListener('volumechange', this.eventListeners.volumechange);
    }

    componentWillUnmount() {
        this.audioElement.src = null;
        this.audioElement.removeEventListener('timeupdate', this.eventListeners.timeupdate);
        this.audioElement.removeEventListener('durationchange', this.eventListeners.durationchange);
        this.audioElement.removeEventListener('volumechange', this.eventListeners.volumechange);
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

    handleAlbumPlayClick() {
        this.setSong(this.state.album.songs[0]);
        this.play();
    }

    handleAlbumShuffleClick() {
        const random = Math.floor(Math.random() * this.state.album.songs.length);
        this.setSong(this.state.album.songs[random]);
        this.play();
    }

    handlePrevClick() {
        const currentIndex = this.state.album.songs.findIndex(song => this.state.currentSong === song);
        const newIndex = Math.max(0, currentIndex - 1);
        const newSong = this.state.album.songs[newIndex];
        console.log(this.state.album.songs[newIndex]);
        this.setSong(newSong);
        this.play();
    }

    handleNextClick() {
        const currentIndex = this.state.album.songs.findIndex(song => this.state.currentSong === song);
        console.log(currentIndex);
        console.log((this.state.album.songs.length) - 1);
        const newIndex =  (currentIndex >= (this.state.album.songs.length) - 1) ? 0 : currentIndex+1; 
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

    handleVolumeChange(e){
        this.setState({volume: e.target.value})
        this.audioElement.volume = e.target.value;
    }

    handleMouseEnter(song) {
        this.setState({hoverSong: song})
        this.songNum(song);
    }
        
    formatTime(time){
        time = Math.floor(time);
        const seconds = time % 60;
        if(time < 3600){
            const minutes = Math.floor(time / 60);
            const result = minutes + (9 < seconds ? ':' : ':0') + seconds;
            if(isNaN(time)){
                return "0:00";
            }else{
                return result;
            }
        }
        else{
            const hours = Math.floor(time / 3600);
            const minutes = (Math.floor(time/60)) % 60;
            const result = hours + ":" + minutes + (9 < seconds ? ':' : ':0') + seconds;
            if (isNaN(time)) {
                return "0:00";
            } else {
                return result;
            }
        }
    }

    getAlbumTime(){
        const album = this.state.album;
        const songs = album.songs;
        let total = 0;
        for(let i = 0; i<songs.length; i++){
            total += parseInt(songs[i].duration, 10);
        }
        return this.formatTime(total);
    }

    getAlbumDate(string){
        const firstWord = string.replace(/ .*/,'');
        return firstWord; 
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

    highlight(song){
        if (this.state.isPlaying && (this.state.currentSong === song))
            return <span>{song.title}</span>;
        else
            return song.title;
    }

    highlightOrNot(song){
        if (this.state.isPlaying && (this.state.currentSong === song)){
           return "song-row-highlighted";
        }
        else{
            return "song-row";
        }
    }

    albumBackgroundImage(){
        const albumImage = {
            background: 'url(' + this.state.album.albumCover + ') center right no-repeat',
            backgroundSize : 'cover',
            backgroundAttachment: 'fixed'
        }
        return albumImage;
    }
    
    render(){ 
          
       return(
        < section id = "album-container">
            <div id="back-image" style = {this.albumBackgroundImage()}></div>
            <div id="blur-overlay"></div>
            <div id="album">
                <section id="album-info">
                    <img id="album-cover-art-big" src={this.state.album.albumCover} alt={this.state.album.title}/>
                    <div id="album-details">
                        <h1 id="album-title">{this.state.album.title}</h1>
                        <h2 id="artist">{this.state.album.artist}</h2>
                        
                         <div id="release-info-container">
                            <div id="album-time">{this.getAlbumTime()}</div>
                            <div id="album-date">{ this.getAlbumDate(this.state.album.releaseInfo)}</div>
                            <div id="album-length">{this.state.album.songs.length} SONGS</div>
                        </div>
                        
                        <div id="play-shuffle-buttons">
                            <button className="play" onClick={() => this.handleAlbumPlayClick()}>Play</button>
                            <button className="shuffle" onClick={() => this.handleAlbumShuffleClick()}>Shuffle</button>
                        </div>
                        <div id="release-info">{this.state.album.releaseInfo}</div>
                    </div>
                </section>
                <table id="song-list">
                    <thead>
                        <tr className="song-row-head">
                            <th className="track-index-head">#</th>
                            <th className="title-head">TITLE</th>
                            <th className="time-head">TIME</th>
                        </tr>
                    </thead>
                    <tbody id="song-table">
                        {this.state.album.songs.map((song, index) =>
                            <tr className={this.highlightOrNot(song)} key={index} 
                            onMouseEnter={() => this.handleMouseEnter(song)}
                            onMouseLeave={() => this.setState({hoverSong: null})}
                            onClick={() => this.handleSongClick(song)}>
                                <td className="track-index">
                                    {this.songNum(song, index)}
                                </td>
                                <td className="title">{this.highlight(song)}</td>
                                <td className="time">{this.formatTime(song.duration)}</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            <PlayerBar
                albumCover={this.state.album.albumCover}
                albumTitle={this.state.album.title}
                albumArtist={this.state.album.artist}
                track={this.state.currentSong.title}
                isPlaying={this.state.isPlaying}
                currentSong={this.state.currentSong}
                currentTime={this.formatTime(this.audioElement.currentTime)}
                currentTimeNum={this.audioElement.currentTime}
                duration={this.formatTime(this.audioElement.duration)}
                durationNum={this.audioElement.duration}
                volume={this.audioElement.volume}
                handleSongClick={() => this.handleSongClick(this.state.currentSong)}
                handlePrevClick={() => this.handlePrevClick()}
                handleNextClick={() => this.handleNextClick()}
                handleTimeChange={(e) => this.handleTimeChange(e)}
                handleVolumeChange={(e) => this.handleVolumeChange(e)}
            />
        </section>
       );
    } 
}

export default Album;