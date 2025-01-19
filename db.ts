import { drizzle } from 'drizzle-orm/neon-serverless';
import ws from 'ws';

export const db = drizzle({
  connection: "postgresql://neondb_owner:EslOijvI70kJ@ep-misty-cherry-a1ybs4ib.ap-southeast-1.aws.neon.tech/neondb?sslmode=require",
  ws: ws,
});
