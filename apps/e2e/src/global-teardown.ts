async function globalTeardown() {
  console.info('Global Teardown');
  const url = 'http://localhost:3000/delete-db';

  try {
    const response = await fetch(url);
    if (response.ok) {
      console.info('Database deleted successfully');
    } else {
      console.error(`Failed to delete database: ${response.status} ${response.statusText}`);
    }
  } catch (error) {
    console.error('Error deleting database:', error);
  }
}

export default globalTeardown;
