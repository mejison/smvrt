import { setCookie } from "@/utils/helpers"

const API_ENDPOINT = 'https://smvrt-api.dev'
const getToken = () => {
    return localStorage.getItem('token') ?? ''
}

const headers = {
    "content-type": "application/json",
    "accept":  "application/json",
}

const request = (...data) => {
   return fetch(...data)
    .then((response) => {
        if (response.status == 401 && response.statusText == "Unauthorized") {
            setCookie('token', '')
            if (location.pathname != '/signin') {
                location.href = '/signin'
            }
        }
        return response;
    })
}

export function signup(data) {
        return request(API_ENDPOINT + "/api/auth/register", {
            method: "POST",
            body: JSON.stringify({
                ...data,
            }),
            headers,
        })
}

export function resend(data) {
        return request(API_ENDPOINT + "/api/auth/resend", {
            method: "POST",
            body: JSON.stringify({
                ...data,
            }),
            headers,
        })
}

export function signin(data) {
    return request(API_ENDPOINT + "/api/auth/login", {
        method: "POST",
        body: JSON.stringify({
            ...data,
        }),
        headers,
    })
}

export function me() {
    return request(API_ENDPOINT + "/api/auth/me", {
        method: "GET",
        headers: {
            ...headers,
            "authorization": `Bearer ${getToken()}`
        },
    })
}

export function forgot(data) {
    return request(API_ENDPOINT + "/api/auth/forgot", {
        method: "POST",
        body: JSON.stringify({
            ...data,
        }),
        headers,
    })
}

export function reset(data) {
    return request(API_ENDPOINT + "/api/auth/reset", {
        method: "POST",
        body: JSON.stringify({
            ...data,
        }),
        headers,
    })
}

export function googleauth() {
    return request(API_ENDPOINT + "/api/auth/google/redirect", {
        method: "GET",
        headers,
    })
}

export function update_profile(fd) {
    return request(API_ENDPOINT + "/api/profile", {
        method: "POST",
        body: fd,
        headers: {
            "authorization": `Bearer ${getToken()}`,
            'accept': 'application/json',
        },
    })
}

export function get_profile_teams() {
    return request(API_ENDPOINT + "/api/profile/teams", {
        method: "GET",
        headers: {
            ...headers,
            "authorization": `Bearer ${getToken()}`
        },
    })
}

export function roles() {
    return request(API_ENDPOINT + "/api/roles", {
        method: "GET",
        headers: {
            ...headers,
            "authorization": `Bearer ${getToken()}`
        },
    })
}

export function get_settings() {
    return request(API_ENDPOINT + "/api/profile/settings", {
        method: "GET",
        headers: {
            ...headers,
            "authorization": `Bearer ${getToken()}`
        },
    })
}

export function update_settings(data) {
    return request(API_ENDPOINT + "/api/profile/settings", {
        method: "POST",
        body: JSON.stringify({
            ...data,
        }),
        headers: {
            ...headers,
            "authorization": `Bearer ${getToken()}`
        },
    })
}

export function remove_member_from_team(data) {
    return request(API_ENDPOINT + "/api/team/" + data.team_id + "/member/remove", {
        method: "DELETE",
        body: JSON.stringify({
            ...data,
        }),
        headers: {
            ...headers,
            "authorization": `Bearer ${getToken()}`
        },
    })
}

export function update_role_on_team(data) {
    return request(API_ENDPOINT + "/api/team/" + data.team_id + "/member/update", {
        method: "PUT",
        body: JSON.stringify({
            ...data,
        }),
        headers: {
            ...headers,
            "authorization": `Bearer ${getToken()}`
        },
    })
}

export function add_member_to_team(data) {
    return request(API_ENDPOINT + "/api/team/" + data.team_id + "/member/add", {
        method: "POST",
        body: JSON.stringify({
            ...data,
        }),
        headers: {
            ...headers,
            "authorization": `Bearer ${getToken()}`
        },
    })
}

export function create_team(data) {
    return request(API_ENDPOINT + "/api/team", {
        method: "POST",
        body: JSON.stringify({
            ...data,
        }),
        headers: {
            ...headers,
            "authorization": `Bearer ${getToken()}`
        },
    })
}