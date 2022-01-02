const getDb = require('../services/db');

const createAlbumController = async (req, res) => {
  const db = await getDb();
  const artistId = req.params.id;
  const name = req.body.name;
  const year = req.body.year;

  try {
    await db.query('INSERT INTO Album (name, year, artistId) VALUES (?,?,?)', [
      name,
      year,
      artistId,
    ]);
    res.status(201).send('Created album');
  } catch (err) {
    console.log(err);
  }
  db.close();
};

const readAlbumsController = async (req, res) => {
  const db = await getDb();
  try {
    const result = await db.query('SELECT * FROM Album');
    const [albums] = result;
    res.status(200).send(albums);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
  db.close();
};

const readSingleAlbumController = async (req, res) => {
  const db = await getDb();
  const id = req.params.id;
  try {
    const [[album]] = await db.query('SELECT * FROM Album WHERE id=?', [id]);
    if (album) {
      res.status(200).send(album);
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
  db.close();
};

const updateAlbumController = async (req, res) => {
  const id = req.params.id;
  const db = await getDb();
  const data = req.body;
  try {
    const [[album]] = await db.query('SELECT * FROM Album WHERE id=?', [id]);

    if (album) {
      await db.query('UPDATE Album SET ? WHERE id=?', [data, id]);
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

const deleteAlbumController = async (req, res) => {
  const db = await getDb();
  const id = req.params.id;
  try {
    const [[album]] = await db.query('SELECT * FROM Album WHERE id=?', [id]);

    if (album) {
      await db.query('DELETE FROM Album WHERE id=?', [id]);
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
  createAlbumController,
  readAlbumsController,
  readSingleAlbumController,
  updateAlbumController,
  deleteAlbumController,
};
