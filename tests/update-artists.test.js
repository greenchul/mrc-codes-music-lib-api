const { expect } = require('chai');
const request = require('supertest');
const getDb = require('../src/services/db');
const app = require('../src/app');
const { afterEach } = require('mocha');

describe('update artist', () => {
  let db;
  let artists;
  beforeEach(async () => {
    db = await getDb();

    await Promise.all([
      db.query('INSERT INTO Artist (name, genre) VALUES(?,?)', [
        'Halestorm',
        'rock',
      ]),
      db.query('INSERT INTO Artist (name, genre) VALUES(?,?)', [
        'Machine Head',
        'metal',
      ]),
      db.query('INSERT INTO Artist (name, genre) VALUES(?,?)', [
        'The Spill Canvas',
        'alternative',
      ]),
    ]);

    [artists] = await db.query('SELECT * FROM Artist');
  });

  afterEach(async () => {
    await db.query('DELETE FROM Artist');
    await db.close();
  });
  describe('/artist/:id', () => {
    describe('PATCH', () => {
      it('Updates a single artist with the correct ID', async () => {
        const artist = artists[0];

        const artistID = artist.id;
        const result = await request(app)
          .patch(`/artist/${artist.id}`)
          .send({ name: 'test name', genre: 'test genre' });

        expect(result.status).to.equal(200);

        const [[updatedArtist]] = await db.query(
          `SELECT * FROM Artist Where id=?`,
          [artistID]
        );

        expect(updatedArtist.name).to.equal('test name');
      });

      it('Response should equal 404 when trying to update an artist that does not exist', async () => {
        const result = await request(app)
          .patch('/artist/89675675')
          .send({ name: 'test', genre: 'test' });

        expect(result.status).to.equal(404);
      });
    });
  });
});
