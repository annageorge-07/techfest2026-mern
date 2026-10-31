import 'dotenv/config';
import mongoose from 'mongoose';
import User from '../models/User.js';

async function run() {
  try {
    if (!process.env.MONGO_URI || !process.env.ADMIN_EMAIL || !process.env.ADMIN_PASSWORD || !process.env.JWT_SECRET) {
      throw new Error('Set MONGO_URI, JWT_SECRET, ADMIN_EMAIL and ADMIN_PASSWORD in server/.env first.');
    }
    if (process.env.ADMIN_PASSWORD.length < 12) throw new Error('ADMIN_PASSWORD must contain at least 12 characters.');
    await mongoose.connect(process.env.MONGO_URI);
    const email = process.env.ADMIN_EMAIL.trim().toLowerCase();
    const existing = await User.findOne({ email });
    if (existing) {
      console.log(`Organizer account already exists for ${email}. No changes made.`);
    } else {
      await User.create({ name: process.env.ADMIN_NAME || 'INSIGNIA Organizer', email, password: process.env.ADMIN_PASSWORD });
      console.log(`Organizer account created for ${email}.`);
    }
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
}
run();
