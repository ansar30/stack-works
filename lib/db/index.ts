import { neon, NeonQueryFunction } from "@neondatabase/serverless";

export class DatabaseConfigurationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "DatabaseConfigurationError";
  }
}

/**
 * Returns a Neon SQL execution function configured with process.env.DATABASE_URL.
 * Throws DatabaseConfigurationError explicitly if DATABASE_URL is unconfigured.
 */
export function getDb(): NeonQueryFunction<boolean, boolean> {
  const connectionString = process.env.DATABASE_URL;

  if (!connectionString || connectionString.trim() === "") {
    throw new DatabaseConfigurationError(
      "Database configuration required: DATABASE_URL is not set. Please add a valid Neon PostgreSQL connection string to your environment variables."
    );
  }

  return neon(connectionString);
}
