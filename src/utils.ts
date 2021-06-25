import {getReasonPhrase} from 'http-status-codes';
import {Response} from 'express'

export class Utils {

    /**
     * Writes an error the given express response. If no error description
     * is provided, the function selects an appropriate one from the default
     * HTTP error descriptions
     * @param resp  The express response
     * @param code  The status code of the error
     * @param desc  Optional: The error description
     */
    static error(resp: Response, code: number, desc?: string) {
        return resp.status(code).send({error: desc || getReasonPhrase(code)})
    }

}