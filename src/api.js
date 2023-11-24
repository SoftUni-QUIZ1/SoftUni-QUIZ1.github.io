import { userHelper } from "./userHelper.js"

const BASE_URL = "https://parseapi.back4app.com/";
const API_KEY = "u3DQAXskWxnpdrvuqjc1IeQAOU5upmFhAg2vcce3";
const APPLICATION_ID = "in8yXAgSgGphpeCBoJS3HNaCG1ITCvpXjpCVq19y";

async function requester (url, method, data) {
    const option = {
        method,
        headers: {
            "X-Parse-Application-Id": APPLICATION_ID,
            "X-Parse-REST-API-Key": API_KEY
        }
    }

    const userData = userHelper.getUserData();

    if (userData) {
        option.headers["X-Parse-Session-Token"] = userData.sessionToken;
    }

    if (data) {
        option.headers["Content-Type"] = "application/json";
        option.body = JSON.stringify(data);
    }


    try {
        const response = await fetch(BASE_URL + url, option);
        if (!response.ok) {
            const err = await response.json()
            throw new Error(err.message)
        }
        if (response.status === 204) {
            return response
        }

        return response.json()

    } catch (error) {
        throw error
    }

}

async function get(url) {
    return await requester(url, "GET");
}

async function post(url, data){
    return await requester(url, "POST", data);
}

async function put(url, data) {
    return await requester(url, "PUT", data);
}

async function del(url) {
    return await requester(url, "DELETE");
}

export const api = {
    get,
    post,
    put,
    del
}