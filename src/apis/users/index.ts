import { Request, Response } from 'express'
import users from '@/utils/data'

/**
 * @api {get} /users Get all the users
 * @apiVersion 0.1.0
 * @apiName Users
 * @apiGroup Users
 *
 * @apiDescription Will return all users.
 *
 * @apiSuccessExample Success-Response: HTTP/1.1 200 OK
 *     {
 *     }
 */
async function get(req: Request, res: Response) {
    res.status(200).json(users)
}

export default { get }
