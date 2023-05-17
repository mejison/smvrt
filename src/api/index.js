const API_ENDPOINT = 'https://zendevs.us'
const getToken = () => {
    return localStorage.getItem('token') ?? ''
}

const headers = {
    "content-type": "application/json",
    "accept":  "application/json",
}

export function signup(data) {
        return fetch(API_ENDPOINT + "/api/auth/register", {
            method: "POST",
            body: JSON.stringify({
                ...data,
            }),
            headers,
        })
}

export function resend(data) {
        return fetch(API_ENDPOINT + "/api/auth/resend", {
            method: "POST",
            body: JSON.stringify({
                ...data,
            }),
            headers,
        })
}

export function signin(data) {
    return fetch(API_ENDPOINT + "/api/auth/login", {
        method: "POST",
        body: JSON.stringify({
            ...data,
        }),
        headers,
    })
}

export function me() {
    return fetch(API_ENDPOINT + "/api/auth/me", {
        method: "GET",
        headers: {
            ...headers,
            "authorization": `Bearer ${getToken()}`
        },
    })
}

export function forgot(data) {
    return fetch(API_ENDPOINT + "/api/auth/forgot", {
        method: "POST",
        body: JSON.stringify({
            ...data,
        }),
        headers,
    })
}

export function reset(data) {
    return fetch(API_ENDPOINT + "/api/auth/reset", {
        method: "POST",
        body: JSON.stringify({
            ...data,
        }),
        headers,
    })
}

export function googleauth() {
    return fetch(API_ENDPOINT + "/api/auth/google/redirect", {
        method: "GET",
        headers,
    })
}

export function update_profile(fd) {
    return fetch(API_ENDPOINT + "/api/profile", {
        method: "POST",
        body: fd,
        headers: {
            "authorization": `Bearer ${getToken()}`,
            'accept': 'application/json',
        },
    })
}