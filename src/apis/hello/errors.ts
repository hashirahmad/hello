import { ApiError } from '@/utils/apiError'
import logger from '@/utils/logger'
import { Request, Response } from 'express'

/**
 * @api {get} /hello/errors See how errors are handled
 * @apiVersion 0.1.0
 * @apiName errors
 * @apiGroup Hello
 *
 * @apiDescription This is just an API to showcase how errors are handled.
 *
 * @apiSuccessExample Success-Response: HTTP/1.1 200 OK
 *     {
 *     }
 */
async function get(req: Request, res: Response) {
    const getUserFromDb = () => {
        return new Promise(() => {
            throw new ApiError({
                description: 'Hi there',
                details: { b: true },
            })
        })
    }
    logger.err('This is an error log', { hello: true })
    logger.warn('This is a warn log')
    logger.info('This is a info log')
    logger.http('This is a http log', { j: { h: { g: true } } })
    logger.debug('This is a debug log')
    // throw new Error('Hello this is deliberate error. Noting to worry.')
    await getUserFromDb()
}

export default { get }
