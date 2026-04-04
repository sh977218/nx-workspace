const isCI = !!process.env['CI'];
const baseURL = isCI ? 'http://localhost:3000' : 'http://localhost:4200';

async function globalTeardown() {
  console.info('Global Teardown');
  try {
    const response = await fetch(`${baseURL}/delete-db`, {});
    if (response.ok) {
      console.info('Database deleted successfully');
    } else {
      console.error(
        `Failed to delete database: ${response.status} ${response.statusText}`,
      );
    }
  } catch (error) {
    console.error('Error deleting database:', error);
  }
}

export default globalTeardown;
