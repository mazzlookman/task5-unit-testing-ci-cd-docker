type APIResponse = {
    code: number,
    status: string,
    data: any
}

export function toAPIResponse(code: number, status: string, data: any): APIResponse {
    return {
        code: code,
        status: status,
        data: data
    }
}

