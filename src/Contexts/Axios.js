import React, {Fragment} from "react";
import Axios from "../Axios";
import {useDispatch} from "react-redux";
import {getAccessToken} from "../Helpers/tokens";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {logout} from "../Slices/auth";

export const AxiosContext = ({ children }) => {
    const dispatch = useDispatch();

    Axios.interceptors.response.use(response => response, async error =>  {
        const originalRequest = error.config;
        console.log("RETRY: ", originalRequest._retry);

        if (originalRequest._retry === false && error.response.status === 401) {
            console.log("LOGGING OUT DUE TO REFRESH ERROR")
            dispatch(logout())
            return;
        }

        if (error.response.status === 401 && originalRequest._retry === undefined) {
            try {
                const id = await AsyncStorage.getItem('SECRET_ID');
                const token = await AsyncStorage.getItem('SECRET_TOKEN');
                const phone = await AsyncStorage.getItem('PHONE')
                console.log("REFRESHING OUTDATED TOKEN...")

                const {access, expires} = await getAccessToken(phone, id, token);

                Axios.defaults.headers.common.Authorization = `Bearer ${access}`;

                originalRequest.headers.Authorization = `Bearer ${access}`;
                AsyncStorage.setItem('ACCESS_TOKEN', access);
                AsyncStorage.setItem('EXPIRATION_DATE', String(Date.now() + expires * 1000));
                originalRequest._retry = true;
                return Axios(originalRequest);
            }
            catch (e) {
                console.log("FAILED REFRESHING TOKENS...");
                originalRequest._retry = false;
            }

        }
        else if (error.response.status === 401)
            originalRequest._retry = false;

        return Promise.reject(error);
    });
    return (
        <Fragment>
            { children }
        </Fragment>
    )
}
