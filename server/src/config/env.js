import dotenv from 'dotenv'
dotenv.config()
import z from 'zod'

const envSchema = z.object({
 PORT: z.coerce.number(),
 NODE_ENV: z.enum(["development", "production"]),
 MONGO_URI: z.string(),
 CORS_ORIGIN: z.string(),
})

const parsed = envSchema.safeParse(process.env)

if(!parsed.success){
    console.log("check your env's")
}

export default parsed.data