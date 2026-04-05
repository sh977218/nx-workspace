async function globalSetup() {
  console.info('\nGlobal setup\n');
  const DATABASE_NAME = process.env['DATABASE_NAME'];
  const DATABASE_HOST = process.env['DATABASE_HOST'];
  console.info(`DATABASE_NAME ${DATABASE_NAME}`);
  console.info(`DATABASE_HOST ${DATABASE_HOST}`);
}

export default globalSetup;
