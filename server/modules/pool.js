//Needed in order to connect to a postgres database
import pg from 'pg';

//Configures connection to database
const config = {
  database: 'weekend-to-do-app', 
  host: 'localhost', 
  port: 5432, 
  max: 10, 
  idleTimeoutMillis: 30000 
};

const pool = new pg.Pool(config);

//What to do when database is connected
pool.on("connect", () => {
  console.log("connected to postgres");
});

//What to do if it fails to connect
pool.on("error", (err) => {
  console.log("error connecting to postgres", err);
});

export default pool;