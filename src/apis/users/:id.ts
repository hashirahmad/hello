import { Request, Response } from 'express'
import users from '@/utils/data'

/**
 * @api {get} /users/:id Get specific user
 * @apiVersion 0.1.0
 * @apiName GetSpecificUser
 * @apiGroup Users
 *
 * @apiDescription This will return a user by the specified user id.
 *
 * @apiQuery {String} id The Users-ID.
 *
 * @apiSuccessExample Success-Response: HTTP/1.1 200 OK
 *     {
 *     }
 * @apiError UserNotFound User not found.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "UserNotFound"
 *     }
 */
async function get(req: Request, res: Response) {
    const user = users.find(u => u.id === parseInt(req.params.id))
    if (user) {
        res.status(200).json(user)
    } else {
        res.status(404).json({
            error: 'User not found',
        })
    }
}

export default { get }
