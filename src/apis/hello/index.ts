import { Request, Response } from 'express'

/**
 * @api {get} /hello Hello World
 * @apiVersion 0.1.0
 * @apiName hello
 * @apiGroup Hello
 *
 * @apiDescription This is just a hello world API.
 *
 * @apiSuccessExample Success-Response: HTTP/1.1 200 OK
 *     {
 *     }
 */
async function get(req: Request, res: Response) {
    res.status(200).send('Hello World')
}

export default { get }
