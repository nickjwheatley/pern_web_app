// src/GameList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const GameList = () => {
  const [games, setGames] = useState([]);
  const [newGameName, setNewGameName] = useState('');
  const [newGameDesc, setNewGameDesc] = useState('');
  const [newGameTeamSize, setNewGameTeamSize] = useState('');
  // const [types, setTypes] = useState([]);

  // useEffect(() => {
  //   // Fetch data from the Express server
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get('http://localhost:5000/api/all_games'); // Assuming your Express route is /api/all_games
  //       setGames(response.data);
  //     } catch (error) {
  //       console.error('Error fetching data:', error);
  //     }
  //   };

  //   fetchData(); // Invoke the fetchData function
  // }, []); // The empty dependency array ensures that this effect runs once when the component mounts

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/all_games');
      setGames(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleAddGame = async () => {
    try {
      // Make a POST request to add a new game
      await axios.post('http://localhost:5000/api/all_games', {
        name: newGameName,
        description: newGameDesc,
        type: newGameTeamSize,
      });

      // Fetch updated data after adding a new game
      fetchData();
      
      // Clear form inputs
      setNewGameName('');
      setNewGameDesc('');
      setNewGameTeamSize('');
    } catch (error) {
      console.error('Error adding game:', error);
    }
  };

  return (
    <div>
      <h2>All Games</h2>
      <table>
        <tr>
          <th>Game</th>
          <th>Description</th>
          <th>Team Size</th>
        </tr>
        {games.map((game) => (
          <tr key={game.id}>
            <td>{game.name}</td>
            <td>{game.description}</td>
            <td>{game.team_size}</td>
          </tr>))}
      </table>
      {/* <ul>
        {games.map((game) => (
          <li key={game.id}>{game.name}</li>
          // Assuming your "all_games" table has a column named "name"
        ))}
      </ul> */}
      <h3>Add a New Game:</h3>
      <div>
        <label>Name:</label>
        <input type="text" value={newGameName} onChange={(e) => setNewGameName(e.target.value)} />
      </div>
      <div>
        <label>Description:</label>
        <input type="text" value={newGameDesc} onChange={(e) => setNewGameDesc(e.target.value)} />
      </div>
      <div>
        <select value={newGameTeamSize} onChange={(e) => setNewGameTeamSize(e.target.value)}>
          <option value="" disabled>Select a team size</option>
          <option value="1">Individual</option>
          <option value='2'>Pairs</option>
          <option value='0'>Half-and-Half</option>
          {/* {types.map((type) => (
            <option key={type} value={type}>{type}</option>
          ))} */}
        </select>
      </div>
      <button onClick={handleAddGame}>Add Game</button>
    </div>
  );
};

export default GameList;
