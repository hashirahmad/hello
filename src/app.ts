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

class App {
    private port: number
    public app

    constructor() {
        this.port = config.PORT
        this.app = express()
    }

    private initMiddlewares() {
        const middlewares = [...cors, ...helmet, ...bodyParsing, ...docs]
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
        this.initMiddlewares()
        router.setUp()
        this.generateApiDocs()
        this.app.use('/', router.router)
        this.app.listen(this.port, () => {
            console.log(`Listening on port ${this.port}`)
        })
    }
}

new App().run()
