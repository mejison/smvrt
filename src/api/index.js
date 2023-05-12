const API_ENDPOINT = 'https://smvrt-api.local'

export function signup(data) {
        return fetch(API_ENDPOINT + "/api/auth/register", {
            method: "POST",
            body: JSON.stringify({
                ...data,
            }),
            headers: {
                "content-type": "application/json",
                "accept":  "application/json",
            },
        })
}

export function resend(data) {
        return fetch(API_ENDPOINT + "/api/auth/resend", {
            method: "POST",
            body: JSON.stringify({
                ...data,
            }),
            headers: {
                "content-type": "application/json",
                "accept":  "application/json",
            },
        })
}