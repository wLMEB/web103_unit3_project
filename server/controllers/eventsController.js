import { pool } from '../config/database.js'

const getAllEvents = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT events.*, locations.name AS location_name
      FROM events
      JOIN locations ON events.location_id = locations.id
      ORDER BY date, time
    `)
    res.json(result.rows)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const getEventById = async (req, res) => {
  try {
    const { id } = req.params
    const result = await pool.query('SELECT * FROM events WHERE id = $1', [id])
    res.json(result.rows[0])
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const getEventsByLocation = async (req, res) => {
  try {
    const { id } = req.params
    const result = await pool.query(
      'SELECT * FROM events WHERE location_id = $1 ORDER BY date, time',
      [id]
    )
    res.json(result.rows)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export { getAllEvents, getEventById, getEventsByLocation }
