import { Router } from 'express';
import Registration from '../models/Registration.js';
import { protect } from '../middleware/auth.js';

const router = Router();

router.post('/', async (req, res, next) => {
  try {
    const { name, email, phone, role } = req.body;
    if (!name || !email || !phone || !role) return res.status(400).json({ message: 'All fields are required.' });
    const normalizedEmail = String(email).trim().toLowerCase();
    const exists = await Registration.exists({ email: normalizedEmail });
    if (exists) return res.status(409).json({ message: 'This email is already registered.' });
    const registration = await Registration.create({ name, email: normalizedEmail, phone, role });
    res.status(201).json({ message: 'Registration successful. Your details have been saved.', registrationId: registration._id });
  } catch (error) {
    if (error.code === 11000) return res.status(409).json({ message: 'This email is already registered.' });
    next(error);
  }
});

router.get('/', protect, async (req, res, next) => {
  try {
    const registrations = await Registration.find().sort({ createdAt: -1 }).select('-__v');
    res.json({ registrations });
  } catch (error) { next(error); }
});

export default router;
