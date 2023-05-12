const API_ENDPOINT = 'https://smvrt-api.local'
const getToken = () => {
    return localStorage.getItem('token') ?? ''
}

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

export function signin(data) {
    return fetch(API_ENDPOINT + "/api/auth/login", {
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

export function me() {
    return fetch(API_ENDPOINT + "/api/auth/me", {
        method: "GET",
        headers: {
            "content-type": "application/json",
            "accept":  "application/json",
            "authorization": `Bearer ${getToken()}`
        },
    })
}