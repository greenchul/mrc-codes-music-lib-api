const app = require('../src/app');
const request = require('supertest');
const getDb = require('../src/services/db');
const { expect } = require('chai');
const res = require('express/lib/response');

describe('read artist', () => {
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
        'Sophie Ellis-Bextor',
        'pop',
      ]),
    ]);

    [artists] = await db.query('SELECT * FROM Artist');
  });

  afterEach(async () => {
    await db.query('DELETE FROM Artist');
    await db.close();
  });

  describe('/artist', () => {
    describe('GET', () => {
      it('returns all astist records in the database', async () => {
        const result = await request(app).get('/artist');

        expect(result.status).to.equal(200);

        expect(result.body.length).to.equal(3);

        result.body.forEach((record) => {
          const fromTests = artists.find((test) => {
            return test.id === record.id;
          });

          expect(record).to.deep.equal(fromTests);
        });
      });
    });
  });

  describe('/artist/:artistId', () => {
    describe('GET', () => {
      it('Should return a single artist with the correct ID', async () => {
        const expectedArtist = artists[0];
        const expectedArtistId = expectedArtist.id;

        const result = await request(app).get(`/artist/${expectedArtistId}`);

        expect(result.status).to.equal(200);

        expect(result.body).to.deep.equal(expectedArtist);
      });

      it('should return 404 of the artist is not in the database', async () => {
        const result = await request(app).get('/artist/9999999999');

        expect(result.status).to.equal(404);
      });
    });
  });
});
