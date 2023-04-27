import { Router } from 'express'
import * as fs from 'fs'
import * as path from 'path'

class router {
    public router
    private apisDirectory: string

    constructor() {
        this.router = Router()
        this.apisDirectory = path.join(__dirname, 'apis')
    }

    /**
     * This will look up API definitions in the given `dir`
     * and will set up that API with the `router` so it is
     * exposed.
     */
    private setUpApisRecursively(dir: string) {
        const files = fs.readdirSync(dir)
        files.forEach(file => {
            const filePath = path.join(dir, file)
            const stats = fs.statSync(filePath)
            if (stats.isDirectory()) {
                this.setUpApisRecursively(filePath)
            } else if (stats.isFile() && file.endsWith('.ts')) {
                const { default: api } = require(filePath)
                const routePath = filePath
                    /** Remove the base directory */
                    .replace(this.apisDirectory, '')
                    /** Remove the file extension */
                    .replace('.ts', '')
                    /** Replace backslashes with forward slashes */
                    .replace(/\\/g, '/')
                    /** `folder/index` => `/folder` path */
                    .replace(/index/g, '')
                if (api.get) {
                    this.router.get(routePath, api.get)
                }
                if (api.post) {
                    this.router.post(routePath, api.post)
                }
                if (api.put) {
                    this.router.put(routePath, api.put)
                }
                if (api.delete) {
                    this.router.delete(routePath, api.delete)
                }
            }
        })
    }

    /**
     * This will set up so that by default, we redirect users to the
     * API docs. The `/healthz` is required for K8s deployments.
     */
    private requiredAPIs() {
        this.router.get('/healthz', (req, res) => res.status(200).send('ok'))
    }

    public setUp() {
        this.setUpApisRecursively(this.apisDirectory)
        this.requiredAPIs()
    }
}

export default new router()
