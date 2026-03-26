// Script para crear usuarios en la base de datos (ESM)
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import User from '../src/models/User.js';

dotenv.config();

async function main() {
  const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/library';
  await mongoose.connect(MONGODB_URI);

  const users = [
    {
      name: 'Admin',
      email: 'admin@biblioteca.com',
      password: 'admin123',
      role: 'admin',
    },
    {
      name: 'Bibliotecario',
      email: 'librarian@biblioteca.com',
      password: 'librarian123',
      role: 'librarian',
    },
    {
      name: 'Usuario',
      email: 'usuario@biblioteca.com',
      password: 'usuario123',
      role: 'user',
    },
  ];

  for (const user of users) {
    const exists = await User.findOne({ email: user.email });
    if (!exists) {
      await User.create(user);
      console.log(`Usuario creado: ${user.email} (${user.role})`);
    } else {
      console.log(`Ya existe: ${user.email}`);
    }
  }

  await mongoose.disconnect();
  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
