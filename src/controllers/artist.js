const getDb = require('../services/db');

const createArtistController = async (req, res) => {
  const db = await getDb();
  const artistName = req.body.name;
  const artistGenre = req.body.genre;
  try {
    await db.query(
      `INSERT INTO Artist (name, genre)
    VALUES (?, ?)`,
      [artistName, artistGenre]
    );
    res.sendStatus(201);
  } catch (err) {
    res.sendStatus(500).json(err);
  }
  db.close();
};

const readArtistController = async (req, res) => {
  const db = await getDb();
  try {
    const result = await db.query('SELECT * FROM Artist');
    const [artists] = result;
    res.status(200).send(artists);
  } catch (err) {
    res.status(500).json(err);
  }
  db.close();
};

const readSingleArtistController = async (req, res) => {
  const id = req.params.id;
  const db = await getDb();
  try {
    const result = await db.query(`SELECT * FROM Artist WHERE id=?`, [id]);
    const [[artist]] = result;
    return artist ? res.status(200).send(artist) : res.sendStatus(404);
  } catch (err) {
    res.status(500).json(err);
  }
  db.close();
};

const updatingArtistController = async (req, res) => {
  const db = await getDb();

  const data = req.body;
  const id = req.params.id;

  try {
    // find if valid id
    const [[selectedArtist]] = await db.query(
      'SELECT * FROM Artist WHERE id=?',
      [id]
    );

    if (selectedArtist) {
      await db.query('UPDATE Artist SET ? WHERE id = ?', [data, id]);
      res.sendStatus(200);
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    res.status(500).json(err);
  }

  db.close();
};

const deletingArtistController = async (req, res) => {
  const db = await getDb();
  const id = req.params.id;
  try {
    const [[artistToDelete]] = await db.query(
      'SELECT * FROM Artist WHERE id=?',
      [id]
    );
    if (artistToDelete) {
      await db.query('DELETE FROM Artist WHERE id=?', [id]);
      res.sendStatus(200);
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
  db.close();
};

module.exports = {
  createArtistController,
  readArtistController,
  readSingleArtistController,
  updatingArtistController,
  deletingArtistController,
};
