const fs = require('fs');
const parse = require('csv-parse'); // Using the csv-parse library
const csv = require('csv-parser');

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
}

function gameStringToObject(varStr, colDelim, rowDelim = null){
    var returnArr;
    if (rowDelim != null){
        returnArr = varStr.split(rowDelim);
        gameArr = returnArr.map((row) => row.split(colDelim))
        return gameArr.slice(1,-1).map((game) => new Game(...game))
    } else {
        return varStr.split(colDelim)
    }
}


// Read the CSV file synchronously
const csvData = fs.readFileSync('./approved_reindeer_games.csv', 'utf8');

const games = gameStringToObject(csvData, ',', '\n')



// Calculate weights based on the inverse of times_occurred
for (let i=0; i < games.length; i++) {
    games[i].weight = (1 / (+games[i].times_played + 1))
}
// const weights = games.map(game => (1 / (+game.times_played + 1)));

const usedIds = [];

// Function to randomly select an element with weighted probabilities
const weightedRandom = (arr) => {
    let remaining_arr = arr.filter(item => !usedIds.includes(+item.id))
    const totalWeight = remaining_arr.reduce((acc, game) => acc + game.weight, 0);
    // console.log(totalWeight)
    const randomValue = Math.random() * totalWeight;
    // console.log(randomValue)

    let cumulativeWeight = 0;
    for (let i = 0; i < remaining_arr.length; i++) {
        cumulativeWeight += remaining_arr[i].weight;
        if (randomValue <= cumulativeWeight) {
            usedIds.push(+remaining_arr[i].id);
            // console.log(usedIds)
            return remaining_arr[i];
        }
    }
};

// Use the weightedRandom function to select 5 events
const selectedGames = Array.from({ length: 5 }, () => weightedRandom(games));

console.log(usedIds)
// Print the selected events
selectedGames.forEach(game => {
    console.log(`Event ID: ${game.id}, Event Name: ${game.game_name}`);
});