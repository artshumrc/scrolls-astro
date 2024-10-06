import fs from 'fs';

// Load the scrolls data
const scrollsData = JSON.parse(fs.readFileSync('./src/data/scrolls_master_list.json', 'utf-8'));

// Function to find duplicate IDs in the scrolls data
function findDuplicateIds(data) {
  const ids = data.map(item => item.id);
  const duplicates = ids.filter((id, index) => ids.indexOf(id) !== index);
  return [...new Set(duplicates)]; // Return unique duplicates
}

// Run the duplicate check
const duplicateIds = findDuplicateIds(scrollsData);

if (duplicateIds.length > 0) {
  console.error('Duplicate IDs found:', duplicateIds);
  process.exit(1); // Exit with an error code
} else {
  console.log('No duplicate IDs found.');
}
