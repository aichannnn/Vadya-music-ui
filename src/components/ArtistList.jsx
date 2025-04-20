import React, { useEffect, useState } from 'react';
import { useArtistsContext } from '../ContextApi/ArtistsContext';
import { useSelector } from 'react-redux'; 
import LoginPopup from './LoginPopup'; 

const ArtistsList = ({ artistIds = [] }) => {
  const {
    artistsData,
    fetchArtistsData,
    setSelectedArtistId,
    showAllArtists,
    setShowAllArtists,
  } = useArtistsContext();

  const { isAuthenticated } = useSelector(state => state.auth); 
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showLoginPopup, setShowLoginPopup] = useState(false); 

  const validArtistIds = artistIds.filter(id => id && id.trim() !== '');

  useEffect(() => {
    const fetchArtists = async () => {
      if (validArtistIds.length === 0) return;

      try {
        setLoading(true);
        setError(null);

        const uncachedIds = validArtistIds.filter(id => !artistsData[id]);

        if (uncachedIds.length > 0) {
          await fetchArtistsData(uncachedIds);
        }
      } catch (err) {
        console.error('Failed to fetch artists:', err);
        setError('Failed to load artists');
      } finally {
        setLoading(false);
      }
    };

    fetchArtists();
  }, [validArtistIds, artistsData, fetchArtistsData]);

  const allArtists = validArtistIds
    .filter(id => artistsData[id])
    .map(id => artistsData[id])
    .filter((artist, index, self) =>
      index === self.findIndex(a => a.id === artist.id)
    );

  const displayedArtists = showAllArtists ? allArtists : allArtists.slice(0, 5);

  if (loading && allArtists.length === 0) {
    return <div className="loading-spinner">Loading artists...</div>;
  }

  if (error) {
    return (
      <div className="error-message">
        {error}
        <button onClick={() => window.location.reload()}>Retry</button>
      </div>
    );
  }

  if (allArtists.length === 0) {
    return <div className="no-artists">No artists available</div>;
  }

  return (
    <div className="artists-list-container">
      <h2>Popular Artists</h2>

      {/* Show All/Show Less Controls */}
      <div className="view-controls">
        {!showAllArtists && allArtists.length > 5 && (
          <button onClick={() => {
            if (isAuthenticated) {
              setShowAllArtists(true);
            } else {
              setShowLoginPopup(true); 
            }
          }} className="show">
            Show All
          </button>
        )}

        {showAllArtists && (
          <button onClick={() => setShowAllArtists(false)} className="showless">
            Show Less
          </button>
        )}
      </div>

      <div className="artists-grid">
        {displayedArtists.map(artist => (
          <div
            key={artist.id}
            className="artist-card"
            onClick={() => {
              if (isAuthenticated) {
                setSelectedArtistId(artist.id); 
              } else {
                setShowLoginPopup(true); 
              }
            }}
          >
            <div className="artist-image-container">
              <img
                src={artist.images?.[1]?.url || '/default-artist.jpg'}
                alt={artist.name}
                className="artist-image"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = '/default-artist.jpg';
                }}
              />
            </div>
            <div className="artist-info">
              <h3 className="artist-name">{artist.name}</h3>
              {artist.genres?.length > 0 && (
                <p className="artist-genres">
                  {artist.genres.slice(0, 2).join(' • ')}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Render Login Popup */}
      {showLoginPopup && (
        <LoginPopup onClose={() => setShowLoginPopup(false)} />
      )}
    </div>
  );
};

export default ArtistsList;
