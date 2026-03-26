// Script para eliminar el usuario admin de la base de datos
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import User from '../src/models/User.js';

dotenv.config();

async function main() {
  const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/library';
  await mongoose.connect(MONGODB_URI);

  const result = await User.deleteOne({ email: 'admin@biblioteca.com' });
  if (result.deletedCount > 0) {
    console.log('Usuario admin eliminado');
  } else {
    console.log('No se encontró el usuario admin');
  }

  await mongoose.disconnect();
  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
