const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const knex = require('knex')({
    client: 'pg',
    connection: {
      host: 'localhost',
      user: 'postgres',
      password: 'BensonBowling2030',
      database: 'ReindeerGames',
      port: 5433,
    },
  });

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors());

app.get('/api/all_games', async (req, res) => {
    try {
      // Use Knex to fetch data from the "all_games" table
      const games = await knex.select('*').from('all_games');
      res.json(games);
    } catch (error) {
      console.error('Error fetching data:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  // Define your /api/all_games POST endpoint
app.post('/api/all_games', async (req, res) => {
  const { name, description, type } = req.body;

  try {
    // Insert a new game into the "all_games" table
    await knex('all_games').insert({ name, description, type });

    res.json({ success: true });
  } catch (error) {
    console.error('Error adding game:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
