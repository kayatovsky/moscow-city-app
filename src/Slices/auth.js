import {createSlice} from "@reduxjs/toolkit";
import Axios from "src/Axios";
import AsyncStorage from '@react-native-async-storage/async-storage'
import {decode, encode} from 'base-64'
import {createClient, createUser, getAccessToken, resetTokens} from "src/Helpers/tokens";


if (!global.btoa)
    global.btoa = encode;
if (!global.atob)
    global.atob = decode;


const initialState = {
    username: "",
    phone: "",
    type_of_user: "client",
    tower: null,
    isError: false,
    code: "",
    errorMessage: "",
    isSignedIn: false,
    generatedCode: null,
    docsLinks: {}
}

const slice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setDocsLinks(state, action) {
          state.docsLinks = action.payload;
        },
        setSignedIn(state, action) {
          state.isSignedIn = action.payload;
        },
        setField(state, action) {
            const {field, value} = action.payload;
            state[field] = value;
        },
        setError(state, action) {
            state.isError = true;
            state.errorMessage = action.payload;
        },
        resetError(state) {
            state.isError = false;
            state.errorMessage = "";
        },
        setTower(state, action) {
            state.tower = action.payload;
        },
        setGeneratedCode(state, action) {
            state.generatedCode = action.payload;
        },
    }
})

export const {actions, reducer} = slice;


export const setErrorMessage = (errorMessage) => dispatch => dispatch(actions.setError(errorMessage));
export const resetError = () => dispatch => dispatch(actions.resetError());
export const setTowerName = tower => dispatch => dispatch(actions.setTower(tower));
export const setSignedIn = state => dispatch => dispatch(actions.setSignedIn(state));
export const setGeneratedCode = code => dispatch => dispatch(actions.setGeneratedCode(code));

export const fetchDocsLinks = () => async dispatch => {
    try {
        const response = await Axios.get('ur_docs')
        dispatch(actions.setDocsLinks(response.data));
    }
    catch {

    }
}

export const setField = (field, value) => async dispatch => {
    dispatch(actions.setField({field, value}));
    dispatch(actions.resetError());
}

export const fetchUserPersonalData = () => async dispatch => {
    const ID = await AsyncStorage.getItem('SECRET_ID');
    const TOKEN = await AsyncStorage.getItem('SECRET_TOKEN');
    const isSignedIn = Boolean(ID && TOKEN)
    if (isSignedIn) {
        try {
            const response = await Axios.get('/user/me');

            const {username, email, phone, adr_tower} = response.data;

            dispatch(actions.setField({field: 'username', value: username}))
            dispatch(actions.setField({field: 'email', value: email}))
            dispatch(actions.setField({field: 'phone', value: phone}))
            dispatch(actions.setField({field: 'tower', value: adr_tower}))
        }
        catch (e) {
            console.log('GOT ERROR WHILE FETCHING USER PERSONAL DATA: ', e)
        }
    }

}


export const registerUser = () => async (dispatch, getStore) => {
    const {username, phone, type_of_user, tower} = getStore().auth;

    const isUserExists = await createUser(username, phone, type_of_user, tower);
    if (isUserExists)
        console.log("USER ALREADY EXISTS, REGISTERING NEW CLIENT FOR HIM/HER...")

    const {client_id, client_secret} = await createClient(phone);

    const {access, expires} = await getAccessToken(phone, client_id, client_secret);

    Axios.defaults.headers.common.Authorization = `Bearer ${access}`;

    AsyncStorage.setItem('ACCESS_TOKEN', access);
    AsyncStorage.setItem('EXPIRATION_DATE', String(Date.now() + expires * 1000));
    AsyncStorage.setItem('SECRET_TOKEN', client_secret);
    AsyncStorage.setItem('SECRET_ID', client_id);
    AsyncStorage.setItem('PHONE', phone);
}


export const logout = () => async dispatch => {
    dispatch(setSignedIn(false));
    dispatch(actions.setField({field: 'username', value: ""}))
    dispatch(actions.setField({field: 'email', value: ""}))
    dispatch(actions.setField({field: 'phone', value: ""}))
    dispatch(actions.setField({field: 'tower', value: null}))
    await resetTokens();
}
