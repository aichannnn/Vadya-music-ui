import React from 'react';

function MyPlaylist({ playlists }) {
  return (
    <div className="my-playlist">
      <div className="playlist-list">
        {playlists.map((playlist, index) => (
          <div className="playlist-item" key={index}>
            <div className="playlist-icon">🎵</div>
            <div className="playlist-details">
              <span className="playlist-title">{playlist.name}</span>
              <span className="playlist-author">{playlist.author}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyPlaylist;
