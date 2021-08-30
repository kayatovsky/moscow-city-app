import React, {useEffect, useMemo, useState} from "react";
import TextInput from "src/Components/Common/TextInput";
import {Platform, View} from "react-native";
import useScaleFactor from "src/Hooks/useScaleFactor";
import FlatData from "../Components/FlatData";
import PriceData from "../Components/PriceData";
import Button from "src/Components/Common/Button";
import TimePickerHelper from "../Components/TimePickerHelper";
import {useDispatch, useSelector} from "react-redux";
import {
    createOrder,
    resetTime,
    setErrorFields,
    setTotalPrice,
    createCartPartnerOrder,
    setTimePickError,
    resetErrors,
    setCreatingOrderState,
    setCartChosenItems
} from "src/Slices/payment";
import TemplateAnimated from "../Components/TemplateAnimated";
import * as WebBrowser from 'expo-web-browser';
import * as Linking from 'expo-linking';
import {setActiveScreenIndex} from "src/Slices/mainScreen";
import Constants from 'expo-constants';
import * as Device from 'expo-device';
import {sendMessage} from "src/Utils/bot";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {calcTotalPriceHelper} from "src/Utils/helpers";

export default function ({navigation}) {
    const {
        calculatedCleaningPrice,
        chosenAdditionalProducts,
        isCreatingOrder,
        flatFloor,
        flatNumber,
        currentPartner,
        currentService,
        currentPartnerCartItems,
        cartChosenItems,
        chosenTime,
        isTimePickError,
        isASAP
    } = useSelector(state => state.payment);
    const {phone, tower} = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const {verticalScale} = useScaleFactor();
    const [isPaymentError, setPaymentError] = useState(false);
    const [isLowPrice, setLowPrice] = useState(false);

    const {id} = currentPartner

    let mainServicePrice;
    switch (currentPartner.partner_render_type) {
        case 'cleaning':
            mainServicePrice = calculatedCleaningPrice;
            break;
        case 'with_images':
            mainServicePrice = Number(calcTotalPriceHelper(currentPartnerCartItems, cartChosenItems[id]));
            break;
        default:
            mainServicePrice = currentService.price;
    }

    const additionalPrice = useMemo(() => {
        return chosenAdditionalProducts.reduce((prevValue, item) => prevValue + item.price, 0)
    }, [chosenAdditionalProducts])

    useEffect(() => {
        return () => {
            dispatch(resetTime());
            dispatch(resetErrors())
        };
    }, [])

    const _handleRedirect = async (event) => {
        sendMessage(`MODE: ${Constants.appOwnership} DEVICE: ${Device.modelName} ---MESSAGE--- EVENT: ${event.toString()}`)
        try {
            // todo: remove tg messages later
            if (Platform.OS === 'ios')
                WebBrowser.dismissBrowser();
            else
                _removeLinkingListener();

            sendMessage(`MODE: ${Constants.appOwnership} DEVICE: ${Device.modelName} ---MESSAGE--- URL: ${event.url}`)
            const data = Linking.parse(event.url);
            sendMessage(`MODE: ${Constants.appOwnership} DEVICE: ${Device.modelName} ---MESSAGE--- PATH: ${data.path}`)


            if (Constants.appOwnership === 'standalone') {
                sendMessage("RUNNING IN STANDALONE...")
                if (data.path === 'success') {
                    dispatch(setActiveScreenIndex(2));
                    navigation.navigate('History');
                    // clear bucket
                    // todo: fix this thumbnail
                    if (currentPartner.partner_render_type === "with_images") {
                        dispatch(setCreatingOrderState(false));
                        dispatch(setCartChosenItems([]));
                        await AsyncStorage.setItem('CART_CONTENT', '{}')
                    }
                }
                if (data.path === 'failed')
                    setPaymentError(true);
            } else {
                if (data.path === 'payment/success') {
                    dispatch(setActiveScreenIndex(2));
                    navigation.navigate('History')
                    // todo: fix this thumbnail
                    if (currentPartner.partner_render_type === "with_images") {
                        dispatch(setCreatingOrderState(false));
                        dispatch(setCartChosenItems([]));
                        await AsyncStorage.setItem('CART_CONTENT', '{}')
                    }
                } else if (data.path === 'payment/failed')
                    setPaymentError(true);
            }
        } catch (e) {
            sendMessage(`MODE: ${Constants.appOwnership} DEVICE: ${Device.modelName}  ---MESSAGE--- REDIRECT ERROR: ${e}`)
        }
    };

    const _addLinkingListener = () => {
        sendMessage(`MODE: ${Constants.appOwnership} DEVICE: ${Device.modelName} ---MESSAGE--- IS ADDED LISTENER: YES`)
        Linking.addEventListener("url", _handleRedirect);
    };

    const _removeLinkingListener = () => {
        sendMessage(`MODE: ${Constants.appOwnership} DEVICE: ${Device.modelName} ---MESSAGE--- IS REMOVED LISTENER: YES`)
        Linking.removeEventListener("url", _handleRedirect);
    };

    const _openAuthSessionAsync = async (url) => {
        try {
            _addLinkingListener();
            await WebBrowser.openBrowserAsync(url);
            _removeLinkingListener();
        } catch (error) {
            console.log(error);
        }
    };

    const makeOrder = async () => {
        setPaymentError(false);
        if (!chosenTime && !isASAP) {
            dispatch(setTimePickError(true));
            return;
        }
        if (!flatNumber)
            dispatch(setErrorFields('flatNumber', 'Введите номер'));
        if (!flatFloor)
            dispatch(setErrorFields('flatFloor', 'Введите этаж'));
        if (flatNumber && flatFloor) {
            dispatch(setErrorFields('flatFloor', ''));
            dispatch(setErrorFields('flatNumber', ''));
            dispatch(setTotalPrice(calculatedCleaningPrice + additionalPrice));

            if (currentPartner.partner_render_type === "with_images") {
                const res = await dispatch(createCartPartnerOrder());
                setLowPrice(false);
                if (res) {
                    await _openAuthSessionAsync(res);
                    sendMessage("-----------------------------------------------------------")
                }
            } else {
                setLowPrice(false);
                const [res, code, errorCode] = await dispatch(createOrder());
                if (errorCode === 20)
                    setLowPrice(true);
                console.log("RES URL: ", res);
                if (res) {
                    await _openAuthSessionAsync(res)
                    sendMessage("-----------------------------------------------------------")
                }

                if (!res) {
                    dispatch(setTimePickError(true, code));
                }
            }
        }
    }
    const getButtonTitle = () => {
        /*if (isTimePickError.errorCode === 400)
            return 'Попробуйте снова'*/
        if (isLowPrice)
            return `Минимум ${currentPartner.minimal_price} ₽`
        if (isTimePickError.errorCode === 500)
            return "Не удалось создать заказ"
        return "Оплатить"
    }
    return (
        <TemplateAnimated
            primaryText='Адрес и оплата'
            navigation={navigation}
            withInformationIcon={false}
        >
            <View>
                <TextInput
                    title='Название башни'
                    defaultValue={tower}
                    disabled
                    withContainer={false}
                />
            </View>
            <View style={{paddingTop: 21 * verticalScale}}>
                <TextInput
                    title='Телефон'
                    defaultValue={phone}
                    disabled
                    withContainer={false}
                />
            </View>
            <View style={{paddingTop: 21 * verticalScale}}>
                <TextInput
                    title='Стоимость'
                    disabled
                    value={(mainServicePrice + additionalPrice).toFixed(0) + '₽'}
                    defaultValue={mainServicePrice + additionalPrice + '₽'}
                    withContainer={false}
                />
            </View>
            <FlatData
                displayArea={currentPartner.partner_render_type === "cleaning"}
            />
            <View style={{marginTop: 31 * verticalScale}}>
                <TimePickerHelper navigation={navigation}
                                  isPriceError={isLowPrice}
                                  title='Время оказания услуги'/>
            </View>
            {/*<View style={{marginTop: 40 * verticalScale}}>
                <ChooseBlock title='Способ оплаты'>
                    <RadioButton
                        value={isAndroid ? 'googlePay' : 'applePay'}
                        withBorder
                        disabled={paymentMethod !== 'applePay'}
                        primaryText={isAndroid ? 'Google pay' : 'Apple Pay'}
                        onChange={value => dispatch(setPaymentMethod(value))}
                    />
                    <RadioButton
                        value='card'
                        disabled={paymentMethod !== 'card'}
                        primaryText='По карте'
                        onChange={value => dispatch(setPaymentMethod(value))}
                    />
                </ChooseBlock>
            </View>*/}
            <View style={{marginTop: 47 * verticalScale}}>
                <PriceData
                    label='Стоимость'
                    price={mainServicePrice.toFixed()}
                />
                <PriceData
                    label='Дополнительно'
                    price={additionalPrice.toFixed()}
                />
                <PriceData
                    label='Итого'
                    price={(mainServicePrice + additionalPrice).toFixed(0)}
                    isBold={true}
                    withMarginBottom={false}
                />
            </View>
            <View style={{marginTop: 48 * verticalScale, marginBottom: 40 * verticalScale}}>
                {/*<Button
                    color={paymentMethod === 'card' ? 'primary' : 'secondary'}
                    variant='contained'
                    title={paymentMethod === 'card' ? 'Оплатить по карте' : 'platformPay'}
                    onPress={makeOrder}
                    isLoading={isCreatingOrder}
                />*/}
                <Button
                    color={'secondary'}
                    variant='outlined'
                    title={getButtonTitle()}
                    withMargins={false}
                    onPress={makeOrder}
                    isLoading={isCreatingOrder}
                    isError={isPaymentError || isTimePickError.errorCode === 500 || isLowPrice}
                />
            </View>
        </TemplateAnimated>
    )
}
