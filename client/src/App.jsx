import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Register from './pages/Register';
import Organizer from './pages/Organizer';
import { About, Schedule, Tickets, Gallery, Contact } from './pages/Pages';

export default function App() {
  return <Routes><Route element={<Layout/>}>
    <Route index element={<Home/>}/>
    <Route path="about" element={<About/>}/>
    <Route path="tickets" element={<Tickets/>}/>
    <Route path="schedule" element={<Schedule/>}/>
    <Route path="contact" element={<Contact/>}/>
    <Route path="gallery" element={<Gallery/>}/>
    <Route path="organizer" element={<Organizer/>}/>
    <Route path="register" element={<Register/>}/>
    <Route path="*" element={<main className="not-found"><h1>Page not found</h1><a href="/">Return home</a></main>}/>
  </Route></Routes>;
}
