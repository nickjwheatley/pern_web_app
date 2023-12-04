import logo from './rg.svg';
// import logo from './rg_logo.jpg';
import GameList from './gameList';
import GetCurentGames from './SetCurrentGames';
import './App.css';

function App() {
  return (
    <><div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        {/* <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a> */}
      </header>
    </div><div>
        {/* Other components */}
        <GameList />
      </div>
      <div>
      {/* Your other components */}
      <button onClick={GetCurentGames}>Query Database</button>
    </div></>
  );
}

export default App;
