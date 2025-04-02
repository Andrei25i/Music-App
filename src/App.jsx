import Player from './components/Player';
import PlayerContextProvider from './context/player_context';
import QueueContextProvider from './context/queue_context';
import Display from './components/Display';

function App() {
  return (
    <QueueContextProvider>
      <PlayerContextProvider>
        <div className='content-wrapper'>
          <Display />
          <Player />
        </div>
      </PlayerContextProvider>
    </QueueContextProvider>
  )
}

export default App;