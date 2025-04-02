import { createContext, useEffect, useState } from "react"

export const QueueContext = createContext();

const QueueContextProvider = ({ children }) => {
    const [queue, setQueue] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(-1);

    useEffect(() => {
        const savedQueue = JSON.parse(localStorage.getItem('queue') || '[]');
        setQueue(savedQueue);
    }, []);

    const toggleQueue = (song) => {
        setQueue((prevQueue) => {
            const isSongInQueue = prevQueue.some((item) => item.id === song.id);
            let updatedQueue;

            if (isSongInQueue) {
                const removedIndex = prevQueue.findIndex((item) => item.id === song.id);

                updatedQueue = prevQueue.filter((item) => item.id !== song.id);
                setCurrentIndex((prevIndex) => {
                    if (removedIndex < prevIndex) {
                        // Dacă melodia ștearsă este înaintea melodiei curente, ajustează currentIndex
                        return prevIndex - 1;
                    } else if (removedIndex === prevIndex) {
                        // Dacă melodia curentă este ștearsă, treci la următoarea melodie
                        return prevIndex + 1 > updatedQueue.length ? updatedQueue.length - 1 : prevIndex - 1;
                    }
                    // Dacă melodia ștearsă este după currentIndex, păstrează currentIndex
                    return prevIndex;
                });
            } else {
                updatedQueue = [...prevQueue, song];
            }

            localStorage.setItem('queue', JSON.stringify(updatedQueue));
            return updatedQueue;
        });
    };

    const clearQueue = () => {
        setQueue([]);
        localStorage.setItem('queue', JSON.stringify([]));
        setCurrentIndex(-1);
    }

    const ctxValue = {
        queue,
        currentIndex,
        setCurrentIndex,
        toggleQueue,
        clearQueue,
    };

    return (
        <QueueContext.Provider value={ctxValue} >
            {children}
        </QueueContext.Provider>
  )
}

export default QueueContextProvider;