// src/ContextApi/ArtistsContext.jsx
import { createContext, useContext, useState, useCallback,useEffect } from 'react';
import { getSpotifyToken, fetchArtistsBatch } from '../Utils/api';

// Create context
const ArtistsContext = createContext();

// Helper functions for localStorage
const getLocalArtists = () => {
    try {
      const stored = localStorage.getItem('spotifyArtists');
      return stored ? JSON.parse(stored) : {};
    } catch (error) {
      console.error('Failed to parse localStorage artists', error);
      return {};
    }
};

const setLocalArtists = (artists) => {
    try {
      localStorage.setItem('spotifyArtists', JSON.stringify(artists));
    } catch (error) {
      console.error('Failed to save artists to localStorage', error);
    }
};

// Context provider component
export const ArtistsProvider = ({ children }) => {
  const [artistsData, setArtistsData] = useState({});
  const [loadingArtists, setLoadingArtists] = useState(false);
  const [artistError, setArtistError] = useState(null);
  const [selectedArtistId, setSelectedArtistId] = useState(null);
  const [showAllArtists, setShowAllArtists] = useState(false);

    // Load from localStorage on initial render
    useEffect(() => {
        const storedArtists = getLocalArtists();
        if (Object.keys(storedArtists).length > 0) {
          setArtistsData(storedArtists);
        }
      }, [])

      // Save to localStorage whenever artistsData changes
  useEffect(() => {
    if (Object.keys(artistsData).length > 0) {
      setLocalArtists(artistsData);
    }
  }, [artistsData]);

  const fetchArtistsData = useCallback(async (artistIds = []) => {
    try {
      if (!artistIds || artistIds.length === 0) {
        console.warn('No artist IDs provided to fetch');
        return;
      }

      setLoadingArtists(true);
      setArtistError(null);
      
      const token = await getSpotifyToken();
      if (!token) throw new Error('No Spotify token available');

      const batchSize = 50;
      let allArtists = [];
      
      for (let i = 0; i < artistIds.length; i += batchSize) {
        const batch = artistIds.slice(i, i + batchSize);
        const data = await fetchArtistsBatch(token, batch);
        allArtists = [...allArtists, ...data.artists];
      }

      setArtistsData(prev => ({
        ...prev,
        ...Object.fromEntries(allArtists.map(artist => [artist.id, artist]))
      }));

    } catch (err) {
      console.error('Artist fetch error:', err);
      setArtistError(err.message);
    } finally {
      setLoadingArtists(false);
    }
  }, []);

  return (
    <ArtistsContext.Provider value={{ 
      artistsData, 
      fetchArtistsData, 
      loadingArtists, 
      artistError,
      selectedArtistId,
      setSelectedArtistId,
      clearSelectedArtistId: () => setSelectedArtistId(null),
      showAllArtists,
      setShowAllArtists
    }}>
      {children}
    </ArtistsContext.Provider>
  );
};

// Custom hook for consuming context
export const useArtistsContext = () => {
  const context = useContext(ArtistsContext);
  if (context === undefined) {
    throw new Error('useArtistsContext must be used within an ArtistsProvider');
  }
  return context;
};