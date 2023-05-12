const API_ENDPOINT = 'https://smvrt-api.local'

export function signup(data) {
        return fetch(API_ENDPOINT + "/api/register", {
            method: "POST",
            body: JSON.stringify({
                ...data,
            }),
            headers: {
                "content-type": "application/json",
                "accept":  "application/json",
            },
        });
    }