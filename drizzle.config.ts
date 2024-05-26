import { defineConfig, Config } from 'drizzle-kit'

export default defineConfig({
    schema: './src/db/schema.ts',
    out: './drizzle/migrations',
    dialect: 'postgresql',
    dbCredentials: {
        url: process.env.SUPABASE_CONNECTION_STRING
    }
} as Config) // Add 'as Config' to explicitly specify the type
