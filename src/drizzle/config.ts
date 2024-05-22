import { drizzle } from 'drizzle-orm/node-postgres';

import { Pool } from 'pg';

const pool = new Pool({
    connectionString: process.env.SUPABASE_CONNECTION_STRING
});

const db = drizzle(pool);

export default db;


