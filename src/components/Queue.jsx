import Results from "./Results";
import { useContext } from "react";
import { QueueContext } from "../context/queue_context";
import empty_queue from '../assets/queue_empty.svg';
import BackButton from "./BackButton";
import ClearButton from "./ClearButton";
import './styles/Queue.css';

const Queue = () => {
    const { queue } = useContext(QueueContext);

    let resultsMessage;
    if (!queue?.length) { 
        resultsMessage = 
            <div className="results-message" >
                <p>Songs will appear here...</p>
                <img src={empty_queue} alt="Results List" />
            </div>
    }

    return (
        <>
            <Results results={queue} style={{height: '55vh', paddingTop: '0'}} >
                <div className="header" >
                    <div>
                        <BackButton />
                        <h1>Queue</h1>
                    </div>
                    { queue.length > 0 ? <ClearButton /> : "" }
                </div>
                { resultsMessage }
            </Results>
        </>
    )
}

export default Queue;