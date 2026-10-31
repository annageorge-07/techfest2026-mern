
import React, { useEffect, useState } from 'react';
import { ArrowRight, CalendarDays, MapPin, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import api from '../services/api';

const fallback = [
  {
    _id: '1',
    title: 'Robo Wars',
    category: 'Robotics',
    date: 'SEP 10',
    description: 'Build and battle combat robots.'
  },
  {
    _id: '2',
    title: 'AI Hackathon',
    category: 'Coding',
    date: 'SEP 11',
    description: 'A challenge for the next generation of innovators.'
  },
  {
    _id: '3',
    title: 'Startup Pitch',
    category: 'Business',
    date: 'SEP 12',
    description: 'Pitch your ideas and turn them into reality.'
  }
];

export default function Home() {
  const [events, setEvents] = useState(fallback);
  const [query, setQuery] = useState('');

  useEffect(() => {
    api.get('/events')
      .then(({ data }) => {
        const eventList = Array.isArray(data)
          ? data
          : Array.isArray(data?.events)
            ? data.events
            : [];

        setEvents(eventList.length > 0 ? eventList : fallback);
      })
      .catch((error) => {
        console.error('Failed to fetch events:', error);
        setEvents(fallback);
      });
  }, []);

  const filtered = events.filter((event) =>
    `${event.title || ''} ${event.category || ''}`
      .toLowerCase()
      .includes(query.toLowerCase())
  );

  return (
    <>
      <section className="hero">
        <div className="hero-glow" />

        <div className="hero-content">
          <span className="eyebrow">
            <Sparkles size={14} />
            THE TECHFEST EXPERIENCE
          </span>

          <h1>
            The Future of<br />
            <em>Innovation</em> is Here.
          </h1>

          <p>
            Experience the future of technology, robotics and startups.
            Three days. Infinite possibilities.
          </p>

          <div className="hero-meta">
            <span>
              <CalendarDays size={17} />
              SEPTEMBER 10–12, 2026
            </span>

            <span>
              <MapPin size={17} />
              THIRUVANANTHAPURAM, INDIA
            </span>
          </div>

          <div className="hero-actions">
            <Link className="button primary" to="/register">
              Register now <ArrowRight size={17} />
            </Link>

            <Link className="button ghost" to="/schedule">
              Explore schedule
            </Link>
          </div>
        </div>

        <div className="hero-index">
          <span>01 / 03</span>
          <span className="index-line" />
        </div>
      </section>

      <section className="section section-events">
        <div className="section-heading">
          <div>
            <span className="eyebrow">WHAT'S HAPPENING</span>
            <h2>
              Featured events<span className="accent">.</span>
            </h2>
          </div>

          <input
            className="search-input"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search events..."
            aria-label="Search events"
          />
        </div>

        <div className="event-grid">
          {filtered.map((event, i) => (
            <article className="event-card" key={event._id || i}>
              <div className="event-number">
                {String(i + 1).padStart(2, '0')}
              </div>

              <span className="event-category">
                {event.category || 'General'}
              </span>

              <h3>{event.title || 'Untitled Event'}</h3>

              <p>
                {event.description || 'More details coming soon.'}
              </p>

              <div className="event-bottom">
                <span>{event.date || 'Date to be announced'}</span>

                <Link
                  to="/schedule"
                  aria-label={`View ${event.title || 'event'}`}
                >
                  <ArrowRight size={18} />
                </Link>
              </div>
            </article>
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="empty-message">
            No events found. Try another search.
          </p>
        )}

        <div className="center-action">
          <Link className="text-link" to="/schedule">
            View complete schedule <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      <section className="statement">
        <span className="eyebrow">THINK. BUILD. INSPIRE.</span>

        <h2>
          Where bold ideas<br />
          become <em>real-world</em> impact.
        </h2>

        <Link className="button light" to="/about">
          Discover INSIGNIA <ArrowRight size={17} />
        </Link>
      </section>
    </>
  );
}
