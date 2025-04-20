import React, { useEffect, useState } from 'react';
import { useArtistsContext } from '../ContextApi/ArtistsContext';
import { getArtistDetails, getArtistTopTracks, getArtistAlbums, getSpotifyToken } from '../Utils/api';


const ArtistDetails = () => {
  const { selectedArtistId, clearSelectedArtistId } = useArtistsContext();
  const [artist, setArtist] = useState(null);
  const [topTracks, setTopTracks] = useState([]);
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    if (!selectedArtistId) return;

    const fetchDetails = async () => {
      const token = await getSpotifyToken();
      const details = await getArtistDetails(token,selectedArtistId);
      const tracks = await getArtistTopTracks(token, selectedArtistId);
      const albumsData = await getArtistAlbums(token,selectedArtistId);


      setArtist(details);
      setTopTracks(tracks);
      setAlbums(albumsData);
    };

    fetchDetails();
  }, [selectedArtistId]);

  const playAlbum = (album) => {
    if (!album.tracks || album.tracks.length === 0) {
        alert("No tracks available for this album.");
        return;
      }
      
      const firstTrack = album.tracks[0]; // Get first song from album
      window.open(firstTrack.external_urls.spotify, "_blank"); // Open in Spotify
  };

  // Function to play a song on click
  const playTrack = (track) => {
    if (track.external_urls && track.external_urls.spotify) {
      window.open(track.external_urls.spotify, "_blank");
    } else {
      alert("This track is not available on Spotify.");
    }
  };
    

  if (!artist) return <div>Loading...</div>;

  return (
    <div className="artist-details-container">
    {/* Artist Header Section */}
    <div 
      className="artist-banner" 
      style={{ backgroundImage: `url(${artist.images?.[0]?.url})` }}
    >
      <div className="artist-info">
        <h1>{artist.name}</h1>
        <p>{artist.followers.total.toLocaleString()} monthly listeners</p>
        <div className="artist-buttons">
          <button className="play-btn">▶ Play</button>
          <button className="follow-btn">+ Follow</button>
        </div>
      </div>
    </div>

    {/* Top Tracks Section */}
    <div className="tracks-section">
      <h2>Popular</h2>
      <ul className="tracks-list">
        {topTracks.map((track, index) => (
          <li key={track.id} onClick={() => playTrack(track)} className="track-item">
            <span className="track-number">{index + 1}</span>
            <img src={track.album.images?.[0]?.url} alt={track.name} className="track-album-cover" />
            <span className="track-name">{track.name}</span>
            <span className="track-duration">{(track.duration_ms / 60000).toFixed(2)} min</span>
          </li>
        ))}
      </ul>
    </div>

    {/* Albums Section */}
    <h2>Albums</h2>
    <div className="albums-grid">
      {albums.map((album) => (
        <div key={album.id} className="album-item" onClick={() => playTrack(album.tracks[0])}>
          <img src={album.images?.[0]?.url} alt={album.name} className="album-cover" />
          <p className="album-name">{album.name}</p>
        </div>
      ))}
    </div>

    <button className="back-btn" onClick={clearSelectedArtistId}>← Back</button>
  </div>
);
};

export default ArtistDetails;
