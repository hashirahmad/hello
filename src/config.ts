import * as dotenv from 'dotenv'
import { cleanEnv, port, str } from 'envalid'

/**
 * We will configure all environment variables.
 * `envalid` will throw an error, if we forget
 * to provide any of the defined variables or
 * if they’re of the wrong types.
 */
function configure() {
    dotenv.config()
    const config = cleanEnv(process.env, {
        NODE_ENV: str(),
        PORT: port(),
    })
    return config
}

export default configure()
