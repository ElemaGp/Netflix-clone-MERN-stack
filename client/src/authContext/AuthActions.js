export const loginStart = () =>({
    type:"LOGIN_START",
});
export const loginSuccess = (user) =>({
    type:"LOGIN_SUCCESS",
    payload: user, //in the authContext apiCalls file, just after the data is fetched, if successful, loginSuccess(res.data) is dispatched. Since "res.data" is the loginSuccess argument there, that means "res.data" represents "user" here. ("user" is sort of the placeholder argument for the loginSuccess Action here). Therefore, "payload: user" here means "payload: res.data", meaning that the payload will be the fetched data.
});
export const loginFailure = () =>({
    type:"LOGIN_FAILURE",
});


//logout

export const logout = () =>({
    type:"LOGOUT",
});