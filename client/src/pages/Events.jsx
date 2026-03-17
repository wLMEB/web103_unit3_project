import React, { useState, useEffect } from 'react'
import Event from '../components/Event'
import EventsAPI from '../services/EventsAPI'
import '../css/Events.css'

const Events = () => {
  const [events, setEvents] = useState([])
  const [filter, setFilter] = useState('all')
  const [search, setSearch] = useState('')

  useEffect(() => {
    (async () => {
      try {
        const eventsData = await EventsAPI.getAllEvents()
        setEvents(eventsData)
      } catch (error) {
        console.error(error)
      }
    })()
  }, [])

  const filteredEvents = events.filter(event => {
    const matchesSearch =
      event.title.toLowerCase().includes(search.toLowerCase()) ||
      (event.location_name && event.location_name.toLowerCase().includes(search.toLowerCase()))

    if (filter === 'upcoming') {
      const eventDateTime = new Date(`${event.date.slice(0, 10)}T${event.time}`)
      return matchesSearch && eventDateTime >= new Date()
    }
    if (filter === 'past') {
      const eventDateTime = new Date(`${event.date.slice(0, 10)}T${event.time}`)
      return matchesSearch && eventDateTime < new Date()
    }
    return matchesSearch
  })

  return (
    <div className='events-page'>
      <div className='events-hero'>
        <h2>📚 Library Events</h2>
        <p>Discover programs and events at all Dallas Public Library branches</p>
      </div>

      <div className='events-controls'>
        <input
          type='text'
          placeholder='Search events or locations...'
          value={search}
          onChange={e => setSearch(e.target.value)}
          className='search-input'
        />
        <div className='filter-buttons'>
          <button className={filter === 'all' ? 'active' : ''} onClick={() => setFilter('all')}>All Events</button>
          <button className={filter === 'upcoming' ? 'active' : ''} onClick={() => setFilter('upcoming')}>Upcoming</button>
          <button className={filter === 'past' ? 'active' : ''} onClick={() => setFilter('past')}>Past</button>
        </div>
      </div>

      <div className='events-grid'>
        {filteredEvents.length > 0
          ? filteredEvents.map(event => (
              <div key={event.id} className='event-wrapper'>
                <Event
                  id={event.id}
                  title={event.title}
                  date={event.date}
                  time={event.time}
                  image={event.image}
                />
                {event.location_name && (
                  <p className='event-location'>
                    <i className='fa-solid fa-location-dot'></i> {event.location_name}
                  </p>
                )}
              </div>
            ))
          : <p className='no-events'>No events found.</p>
        }
      </div>
    </div>
  )
}

export default Events
