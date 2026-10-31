import React from 'react';
import { NavLink, Link, Outlet } from 'react-router-dom';
import { Instagram, Mail, Menu, X } from 'lucide-react';
import { useState } from 'react';

const links = [
  ['ABOUT', '/about'],
  ['TICKETS', '/tickets'],
  ['SCHEDULE', '/schedule'],
  ['CONTACT US', '/contact'],
  ['GALLERY', '/gallery'],
  ['ORGANIZER', '/organizer']
];

export default function Layout() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <header className="site-header">
        <Link className="brand" to="/">INSIGNIA <span>2026</span></Link>
        <button className="mobile-menu" onClick={() => setOpen(!open)} aria-label="Toggle menu">
          {open ? <X /> : <Menu />}
        </button>
        <nav className={open ? 'nav-links open' : 'nav-links'}>
          {links.map(([label, path]) => (
            <NavLink key={path} to={path} onClick={() => setOpen(false)}>{label}</NavLink>
          ))}
          <Link className="nav-cta" to="/register" onClick={() => setOpen(false)}>REGISTER</Link>
        </nav>
      </header>
      <main><Outlet /></main>
      <footer className="footer">
        <div><Link className="brand" to="/">INSIGNIA <span>2026</span></Link><p>The future of innovation is here.</p></div>
        <div className="footer-links"><Link to="/about">About</Link><Link to="/schedule">Schedule</Link><Link to="/register">Register</Link><Link to="/contact">Contact</Link></div>
        <div className="socials"><a href="https://instagram.com" target="_blank" rel="noreferrer"><Instagram size={18}/></a><a href="mailto:info@insignia2026.example"><Mail size={18}/></a></div>
        <small>© 2026 INSIGNIA. All rights reserved.</small>
      </footer>
    </>
  );
}
