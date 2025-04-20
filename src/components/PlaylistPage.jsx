import React from "react";
import {useMusic} from "../ContextApi/MusicContext"

function PlaylistPage() {
    const { currentTrack, setCurrentTrack,currentTrackId } = useMusic();

    if (!currentTrack || !currentTrack.album_images) return null; 

    return (
            <div className="player">
            <div className="player-header">
              
                 <button className="close-btn" onClick={() => setCurrentTrack(null)}>✖</button>
             
               {currentTrack.album_images?.[0]?.url && (
                    <img src={currentTrack.album_images[0].url} alt={currentTrack.name} className="cover-img" />
                )}
                <div className="song-info">
                  <span>songs</span>
                <h2 className="song-title">{currentTrack.name}</h2>
                <p>{currentTrack.artists?.map((artist) => artist.name).join(", ")}</p>  
                </div>
                
            
            </div>
               
                <div className="music-player">
                   
                {currentTrackId && (
                    <iframe
                        src={`https://open.spotify.com/embed/track/${currentTrackId}`}
                        frameBorder="0"
                        allow="encrypted-media"
                        className="spotify-player"
                    />
                )} 
                </div>
               
            </div>
        
    );
}

export default PlaylistPage