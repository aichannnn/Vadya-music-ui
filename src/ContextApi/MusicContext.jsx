import { createContext, useState, useContext } from 'react'

const MusicContext = createContext();

export const MusicProvider = ({children}) => {
    const [currentTrack, setCurrentTrack] = useState(null);
    const [currentTrackId, setCurrentTrackId] = useState(null);

    return(
        <MusicContext.Provider value={{currentTrack,setCurrentTrack,currentTrackId,setCurrentTrackId}}>
            {children}
        </MusicContext.Provider>
    );
}


export const useMusic = () =>useContext(MusicContext);