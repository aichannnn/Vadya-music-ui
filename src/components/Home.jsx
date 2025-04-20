import { useArtistsContext } from '../ContextApi/ArtistsContext';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import MainPlaylist from './MainPlaylist';
import PlaylistPage from './PlaylistPage';
import ArtistDetails from './ArtistDetails';
import { MusicProvider } from '../ContextApi/MusicContext';
import { ArtistsProvider } from '../ContextApi/ArtistsContext';

function Home() {
  return (
    <div>
      <Navbar />
      <Sidebar />
      <ArtistsProvider>
        <MusicProvider>
          <MainContent />
        </MusicProvider>
      </ArtistsProvider>
    </div>
  );
}

function MainContent() {
  const { selectedArtistId } = useArtistsContext();

  return (
    <div className="main-container">
      {selectedArtistId ? (
        <ArtistDetails />
      ) : (
        <>
          <MainPlaylist />
          <PlaylistPage />
        </>
      )}
    </div>
  );
}

export default Home;
