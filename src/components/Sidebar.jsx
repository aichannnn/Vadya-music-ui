import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import MyPlaylist from './MyPlaylist';

function Sidebar() {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showCreatePlaylist, setShowCreatePlaylist] = useState(false);
  const { isAuthenticated,user} = useSelector(state => state.auth);

  const playlists = [
    { name: "Liked Songs", author: "You" },
    { name: "My Playlist #4", author: "prii" },
    { name: "Girls' Night", author: "Spotify" },
    { name: "My Playlist #3", author: "prii" },
    { name: "My Playlist #2", author: "prii" },
  ];

  const addPlayList = () => setShowDropdown(prev => !prev);
  const createPlaylist = () => setShowCreatePlaylist(prev => !prev);
  const notNow = () => setShowCreatePlaylist(false);

  const renderDropdown = () => (
    showDropdown && (
      <div className="dropdown" onClick={createPlaylist}>
        <span className="material-symbols-outlined">music_note_add</span>
        Create a new playlist
      </div>
    )
  );

  const renderCreatePlaylist = () => (
    showCreatePlaylist && (
      <div className="createplaylist">
        <h2>Create a playlist</h2>
        <p>Log in to create and share playlist</p>
        <span className='Not-now-btn' onClick={notNow}>Not now</span> 
        <Link to='/login' className='createPlaylist-btn'>Log in</Link>
      </div>
    )
  );

  return (
    <nav>
      <div className='sidebar-container'>
        <div className='sideNav'>
          <div className="playlist">
            <h2>Your Library</h2>
            <span className="material-symbols-outlined" id='add' onClick={addPlayList}>add</span>
          </div>
          {renderDropdown()}
          {isAuthenticated ? (
            <MyPlaylist playlists={playlists} />
          ) : (
            <>
              <div className="library-card">
                <span>Create your first playlist</span>
                <p>It's easy, we'll help you</p>
                <button className='library-card-btn' onClick={createPlaylist}>Create Playlist</button>
              </div>
              <div className="library-card">
                <span>See your recent played</span>
                <p>We’ll keep you updated with your recent plays</p>
                <button className='library-card-btn' onClick={createPlaylist}>Recent Plays</button>
              </div>
              {renderCreatePlaylist()}
            </>
          )}
          <div className="foot">
            <button type='button'>English</button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Sidebar;
