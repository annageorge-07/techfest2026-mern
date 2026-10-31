import { Router } from 'express';
import Task from '../models/Task.js';
import { protect } from '../middleware/auth.js';

const router = Router();
router.use(protect);

router.get('/', async (req, res, next) => {
  try { res.json({ tasks: await Task.find().sort({ createdAt: -1 }) }); }
  catch (error) { next(error); }
});

router.post('/', async (req, res, next) => {
  try {
    const title = String(req.body.title || '').trim();
    if (!title) return res.status(400).json({ message: 'Task title is required.' });
    const task = await Task.create({ title });
    res.status(201).json({ task });
  } catch (error) { next(error); }
});

router.patch('/:id', async (req, res, next) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, { completed: Boolean(req.body.completed) }, { new: true, runValidators: true });
    if (!task) return res.status(404).json({ message: 'Task not found.' });
    res.json({ task });
  } catch (error) { next(error); }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) return res.status(404).json({ message: 'Task not found.' });
    res.json({ message: 'Task deleted.' });
  } catch (error) { next(error); }
});

export default router;
