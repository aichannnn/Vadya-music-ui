// src/Utils/api.js
export const getSpotifyToken = async () => {
    const clientId = "fdd5b2d981b6445e84426104b075ac4f";
    const clientSecret = "8e69c1c6637340de8fb81e9703f37993";

    const response = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: "Basic " + btoa(clientId + ":" + clientSecret),
        },
        body: "grant_type=client_credentials",
    });

    const data = await response.json();
    return data.access_token;
};

export const fetchTrendingMusic = async (token, limit = 50) => {
    const response = await fetch(
        `https://api.spotify.com/v1/browse/new-releases?limit=${limit}`,
        { headers: { Authorization: `Bearer ${token}` }
    }
    );
    const data = await response.json();
    
    const albums = data.albums.items;
    const tracks = [];
    
    for (const album of albums) {
        const tracksResponse = await fetch(
            `https://api.spotify.com/v1/albums/${album.id}/tracks`,
            { headers: { Authorization: `Bearer ${token}` } }
        );
        const tracksData = await tracksResponse.json();
        if (tracksData.items.length > 0) {
            tracks.push({
                ...tracksData.items[0],
                album_images: album.images
            });
        }
    }
    
    return tracks;
};

// Add this function (previously missing)
export const fetchArtistsBatch = async (token, artistIds) => {
    const response = await fetch(
        `https://api.spotify.com/v1/artists?ids=${artistIds.join(',')}`,
        { headers: { Authorization: `Bearer ${token}` } }
    );
    return await response.json();
};

export const fetchArtistTopTracks = async (token, artistId) => {
    const response = await fetch(
      `https://api.spotify.com/v1/artists/${artistId}/top-tracks?market=US`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await response.json();
    return data.tracks || [];
  };
export const getArtistDetails = async (token, artistId) => {
    const response = await fetch(
      `https://api.spotify.com/v1/artists/${artistId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await response.json();
    return data;
  };
  
export const getArtistAlbums = async (token, artistId) => {
    const response = await fetch(
      `https://api.spotify.com/v1/artists/${artistId}/albums?include_groups=album,single&limit=10`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await response.json();

     // Fetch tracks for each album
    const albumsWithTracks = await Promise.all(
        data.items.map(async (album) => {
            try {
                const trackResponse = await fetch(
                    `https://api.spotify.com/v1/albums/${album.id}/tracks`,
                    { headers: { Authorization: `Bearer ${token}` } }
                );
                const trackData = await trackResponse.json();
                return { ...album, tracks: trackData.items || [] }; // Ensure tracks is always an array
            } catch (error) {
                console.error("Error fetching tracks for album:", album.id, error);
                return { ...album, tracks: [] }; // Return empty array on failure
            }
        })
    );

    return albumsWithTracks;
};

export const getArtistTopTracks = async (token, artistId) => {
    const response = await fetch(
      `https://api.spotify.com/v1/artists/${artistId}/top-tracks?market=US`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await response.json();
    return data.tracks || [];
};
    