import { api } from "./api.js";
import { userHelper } from "./userHelper.js";

const userEndpoints ={
    login: "login",
    register: "users",
    logout: "logout" 
}

async function register(username, email, password) {
    const data = await api.post(userEndpoints.register, {username, email, password});
    userHelper.setUserData(data);
}

async function login(username, password) {
    const data = await api.post(userEndpoints.login, {username, password});
    userHelper.setUserData(data);
}

async function logout() {
    await api.post(userEndpoints.logout);
    userHelper.removeUserData()
}

export const userService = {
    register,
    login,
    logout
}