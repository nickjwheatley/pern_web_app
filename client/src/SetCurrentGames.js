//To Do:
////// Change script to not always listen for new games - do a one time SQL extraction on a click event to select the current games
////// Add selection algorithm from gameSelect.js
////// Create a post request to create a new table containing the current games
//////// Prompt user if they want to create a list of new games if the table already exists (current games table will be dropped after games completion)
//////// Drop table if the user prompts it


import React, { useState, useEffect } from 'react';
import axios from 'axios';

class Game {
    constructor(id,game_name,description,team_size,times_played,approved){
        this.id = id;
        this.game_name = game_name;
        this.description = description;
        this.team_size = team_size;
        this.times_played = times_played;
        this.approved = approved;
        this.weight = null;
    }
};

const buildGameArray = (games) =>{
    return games.map((game) => new Game(...game))
};

// const GetCurentGames = () => {
//   const [all_sql_games, setAllGames] = useState([]);
//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = async () => {
//     try {
//       const response = await axios.get('http://localhost:5000/api/all_games');
//       setAllGames(response.data);
//     } catch (error) {
//       console.error('Error fetching data:', error);
//     }
//   };
//   const all_games = buildGameArray(all_sql_games)

// //   const handleAddGame = async () => {
// //     try {
// //       // Make a POST request to add a new game
// //       await axios.post('http://localhost:5000/api/all_games', {
// //         name: newGameName,
// //         description: newGameDesc,
// //         type: newGameTeamSize,
// //       });

// //       // Fetch updated data after adding a new game
// //       fetchData();
      
// //       // Clear form inputs
// //       setNewGameName('');
// //       setNewGameDesc('');
// //       setNewGameTeamSize('');
// //     } catch (error) {
// //       console.error('Error adding game:', error);
// //     }
// //   };

//   return (
//     // all_games.map((game) => console.log(game.name))

//     <div>
//       <h2>All Games</h2>
//       <table>
//         <tr>
//           <th>Game</th>
//           <th>Description</th>
//           <th>Team Size</th>
//         </tr>
//         {all_sql_games.map((game) => (
//           <tr key={game.id}>
//             <td>{game.name}</td>
//             <td>{game.description}</td>
//             <td>{game.team_size}</td>
//           </tr>))}
//       </table>
//     </div>
//   );
// };

// export default GetCurentGames;


//////////

const GetCurentGames = () => {
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
      </div>
    );
  };
  
  export default GetCurentGames;
