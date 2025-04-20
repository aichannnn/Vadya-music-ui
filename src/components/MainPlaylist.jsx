import React, { useEffect, useState } from 'react';
import { fetchTrendingMusic, getSpotifyToken } from '../Utils/api';
import {useMusic} from "../ContextApi/MusicContext"
import PlaylistPage from './PlaylistPage';
import { useArtistsContext } from '../ContextApi/ArtistsContext';
import ArtistList from './ArtistList';
import { useSelector } from 'react-redux';
import LoginPopup from './LoginPopup.jsx';

function MainPlaylist() {
    const [tracks, setTracks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showAll, setShowAll] = useState(false);
    const [showLoginPopup, setShowLoginPopup] = useState(false);
    const {currentTrack,setCurrentTrack,setCurrentTrackId} = useMusic();
    // const { artistsData } = useArtistsContext();
    const {isAuthenticated} = useSelector(state=>state.auth);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                
                
                const cachedData = localStorage.getItem("trendingTracks");
                if (cachedData) {
                    setTracks(JSON.parse(cachedData));
                    setLoading(false);
                    return;
                }
    
                const token = await getSpotifyToken();
                const music = await fetchTrendingMusic(token, 50);
                
                setTracks(music);
                localStorage.setItem("trendingTracks", JSON.stringify(music)); // Cache results
    
            } catch (err) {
                setError(err.message);
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
    
        fetchData();
    }, []);
    

    // Function to set the selected track for the embedded player
    const playTrack = (track) => {
        if (!isAuthenticated) {
            setShowLoginPopup(true);
            return;
        }
        setCurrentTrack(track);
        setCurrentTrackId(track.id);
    };

     const handleShowAll = () => {
        if (!isAuthenticated) {
            setShowLoginPopup(true);
            return;
        }
        setShowAll(true);
    };

    // Extract artist IDs from tracks
  const artistIds = tracks.flatMap(track => 
    track.artists.map(artist => artist.id)
  );


    if (loading) return <div className="loading">Loading trending songs...</div>;
    if (error) return <div className="error">Error: {error}</div>;
    if (tracks.length === 0) return <div>No tracks found.</div>;

    

    // This will be triggered if an authenticated user has selected a track
    if (isAuthenticated && currentTrack) {
        return <PlaylistPage />;
    }
    const displayedTracks = showAll ? tracks : tracks.slice(0, 5);

    return (
        <div className="trending-container">
            {!showAll ? (
                <>
                    <h2>Trending Songs</h2>
                    <div className="trending-header">
                        <button 
                            className="show-all-btn" 
                            onClick={handleShowAll}
                        >
                            Show All
                        </button>
                    </div>

                    <div className="tracks-grid">
                        {tracks.slice(0, 5).map((track) => (
                            <div 
                                className="track-card" 
                                key={track.id} 
                                onClick={() => playTrack(track)}
                            >
                                <div className="track-image-container">
                                    {track.album_images?.[0]?.url && (
                                        <img src={track.album_images[0].url} alt={track.name} className="track-image" />
                                    )}
                                </div>
                                <div className="track-info">
                                    <h2 className="track-name">{track.name}</h2>
                                    <p className="track-artists">
                                        {track.artists.map((artist) => artist.name).join(", ")}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                
                </>
            ) : (
                <div className="expanded-view">
                    <div className="trending-header">
                        <h2>All Trending Songs</h2>
                        <button 
                            className="show-all-btn show-less" 
                            onClick={() => setShowAll(false)}
                            style={{ marginLeft: 'auto' }}
                        >
                            Show Less
                        </button>
                    </div>

                    <div className="tracks-grid">
                        {tracks.map((track) => (
                            <div 
                                className="track-card" 
                                key={track.id} 
                                onClick={() => playTrack(track)}
                            >
                                <div className="track-image-container">
                                    {track.album_images?.[0]?.url && (
                                        <img src={track.album_images[0].url} alt={track.name} className="track-image" />
                                    )}
                                </div>
                                <div className="track-info">
                                    <h2 className="track-name">{track.name}</h2>
                                    <p className="track-artists">
                                        {track.artists.map((artist) => artist.name).join(", ")}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/*Only show ArtistList if user is logged in */}
             <ArtistList artistIds={artistIds} />

            {/*Show login popup when needed */}
            {showLoginPopup && <LoginPopup onClose={() => setShowLoginPopup(false)} />}
        </div>
    );
}

export default MainPlaylist;
