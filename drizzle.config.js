
/** @type { import("drizzle-kit").Config } */
import { config } from 'dotenv';
import { defineConfig } from "drizzle-kit";
config({ path: '.env' });


export default {
  client: '@neondatabase/serverless',
  dialect: "postgresql", // "mysql" | "sqlite" | "postgresql"
  schema: "./utils/schema.js",
  out: "./drizzle",
  dbCredentials:{
    url:'postgresql://neondb_owner:HxA3UJNTgrm6@ep-winter-dream-a58aghuh.us-east-2.aws.neon.tech/neondb?sslmode=require'
  }
};
