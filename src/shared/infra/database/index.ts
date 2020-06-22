import { createConnection, Connection } from 'typeorm';

/*
   createConnection will load connection
   options from environtment variables
*/
const connection: Promise<Connection> = createConnection().then(async conn => {
  await conn.runMigrations();
  return conn;
});

export default connection;
