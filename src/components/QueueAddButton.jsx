import { useContext, useEffect, useState } from 'react';
import queue_add_icon from '../assets/queue_add_icon.svg';
import queue_remove_icon from '../assets/queue_remove_icon.svg';
import { ButtonBase } from '@mui/material';
import { QueueContext } from '../context/queue_context';

const QueueAddButton = ({ song }) => {
    const { queue, toggleQueue } = useContext(QueueContext);
    const [isAdded, setIsAdded] = useState(false);

    useEffect(() => {
        setIsAdded(queue.some((item) => item.id === song.id));
    }, [queue, song.id]);

    const handleClick = () => {
        toggleQueue(song);
    }

    return (
        <ButtonBase className='queue-add-button' onClick={handleClick}>
            { !isAdded ? <img src={queue_add_icon} alt="Queue_Add" /> : <img src={queue_remove_icon} alt="Queue_Remove" /> }
        </ButtonBase>
    )
}

export default QueueAddButton;