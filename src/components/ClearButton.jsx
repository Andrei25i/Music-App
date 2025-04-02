import { ButtonBase } from '@mui/material';
import trash_icon from '../assets/trash_icon.svg';
import { QueueContext } from '../context/queue_context';
import { useContext } from 'react';

const ClearButton = () => {
    const { clearQueue } = useContext(QueueContext);

    return (
        <div className="button">
            <ButtonBase className="clear-button" onClick={clearQueue} >
                <img src={trash_icon} alt="Clear" />
            </ButtonBase>
        </div>
    )
}

export default ClearButton
