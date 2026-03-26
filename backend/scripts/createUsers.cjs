// Script para crear usuarios en la base de datos (CommonJS)
require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const path = require('path');
const { createRequire } = require('module');
const requireEsm = createRequire(import.meta?.url || __filename);
const User = requireEsm(path.resolve(__dirname, '../src/models/User.js')).default;

async function main() {
  const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/library';
  await mongoose.connect(MONGODB_URI);

  const users = [
    {
      name: 'Admin',
      email: 'admin@biblioteca.com',
      password: await bcrypt.hash('admin123', 10),
      role: 'admin',
    },
    {
      name: 'Bibliotecario',
      email: 'librarian@biblioteca.com',
      password: await bcrypt.hash('librarian123', 10),
      role: 'librarian',
    },
    {
      name: 'Usuario',
      email: 'usuario@biblioteca.com',
      password: await bcrypt.hash('usuario123', 10),
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
