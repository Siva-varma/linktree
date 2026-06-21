import dotenv from "dotenv";
dotenv.config();
import z from "zod";

const envSchema = z.object({
  PORT: z.coerce.number(),
  NODE_ENV: z.enum(["development", "production"]),
  MONGO_URI: z.string(),
  JWT_EXPIRES_IN: z.string(),
  JWT_SECRET: z.string(),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.log("check your env's");
}

export default parsed.data;
