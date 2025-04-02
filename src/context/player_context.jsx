import { createContext, useState, useRef, useEffect, useContext } from "react";
import getAudioSource from "../yt_api/getAudioSource";
import { QueueContext } from './queue_context';

export const PlayerContext = createContext();

const PlayerContextProvider = ({ children }) => {
  const { queue, setCurrentIndex } = useContext(QueueContext);

  const audioRef = useRef();
  const seekBg = useRef();
  const seekBar = useRef();

  const [audioUrl, setAudioUrl] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const [isStopped, setIsStopped] = useState(true);
  const [progress, setProgress] = useState(0);
  const [isLooping, setIsLooping] = useState(false);
  const [currentSong, setCurrentSong] = useState({});

  const playAudio = async (video) => {
    setAudioUrl("");
    const audioSource = await getAudioSource(video.id);
    setCurrentSong(video);
    setAudioUrl(audioSource);
    setIsPlaying(true);
    
    if (isStopped) setIsStopped(false);
  };

  const pauseAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const resumeAudio = () => {
    if (audioRef.current) {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const skip = async () => {
    let nextSong;
    setCurrentIndex((prevIndex) => {
      const newIndex = prevIndex + 1 < queue.length ? prevIndex + 1 : 0;
      nextSong = queue[newIndex];
      return newIndex;
    });
    if (!nextSong) return;
    await playAudio(nextSong);
  }

  const prev = async () => {
    let prevSong;
    setCurrentIndex((prevIndex) => {
      const newIndex = prevIndex > 0 ? prevIndex - 1 : 0;
      prevSong = queue[newIndex];
      return newIndex;
    });
    if (!prevSong) return;
    await playAudio(prevSong);
  }

  const jump = async (item) => {
    let songIndex = queue.findIndex((song) => song.id === item.id);
    let song = queue[songIndex];
    setCurrentIndex((prevIndex) => {return songIndex;});
    await playAudio(song);
  }

  const loopAudio = () => {
    setIsLooping((prevState) => !prevState)
  }

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.ontimeupdate = () => {
        if (audioRef.current?.duration) {
          const currentProgress = (audioRef.current.currentTime / audioRef.current.duration) * 100;
          setProgress(currentProgress);
          seekBar.current.style.width = currentProgress + "%";
        }
      };
    }
  }, [audioUrl]);

  const seekSong = async (e) => {
    if (audioRef.current) {
      audioRef.current.currentTime = (e.nativeEvent.offsetX / seekBg.current.offsetWidth) * audioRef.current.duration;
      // if (audioRef.current.paused) resumeAudio();
    }
  }

  const ctxValue = {
    audioRef,
    seekBar,
    seekBg,
    audioUrl,
    setAudioUrl,
    isPlaying,
    isStopped,
    playAudio,
    pauseAudio,
    resumeAudio,
    jump,
    prev,
    skip,
    progress,
    currentTime: audioRef.current?.currentTime || null,
    totalTime: audioRef.current?.duration || null,
    seekSong,
    loopAudio,
    isLooping,
    currentSong,
  };

  return (
    <PlayerContext.Provider value={ctxValue}>
      {children}
      
      {audioUrl && (
        <audio
          ref={audioRef}
          autoPlay
          loop={isLooping}
          controls
          name="media"
          onEnded={skip}
          style={{display: "none"}}
        >
          <source src={audioUrl} type="audio/webm" />
        </audio>
      )}
    </PlayerContext.Provider>
  );
};

export default PlayerContextProvider;