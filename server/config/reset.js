import { pool } from './database.js'
import dotenv from 'dotenv'
import { fileURLToPath } from 'url'
import path from 'path'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
dotenv.config({ path: path.join(__dirname, '../.env') })

const createTables = async () => {
  const dropQuery = `
    DROP TABLE IF EXISTS events;
    DROP TABLE IF EXISTS locations;
  `

  const createQuery = `
    CREATE TABLE locations (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      address VARCHAR(255),
      city VARCHAR(100),
      state VARCHAR(2),
      zip VARCHAR(10),
      image VARCHAR(500)
    );

    CREATE TABLE events (
      id SERIAL PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      date DATE NOT NULL,
      time TIME NOT NULL,
      image VARCHAR(500),
      location_id INTEGER REFERENCES locations(id)
    );
  `

  const seedLocations = `
    INSERT INTO locations (name, address, city, state, zip, image) VALUES
    ('Westside Branch Library',     '123 Oak Street',     'Dallas', 'TX', '75201', 'https://picsum.photos/id/1/400/300'),
    ('Central Public Library',      '456 Main Avenue',    'Dallas', 'TX', '75202', 'https://picsum.photos/id/20/400/300'),
    ('Eastside Community Library',  '789 Elm Boulevard',  'Dallas', 'TX', '75203', 'https://picsum.photos/id/42/400/300'),
    ('Northside Reading Center',    '321 Pine Road',      'Dallas', 'TX', '75204', 'https://picsum.photos/id/48/400/300');
  `

  const seedEvents = `
    INSERT INTO events (title, date, time, image, location_id) VALUES
    ('Monthly Book Club',             '2026-03-25', '18:00:00', 'https://picsum.photos/id/24/350/350',  1),
    ('Author Reading: Jane Smith',    '2026-03-05', '14:00:00', 'https://picsum.photos/id/9/350/350',   1),
    ('Children''s Storytime',         '2026-03-10', '10:30:00', 'https://picsum.photos/id/15/350/350',  1),
    ('Digital Literacy Workshop',     '2026-03-28', '17:00:00', 'https://picsum.photos/id/60/350/350',  2),
    ('Poetry Slam Night',             '2026-02-20', '19:00:00', 'https://picsum.photos/id/27/350/350',  2),
    ('Film & Discussion Series',      '2026-03-01', '15:00:00', 'https://picsum.photos/id/30/350/350',  2),
    ('Mystery Night Author Reading',  '2026-04-10', '18:30:00', 'https://picsum.photos/id/45/350/350',  2),
    ('Teen Manga Club',               '2026-03-26', '16:00:00', 'https://picsum.photos/id/54/350/350',  3),
    ('Genealogy Research Help',       '2026-02-28', '13:00:00', 'https://picsum.photos/id/58/350/350',  3),
    ('Chess & Board Game Night',      '2026-04-01', '17:30:00', 'https://picsum.photos/id/63/350/350',  3),
    ('Language Exchange Meetup',      '2026-03-12', '18:00:00', 'https://picsum.photos/id/68/350/350',  4),
    ('Coding for Beginners',          '2026-04-15', '10:00:00', 'https://picsum.photos/id/72/350/350',  4);
  `

  try {
    await pool.query(dropQuery)
    console.log('Tables dropped')
    await pool.query(createQuery)
    console.log('Tables created')
    await pool.query(seedLocations)
    console.log('Locations seeded')
    await pool.query(seedEvents)
    console.log('Events seeded')
    pool.end()
  } catch (error) {
    console.error('Error setting up database:', error)
    pool.end()
  }
}

createTables()
