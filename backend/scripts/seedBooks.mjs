import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Book from '../src/models/Book.js';

dotenv.config();

const books = [
  {
    title: 'Cien años de soledad',
    author: 'Gabriel García Márquez',
    isbn: '9780060883287',
    genre: 'Ficción',
    description: 'La historia de la familia Buendía a lo largo de siete generaciones en el pueblo mítico de Macondo.',
    totalCopies: 5,
    availableCopies: 5,
    publishedYear: 1967,
    publisher: 'Editorial Sudamericana',
  },
  {
    title: 'El Aleph',
    author: 'Jorge Luis Borges',
    isbn: '9789500404210',
    genre: 'Ficción',
    description: 'Colección de cuentos fantásticos que exploran temas como el infinito, los espejos y los laberintos.',
    totalCopies: 3,
    availableCopies: 3,
    publishedYear: 1949,
    publisher: 'Losada',
  },
  {
    title: 'Don Quijote de la Mancha',
    author: 'Miguel de Cervantes',
    isbn: '9788420412146',
    genre: 'Clásico',
    description: 'Las aventuras del caballero andante Alonso Quijano, quien se cree el caballero Don Quijote de la Mancha.',
    totalCopies: 4,
    availableCopies: 4,
    publishedYear: 1605,
    publisher: 'Real Academia Española',
  },
  {
    title: '1984',
    author: 'George Orwell',
    isbn: '9780451524935',
    genre: 'Distopía',
    description: 'Una novela distópica sobre una sociedad totalitaria donde el Gran Hermano lo controla todo.',
    totalCopies: 6,
    availableCopies: 6,
    publishedYear: 1949,
    publisher: 'Secker & Warburg',
  },
  {
    title: 'El señor de los anillos',
    author: 'J.R.R. Tolkien',
    isbn: '9780618640157',
    genre: 'Fantasía',
    description: 'La épica aventura de Frodo Bolsón para destruir el Anillo Único y salvar la Tierra Media.',
    totalCopies: 4,
    availableCopies: 4,
    publishedYear: 1954,
    publisher: 'George Allen & Unwin',
  },
  {
    title: 'Orgullo y prejuicio',
    author: 'Jane Austen',
    isbn: '9780141439518',
    genre: 'Romance',
    description: 'La historia de Elizabeth Bennet y el señor Darcy en la Inglaterra del siglo XIX.',
    totalCopies: 3,
    availableCopies: 3,
    publishedYear: 1813,
    publisher: 'T. Egerton',
  },
  {
    title: 'Crimen y castigo',
    author: 'Fiódor Dostoyevski',
    isbn: '9780140449136',
    genre: 'Novela psicológica',
    description: 'El estudiante Raskolnikov comete un asesinato y lucha con las consecuencias psicológicas y morales.',
    totalCopies: 2,
    availableCopies: 2,
    publishedYear: 1866,
    publisher: 'The Russian Messenger',
  },
  {
    title: 'Rayuela',
    author: 'Julio Cortázar',
    isbn: '9788437604572',
    genre: 'Ficción',
    description: 'Una novela experimental que puede leerse de múltiples maneras, siguiendo las peripecias de Horacio Oliveira.',
    totalCopies: 3,
    availableCopies: 3,
    publishedYear: 1963,
    publisher: 'Sudamericana',
  },
  {
    title: 'El nombre de la rosa',
    author: 'Umberto Eco',
    isbn: '9788423340472',
    genre: 'Misterio',
    description: 'Un monje franciscano investiga una serie de muertes en una abadía medieval italiana.',
    totalCopies: 2,
    availableCopies: 2,
    publishedYear: 1980,
    publisher: 'Bompiani',
  },
  {
    title: 'El principito',
    author: 'Antoine de Saint-Exupéry',
    isbn: '9780156012195',
    genre: 'Literatura infantil',
    description: 'Un pequeño príncipe de un asteroide visita la Tierra y hace reflexionar sobre la vida y el amor.',
    totalCopies: 7,
    availableCopies: 7,
    publishedYear: 1943,
    publisher: 'Reynal & Hitchcock',
  },
];

async function main() {
  const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/library';
  await mongoose.connect(MONGODB_URI);
  console.log('Conectado a MongoDB');

  let created = 0;
  let skipped = 0;

  for (const book of books) {
    const exists = await Book.findOne({ isbn: book.isbn });
    if (!exists) {
      await Book.create(book);
      console.log(`Libro creado: "${book.title}" (${book.author})`);
      created++;
    } else {
      console.log(`Ya existe: "${book.title}"`);
      skipped++;
    }
  }

  console.log(`\nResumen: ${created} libros creados, ${skipped} omitidos.`);
  await mongoose.disconnect();
  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
