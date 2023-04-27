import { httpCode, ApiError } from '@/utils/apiError'
import { Request, Response, NextFunction } from 'express'

class ErrorHandling {
    private isTrustedError(err: Error): boolean {
        if (err instanceof ApiError) {
            return err.isOperational
        }

        return false
    }

    /**
     * This is where we handle those errors such as `ApiError` and we
     * directly sent the contents back to the client.
     */
    private handleTrustedError(error: ApiError, response: Response): void {
        response.status(error.httpCode).json(error)
    }

    /**
     * This is where we handle those unexpected errors like `Error`. It could be
     * anything we are not deliberately throwing ourselves.
     */
    private handleCriticalError(err: Error | ApiError, response?: Response): void {
        if (response) {
            response.status(httpCode.INTERNAL_SERVER_ERROR).json({ message: 'Uh-oh! We just encountered a hiccup . . .' })
        } else {
            console.log('Application encountered a critical error. Exiting')
            process.exit(1)
        }
    }

    /** Handle the actual error and deals with it appropriately */
    public handle(err: Error | ApiError, req: Request, res: Response, next: NextFunction): void {
        if (this.isTrustedError(err) && res) {
            this.handleTrustedError(err as ApiError, res)
        } else {
            this.handleCriticalError(err, res)
        }
    }
}

const errHandling = new ErrorHandling()

function handle(err: Error | ApiError, req: Request, res: Response, next: NextFunction): void {
    errHandling.handle(err, req, res, next)
}

export default [handle]
