import React, {Fragment, useCallback, useEffect} from 'react'
import NetworkNotification from "./src/Components/Common/NetworkNotification";
import {NavigationContainer} from "@react-navigation/native";
import {AxiosContext} from "./src/Contexts/Axios";
import {skipAuthScreens} from "./src/config";
import Auth from "./src/Screens/Register/Auth/Auth";
import Name from "./src/Screens/Register/Name/Name";
import Address from "./src/Screens/Register/Address";
import Code from "./src/Screens/Register/Code/Code";
import Cleaning from "./src/Screens/Cleaning";
import Payment from "./src/Screens/Cleaning/CleaningPayment";
import OrderTime from "./src/Screens/Cleaning/OrderTime";
import HistoryOrders from "./src/Screens/Main/History";
import Help from "./src/Screens/Main/Help";
import Cooperation from "./src/Screens/Main/Cooperation"
import About from "./src/Screens/Main/AboutService";
import ShoppingCart from "./src/Screens/Cleaning/ShoppingCart";
import CleaningInfo from "./src/Screens/Cleaning/CleaningInfo";
import {useDispatch} from "react-redux";
import {fetchDocsLinks, fetchUserPersonalData} from "./src/Slices/auth";
import {initUserData, setCartChosenItems} from "./src/Slices/payment";
import {CardStyleInterpolators, createStackNavigator, TransitionSpecs} from "@react-navigation/stack";
import Profile from "./src/Screens/Main/Profile";
import Home from "./src/Screens/Main/Home";
import Orders from "./src/Screens/Main/Orders";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {getAccessToken} from "./src/Helpers/tokens";
import First from "./src/Screens/Register/OnBoarding/First";
import Second from "./src/Screens/Register/OnBoarding/Second";
import Third from "./src/Screens/Register/OnBoarding/Third";
import Fourth from "./src/Screens/Register/OnBoarding/Fourth";


const Stack = createStackNavigator();

const Initialization = () => {
    const dispatch = useDispatch();

    // todo: find out how to handle this thing
    const checkToken = useCallback(async () => {
        const EXPIRATION_DATE = await AsyncStorage.getItem('EXPIRATION_DATE');
        if (Number(EXPIRATION_DATE) - 900 > Date.now())
            console.log('TOKEN IS NOT EXPIRED')
        else {
            console.log('TOKEN IS EXPIRED!')
            console.log("RECEIVING NEW TOKEN...")
            await getAccessToken()
        }
    }, [])

    useEffect(() => {
        dispatch(fetchUserPersonalData());
        dispatch(initUserData());
        dispatch(fetchDocsLinks());
        // restore shopping cart content on app init
        AsyncStorage.getItem('CART_CONTENT').then(res => {
            const result = JSON.parse(res);
            dispatch(setCartChosenItems(result || {}))
        });
    }, [dispatch])

    return <Fragment/>
}

const options = {
    transitionSpec: {
        open: TransitionSpecs.TransitionIOSSpec,
        close: TransitionSpecs.TransitionIOSSpec,
    },
    cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
    headerShown: false,
}

export default function ({isSignedIn, skipOnBoarding}) {

    return (
        <Fragment>
            <NetworkNotification/>
            <Initialization/>
            <NavigationContainer>
                <AxiosContext>
                    <Stack.Navigator
                        initialRouteName={(isSignedIn || skipAuthScreens) ? "App" : (skipOnBoarding ? 'RegisterMobile' : "BOARDING-FIRST")}
                        gestureDirection="horizontal">
                        <Stack.Screen
                            name='BOARDING-FIRST' component={First}
                            options={options}
                        />
                        <Stack.Screen
                            name='BOARDING-SECOND' component={Second}
                            options={options}
                        />
                        <Stack.Screen
                            name='BOARDING-THIRD' component={Third}
                            options={options}
                        />
                        <Stack.Screen
                            name='BOARDING-FOURTH' component={Fourth}
                            options={options}
                        />
                        <Stack.Screen
                            name='RegisterMobile' component={Auth}
                            options={{...options, gestureEnabled: false}}
                        />
                        <Stack.Screen
                            name='RegisterName' component={Name}
                            options={{...options, /*gestureEnabled: false*/}}
                        />
                        <Stack.Screen
                            name='RegisterAddress' component={Address}
                            options={{...options, /*gestureEnabled: false*/}}
                        />
                        <Stack.Screen
                            name='RegisterCode' component={Code}
                            options={{...options}}
                        />
                        <Stack.Screen
                            options={{headerShown: false, animationEnabled: false,}}
                            name="Profile" component={Profile}
                        />
                        <Stack.Screen
                            options={{headerShown: false, animationEnabled: false,}}
                            name="App" component={Home}
                        />
                        <Stack.Screen
                            options={{headerShown: false, animationEnabled: false,}}
                            name="History" component={Orders}
                        />

                        <Stack.Screen
                            name="Cleaning"
                            component={Cleaning}
                            options={options}
                        />
                        <Stack.Screen
                            name="Payment"
                            component={Payment}
                            options={options}
                        />
                        <Stack.Screen
                            name="OrderTime"
                            component={OrderTime}
                            options={options}
                        />
                        <Stack.Screen
                            name="HistoryOrders"
                            component={HistoryOrders}
                            options={options}
                        />
                        <Stack.Screen
                            name="Help"
                            component={Help}
                            options={options}
                        />
                        <Stack.Screen
                            name="Cooperation"
                            component={Cooperation}
                            options={options}
                        />
                        <Stack.Screen
                            name="About"
                            component={About}
                            options={options}
                        />
                        <Stack.Screen
                            name='ShoppingCart'
                            component={ShoppingCart}
                            options={options}
                        />
                        <Stack.Screen
                            name='ProductDetails'
                            component={CleaningInfo}
                            options={options}
                        />
                    </Stack.Navigator>

                </AxiosContext>
            </NavigationContainer>
        </Fragment>
    )
}
