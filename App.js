import React, {useState} from 'react';
import {Provider} from "react-redux";
import {store} from "src/Store/store";
import {SafeAreaProvider} from 'react-native-safe-area-context';
import AuthProvider from "./AuthProvider";
import AppLoading from "expo-app-loading";
import * as Font from "expo-font";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Axios from "./src/Axios";
import {getAccessToken} from "./src/Helpers/tokens";


async function loadApplication([setSignedIn, setShouldSkipStartScreens]) {
    await Font.loadAsync({
        'light': require('./assets/Fonts/light.otf'),
        'regular': require('./assets/Fonts/regular.otf'),
        'medium': require('./assets/Fonts/medium.otf'),
        'bold': require('./assets/Fonts/bold.otf'),
    });

    const ID = await AsyncStorage.getItem('SECRET_ID');
    const TOKEN = await AsyncStorage.getItem('SECRET_TOKEN');
    const IS_FIRST_LOGIN = await AsyncStorage.getItem('IS_FIRST_LOGIN');
    const phone = await AsyncStorage.getItem('PHONE');

    const {access, expires} = await getAccessToken(phone, ID, TOKEN);
    if (access) {
        // client is existing if SECRET ID AND SECRET TOKEN ARE DEFINED
        Axios.defaults.headers.common.Authorization = `Bearer ${access}`;
        AsyncStorage.setItem('ACCESS_TOKEN', access);
        AsyncStorage.setItem('EXPIRATION_DATE', String(Date.now() + expires * 1000));
        const isSignedIn = Boolean(ID && TOKEN && access);
        setShouldSkipStartScreens(JSON.parse(IS_FIRST_LOGIN) === false);
        setSignedIn(isSignedIn);
    }
    setShouldSkipStartScreens(JSON.parse(IS_FIRST_LOGIN) === false);
}

export default function App() {

    const [isReady, setReady] = useState(false)
    const [isSignedIn, setSignedIn] = useState(false);
    const [shouldSkipStartScreen, setShouldSkipStartScreens] = useState(false);


    if (!isReady)
        return (
            <AppLoading
                startAsync={async () => {
                    await loadApplication([setSignedIn, setShouldSkipStartScreens]);
                }}
                onError={e => console.log("ERROR OCCURRED WHEN STARTING APP", e)}
                onFinish={() => {
                    setReady(true);
                }}
            />
        )

    return (
        <SafeAreaProvider>
            <Provider store={store}>
                <AuthProvider skipOnBoarding={shouldSkipStartScreen} isSignedIn={isSignedIn}/>
            </Provider>
        </SafeAreaProvider>
    );
}
