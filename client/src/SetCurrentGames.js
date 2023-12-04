//To Do:
////// Change script to not always listen for new games - do a one time SQL extraction on a click event to select the current games
////// Add selection algorithm from gameSelect.js
////// Create a post request to create a new table containing the current games
//////// Prompt user if they want to create a list of new games if the table already exists (current games table will be dropped after games completion)
//////// Drop table if the user prompts it


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

const React = require('react');
const { useState, useEffect } = require('react');
const axios = require('axios');

const NUMBER_OF_GAMES = 5

class Game {
    constructor(id,game_name,team_size,description=null,times_played=0,
      tournament_bracket_style=false,tie_breaker_eligible=false,approved=false){
        this.id = id;
        this.game_name = game_name;
        this.description = description;
        this.team_size = team_size;
        this.times_played = times_played;
        this.tournament_bracket_style = tournament_bracket_style;
        this.tie_breaker_eligible = tie_breaker_eligible;
        this.approved = approved;
        this.weight = null;
    }
};

const buildGameArray = (games) =>{
  return games.map((game) => new Game(
    game.id, 
    game.game_name, 
    game.team_size, 
    game.description,
    game.times_played,
    game.tournament_bracket_style,
    game.tie_breaker_eligible
    ))
};


const GetCurentGames = async () => {
  try {
    // Make a request to your server to perform the database query
    const response = await fetch('http://localhost:5000/api/all_games'); // Assuming you have an API endpoint for querying the database

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    const gameObjects = buildGameArray(data)

    // Calculate weights based on the inverse of times_occurred
    for (let i=0; i < gameObjects.length; i++) {
      gameObjects[i].weight = (1 / (+gameObjects[i].times_played + 1))
    }

    const usedIds = []; //to prevent selecting the same game more than once
    // Function to randomly select an element with weighted probabilities
    const weightedRandom = (arr) => {
      let remaining_arr = arr.filter(item => !usedIds.includes(+item.id))
      const totalWeight = remaining_arr.reduce((acc, game) => acc + game.weight, 0);
      const randomValue = Math.random() * totalWeight;

      let cumulativeWeight = 0;
      for (let i = 0; i < remaining_arr.length; i++) {
          cumulativeWeight += remaining_arr[i].weight;
          if (randomValue <= cumulativeWeight) {
              usedIds.push(+remaining_arr[i].id);
              return remaining_arr[i];
          }
      }
    };

    // Use the weightedRandom function to select 5 events
    let selectedGames = Array.from({ length: NUMBER_OF_GAMES }, () => weightedRandom(gameObjects));

    // add tiebreaker game
    const possibleTieBreakers = gameObjects.filter(
      game => (!usedIds.includes(+game.id)) && (game.tie_breaker_eligible));
    
    selectedGames = selectedGames.concat(Array.from({ length: 1 }, () => weightedRandom(possibleTieBreakers)))

    // console.log(usedIds)
    // Print the selected events
    selectedGames.forEach(game => {
      console.log(`Game: ${game.game_name}, Team Size: ${game.team_size}`);
    });

    // return (
    //   <div>
    //     <h2>All Games</h2>
    //     <table>
    //       <tr>
    //         <th>Game</th>
    //         <th>Description</th>
    //         <th>Team Size</th>
    //       </tr>
    //       {selectedGames.map((game) => (
    //         <tr key={game.id}>
    //           <td>{game.game_name}</td>
    //           <td>{game.description}</td>
    //           <td>{game.team_size}</td>
    //         </tr>))}
    //     </table>
    //   </div>
    // );

    // gameObjects.forEach(game => {
    //   console.log(`Event ID: ${game.id}, Event Name: ${game.game_name}`);
    // });

  } catch (error) {
    console.error('Error performing database query:', error);
  }
};
  
// export default GetCurentGames;
module.exports = GetCurentGames;
// GetCurentGames()
