
function getUserData() {
    return JSON.parse(sessionStorage.getItem("userData"))
}

function setUserData(userData) {
    sessionStorage.setItem("userData", JSON.stringify(userData));
}

function getUserID () {
    const userData =  getUserData();
    return userData.objectId
}

function getUserToken () {
    const userData = getUserData();
    return userData.sessionToken
}

function removeUserData(){
    sessionStorage.removeItem("userData")
}

export const userHelper = {
    getUserData,
    setUserData,
    getUserID,
    removeUserData,
    getUserToken
}

