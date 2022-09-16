import axios from "axios";
import { loginFailure, loginStart, loginSuccess } from "./AuthActions";

export const login = async (user, dispatch) => {
    dispatch(loginStart());
    try{
        const res = await axios.post("auth/login", user);
        res.data.isAdmin && dispatch(loginSuccess(res.data)); //if the user has "isAdmin: true", loginSuccess is dispatched.
    }catch(err){
        dispatch(loginFailure());
    }
};