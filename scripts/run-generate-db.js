import { generateDatabase } from './generate-orama-db.js';

async function run() {
  try {
    await generateDatabase();
    console.log('Database generation completed successfully.');
  } catch (error) {
    console.error('Error generating database:', error);
  }
}

run();