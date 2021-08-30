import Axios from "../Axios";
import {getUrlParams} from "../Utils/urlparser";
import {generateUUID} from "../Utils/uuid";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const getAccessToken = async (phone, secret_id, secret_token) => {
    if (!phone || !secret_id || !secret_token)
        return {
            access: null,
            expires: null
        }
    const response = await Axios.post(`/oauth/authorize_json?response_type=code&client_id=${secret_id}&scope=profile`, {
        phone,
        confirm: 'on'
    })

    // get helper token from url params
    const code = getUrlParams(response.request.responseURL).code.replace(/\s/g, '');
    const body = new FormData()
    body.append("grant_type", "authorization_code")
    body.append("scope", "profile")
    body.append("code", code)

    try {
        const tokenResponse = await Axios.post("/oauth/token", body, {
            auth: {
                username: secret_id,
                password: secret_token
            },
            headers: {
                "Content-Type": "multipart/form-towersListHardcode"
            },
        })
        const {access_token, expires_in} = tokenResponse.data;

        return {
            access: access_token,
            expires: expires_in
        }
    }
    catch (e) {
        console.log('FAILED TO FETCH ACCESS TOKEN', e)
    }
}

/**
 * @param username {String} name of user
 * @param phone {String} user's phone in russian format
 * @param type_of_user {String} type of user, by default - "client"
 * @param tower {String} name of tower in ММДЦ «Москва-Сити»
 * */
export const createUser = async (username, phone, type_of_user, tower) => {
    try {
        const response = await Axios.post('/register', {
            username,
            phone,
            type_of_user,
            tower
        });

        // todo: get other codes from backend engineer
        // code 1 - okay
        // code 2 - already existing
        const {code} = response.data;

        return code === 1
    }
    catch (e) {
        return false;
    }
}

export const createClient = async (phone) => {
    const uuid = generateUUID();

    const response  = await Axios.post('/create_client', {
        "client_name": uuid,
        "phone": phone,
        "client_uri": `${phone}-${uuid}`,
        "grant_type": "authorization_code",
        "redirect_uri": "http://185.68.21.164:8080",
        "response_type": "code",
        "scope": "profile",
        "token_endpoint_auth_method": "client_secret_basic"
    }, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
    const {client_id, client_secret} = response.data;

    return {
        client_id,
        client_secret
    }
}


export const resetTokens = async () => {
    await AsyncStorage.clear();
    await AsyncStorage.setItem('IS_FIRST_LOGIN', 'false')
}
