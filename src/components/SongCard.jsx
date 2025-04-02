import { useContext } from 'react';
import { PlayerContext } from '../context/player_context';

import play_icon from '../assets/play_icon.svg';
import { ButtonBase } from '@mui/material';
import QueueAddButton from './QueueAddButton';
import { useLocation } from 'react-router-dom';
import './styles/SongCard.css';

const SongCard = ({ item }) => {
    const { playAudio, currentSong, jump } = useContext(PlayerContext);
    const location = useLocation();

    const handleClick = () => {
        if (location.pathname === '/queue') {
            jump(item);
        } else {
            playAudio(item);
        }
    }

    return (
        <div className="song-card" >
            <div className='song'>
                <a href={`https://www.youtube.com/watch?v=${encodeURIComponent(item.id)}`} target='_blank'>
                    <img className='thumbnail' src={item.thumbnail} alt="" />
                </a>
                <div className='info'>
                    <h2 className={`title ${item.id === currentSong.id ? 'active' : ''}`}>
                        {item.title}
                    </h2>
                    <div>
                        <p className='duration'>{item.duration}</p>
                        <p className='channel-name'>{item.channelName}</p>
                    </div>
                </div>
            </div>
            <div className='buttons'>
                <div className='button'>
                    <ButtonBase className='play-button' onClick={handleClick}>
                        <img src={play_icon} alt="Play" />
                    </ButtonBase>     
                </div>
                <div className="button">
                    <QueueAddButton song={item} />
                </div>
            </div>
        </div>
    )
}

export default SongCard;