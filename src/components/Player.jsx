import queue_icon from "../assets/queue_icon.svg";
import loop_icon from "../assets/loop_icon.svg";
import loop_on_icon from "../assets/loop_on_icon.svg";
import skip_prev from "../assets/skip_previous_icon.svg";
import play_icon from "../assets/play_icon.svg";
import pause_icon from "../assets/pause_icon.svg";
import skip_next from "../assets/skip_next_icon.svg";
import { ButtonBase } from "@mui/material";

import { PlayerContext } from "../context/player_context";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import "./styles/Player.css";

const Player = () => {
  const {
    pauseAudio,
    resumeAudio,
    prev,
    skip,
    isPlaying,
    isStopped,
    seekBar,
    seekBg,
    seekSong,
    currentTime,
    totalTime,
    loopAudio,
    isLooping,
    currentSong
  } = useContext(PlayerContext);

  const [titleBounce, setTitleBounce] = useState();
  const [title, setTitle] = useState(currentSong.title || null);

  const navigate = useNavigate();

  useEffect(() => {
    setTitleBounce(false);
    const timeout = setTimeout(() => {
      setTitle(currentSong.title);
      setTitleBounce(true);
    }, 300);

    return () => clearTimeout(timeout);
  }, [currentSong.title]);

  return (
    <>
      <div className="player-container">
        {title && <h1 className={`current-song ${titleBounce ? 'bounce-up' : 'bounce-down'}`}> {title} </h1>}
        
        <div className={`player shadow ${isStopped ? 'hide' : ''}`}>
          <div className="controls">
            <div className="buttons">
              <div className="button">
                <ButtonBase className="loop-button" onClick={loopAudio}>
                  { isLooping ? <img src={loop_on_icon} alt="Loop On" /> : <img src={loop_icon} alt="Loop Off" /> }
                </ButtonBase>
              </div>
              
              <div className="button">
                <ButtonBase className="prev-button" onClick={prev}>
                  <img src={skip_prev} alt="Back" />
                </ButtonBase>
              </div>

              <div className="button">
                {isPlaying ? (
                  <ButtonBase className="play-button" onClick={pauseAudio}>
                    <img src={pause_icon} alt="Pause" />
                  </ButtonBase>
                ) : (
                  <ButtonBase className="play-button" onClick={resumeAudio}>
                    <img src={play_icon} alt="Resume" />
                  </ButtonBase>
                )}
              </div>

              <div className="button">
                <ButtonBase className="next-button" onClick={skip}>
                  <img src={skip_next} alt="Next" />
                </ButtonBase>
              </div>

              <div className="button">
                <ButtonBase className="queue-button">
                  <img src={queue_icon} alt="Queue" onClick={() => {navigate('/queue')}} />
                </ButtonBase>
              </div>
            </div>

            <div className="progress-bar">
              <div ref={seekBg} onClick={seekSong} className="total">
                <hr ref={seekBar} className="current" />
              </div>

              <div className="time">
                <p>{!currentTime ? "--:--" : formatTime(currentTime)}</p>
                <p>{!totalTime ? "--:--" : formatTime(totalTime)}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      
    </>
  );
};

const formatTime = (timeInSeconds) => {
  if (!timeInSeconds || isNaN(timeInSeconds)) return "00:00";

  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = Math.floor(timeInSeconds % 60);

  const formattedMinutes = minutes.toString().padStart(2, "0");
  const formattedSeconds = seconds.toString().padStart(2, "0");

  return `${formattedMinutes}:${formattedSeconds}`;
};

export default Player;