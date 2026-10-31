import { Router } from 'express';
import Event from '../models/Event.js';
import { protect } from '../middleware/auth.js';

const router = Router();

router.get('/', async (req, res, next) => {
  try {
    const events = await Event.find({ active: true }).sort({ createdAt: 1 });
    res.json({ events });
  } catch (error) { next(error); }
});

router.post('/', protect, async (req, res, next) => {
  try {
    const { title, category, date, description } = req.body;
    if (!title || !category || !date || !description) return res.status(400).json({ message: 'All event fields are required.' });
    const event = await Event.create({ title, category, date, description });
    res.status(201).json({ event });
  } catch (error) { next(error); }
});

router.delete('/:id', protect, async (req, res, next) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);
    if (!event) return res.status(404).json({ message: 'Event not found.' });
    res.json({ message: 'Event deleted.' });
  } catch (error) { next(error); }
});

export default router;
