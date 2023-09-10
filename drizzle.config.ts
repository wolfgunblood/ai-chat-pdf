import type { Config } from "drizzle-kit";
import * as dotenv from "dotenv";
dotenv.config({path: ".env"});

// This is a sample config file. You can use it to test your application.
export default {
    driver: "pg",
    schema: "./src/lib/db/schema.ts",
    dbCredentials: {
        connectionString: process.env.DATABASE_URL!,
    },
} satisfies Config;