import { UserException } from './exceptionHandler'
import { ResponseHandler } from './responseHandler'
import fetch from 'isomorphic-fetch'
import HttpCode from './httpCode'

const refreshAccessToken = async (refresh) => {
    const isServer = (typeof window === 'undefined')
    const apidomain = isServer ? 'INTERNAL_API_DOMAIN' : 'API_SERVER_URL'
    const response = await fetch(`${apidomain}/token/refresh/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ refresh })
    })
    if (response && response.status === HttpCode.OK) {
        const result = await response.json()
        if (!isServer) {
            await unAuthPost(
                '/api/token/refresh',
                {
                    refresh,
                    access: result.access
                }
            )
        }
        return result
    }
    throw UserException(response.status, 'Refresh access token failed.')
}

const authFetch = (url, params) => async (accessToken) => {
    if (accessToken) {
        params.headers = params.headers || {}
        params.headers.Authorization = `Bearer ${accessToken}`
        const res = await fetch(url, params)
        return ResponseHandler(url, res)
    }
    throw UserException(HttpCode.BAD_REQUEST, 'User token is null')
}

const autoRetryAuthRequest = async (auth, authRequest) => {
    if (!authRequest || !auth) {
        return
    }

    let reqErr = null
    let response = null
    try {
        console.log('  [autoRetryAuthRequest]:', 'retry time [1], ', auth.access)
        response = await authRequest(auth.access)
        return response
    } catch (err) {
        reqErr = err
    }

    if (reqErr.status === HttpCode.UNAUTHORIZED) {
        console.log('  [autoRetryAuthRequest]:', 'retry time [1] auth failed.')
        try {
            response = await refreshAccessToken(auth.refresh)
        } catch (err) {
            console.error(err)
            if (auth.onChange) {
                auth.onChange(null)
            }
            throw err
        }

        if (response && response.access) {
            if (auth.onChange) {
                auth.onChange(response)
            }
            try {
                console.log('  [autoRetryAuthRequest]:', 'retry time [2], ', response.access)
                response = await authRequest(response.access)
                return response
            } catch (err) {
                reqErr = err
            }
        } else {
            throw UserException(HttpCode.INTERNAL_SERVER_ERROR, 'Response is null')
        }
    }
    throw reqErr
}

export const unAuthGet = async (url) => {
    const response = await fetch(url, {
        method: 'GET'
    })
    return ResponseHandler(url, response)
}

export const unAuthPost = async (url, body) => {
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    })
    return ResponseHandler(url, response)
}

export const get = async (url, headers, auth) => {
    return autoRetryAuthRequest(
        auth,
        authFetch(url, {
            method: 'GET',
            headers: headers || {}
        })
    )
}

export const post = async (url, body, auth) => {
    return autoRetryAuthRequest(
        auth,
        authFetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })
    )
}

export const postFormData = async (url, formData, auth) => {
    return autoRetryAuthRequest(
        auth,
        authFetch(url, {
            method: 'POST',
            body: formData
        })
    )
}

export const put = async (url, body, auth) => {
    return autoRetryAuthRequest(
        auth,
        authFetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })
    )
}

export const putFormData = async (url, formData, auth) => {
    return autoRetryAuthRequest(
        auth,
        authFetch(url, {
            method: 'PUT',
            body: formData
        })
    )
}

export const Delete = async (url, headers, auth) => {
    return autoRetryAuthRequest(
        auth,
        authFetch(url, {
            method: 'DELETE',
            headers: headers || {}
        })
    )
}
