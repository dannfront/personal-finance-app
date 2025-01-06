import env from "env-var"
import "dotenv/config"

export const envs = {
    MONGO_URL: env.get('MONGO_URL').required().asString(),
    kEY_SECRET_AWS: env.get("kEY_SECRET_AWS").required().asString(),
    KEY_ACCES_AWS: env.get("KEY_ACCES_AWS").required().asString(),
    AWS_BUCKET_NAME: env.get("AWS_BUCKET_NAME").required().asString(),
    SECRET_KEY_JWT: env.get("SECRET_KEY_JWT").required().asString(),
    ORIGIN_URL: env.get("ORIGIN_URL").required().asString(),
    PORT: env.get("PORT").required().asInt()
}