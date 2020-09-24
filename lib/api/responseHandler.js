import { UserException } from './exceptionHandler'
import HttpCode from './httpCode'

export const ResponseHandler = async (url, response) => {
    let resMessage = ''
    if (!response) {
        throw UserException(HttpCode.GONE, 'Response is null')
    }

    switch (response.status) {
    case HttpCode.OK:
    case HttpCode.CREATED:
        try {
            resMessage = await response.json()
            return resMessage
        } catch (error) {
            console.warn(`[ResponseHandler] status is ${response.status} but response body is not JSON. url: ${url} response: ${JSON.stringify(response)}`)
        }
        return
    case HttpCode.ACCEPTED:
    case HttpCode.NO_CONTENT:
        console.log('[ResponseHandler] res status = ', response.status)
        return
    case HttpCode.UNAUTHORIZED:
        console.error(`API request failed. url: ${url}, statusCode: ${response.status}`)
        throw UserException(response.status, "Seems you've typed in wrong credentials! Please try again. ")
    case HttpCode.BAD_REQUEST:
    case HttpCode.NOT_FOUND:
    case HttpCode.CONFLICT:
    case HttpCode.GONE:
    case HttpCode.UNSUPPORTED_MEDIA_TYPE:
        try {
            resMessage = await response.json()
        } catch (error) {
            // Skip error
        }
        console.error(`API request failed. url: ${url}, statusCode: ${response.status}`)
        throw UserException(response.status, resMessage || 'Something wierd happened, please try again later.')

    case HttpCode.INTERNAL_SERVER_ERROR:
        console.error(`API receive 500Error. url: ${url}`)
        throw UserException(response.status, 'Something went wrong in our server, please try again later.')

    default: {
        console.error(`Unhandle API error. url: ${url}, res = ${JSON.stringify(response)}`)
        throw UserException(0, 'Unhandle error')
    }
    }
}
