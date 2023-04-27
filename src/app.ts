/** Required External Modules */
import express from 'express'
import router from './router'
import docs from './middlewares/docs'
import cors from './middlewares/cors'
import bodyParsing from './middlewares/bodyParsing'
import helmet from './middlewares/helmet'
import path from 'path'
import { createDoc } from 'apidoc'
import config from './config'
require('express-async-errors')
import errorHandling from './middlewares/errorHandling'

class App {
    private port: number
    public app

    constructor() {
        this.port = config.PORT
        this.app = express()
    }

    /**
     * This must be done last i.e. no more
     * use of `app.use(...)` afterwards. The
     * `errorHandling` will not work otherwise.
     */
    private initMiddlewares() {
        const middlewares = [
            ...cors,
            ...helmet,
            ...bodyParsing,
            ...docs,
            /**
             * This must be done as THE LAST middleware. Otherwise
             * error handling will not work.
             */
            ...errorHandling,
        ]
        this.app.use(middlewares)
    }

    private generateApiDocs() {
        const doc = createDoc({
            src: path.resolve(__dirname, 'apis'),
            dest: path.resolve(__dirname, '../', 'docs'),
            colorize: true,
            config: path.resolve(__dirname, './docs.ts'),
        })

        if (typeof doc !== 'boolean') {
            console.log('API Docs generated')
        }
    }

    public async run() {
        router.setUp()
        this.generateApiDocs()
        this.app.use('/', router.router)
        this.initMiddlewares()
        this.app.listen(this.port, () => {
            console.log(`Listening on port ${this.port}`)
        })
    }
}

new App().run()
