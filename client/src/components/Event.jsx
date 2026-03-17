import React from 'react'
import '../css/Event.css'

const formatTime = (timeStr) => {
  if (!timeStr) return ''
  const [hours, minutes] = timeStr.split(':')
  const h = parseInt(hours)
  const ampm = h >= 12 ? 'PM' : 'AM'
  const displayH = h % 12 || 12
  return `${displayH}:${minutes} ${ampm}`
}

const formatRemainingTime = (dateStr, timeStr) => {
  if (!dateStr || !timeStr) return ''
  const datePart = dateStr.slice(0, 10)
  const eventDateTime = new Date(`${datePart}T${timeStr}`)
  const now = new Date()
  const diff = eventDateTime - now

  if (diff < 0) return 'Event has passed'

  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))

  if (days > 0) return `${days}d ${hours}h remaining`
  if (hours > 0) return `${hours}h ${minutes}m remaining`
  return `${minutes}m remaining`
}

const Event = ({ id, title, date, time, image }) => {
  const formattedDate = date
    ? new Date(date.slice(0, 10)).toLocaleDateString('en-US', {
        month: 'long', day: 'numeric', year: 'numeric', timeZone: 'UTC'
      })
    : ''
  const formattedTime = formatTime(time)
  const remaining = formatRemainingTime(date, time)
  const isPast = date && time && new Date(`${date.slice(0, 10)}T${time}`) < new Date()

  return (
    <article className='event-information'>
      <img src={image} alt={title} />

      <div className='event-information-overlay'>
        <div className='text'>
          <h3>{title}</h3>
          <p>
            <i className='fa-regular fa-calendar fa-bounce'></i>{' '}
            {formattedDate} <br /> {formattedTime}
          </p>
          <p id={`remaining-${id}`} style={isPast ? { color: '#ff6b6b' } : {}}>
            {remaining}
          </p>
        </div>
      </div>
    </article>
  )
}

export default Event
