import {createSlice} from "@reduxjs/toolkit";
import Axios from "src/Axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Linking from 'expo-linking'
import {generateHours, getCorrectChosenDay, getCurrentDay, getTodayStartTime} from "src/Utils/date_utils";
import {formImagesCardDataHelper, getFruitsOrderItemsHelper} from "../Utils/helpers";
import {capitalizeFirstLetter} from "../Utils/misc";
import {getAvailableDays} from "../Screens/Cleaning/OrderTime";


const initialState = {
    currentDay: getCurrentDay(),
    chosenDay: 0,
    chosenTime: null,
    isASAP: false,

    currentPartner: null,
    currentPageData: {},
    services: [],
    currentService: {},
    mainServices: [],
    additionalServices: [],
    chosenAdditionalProducts: [],

    // partners with carts items specific fields
    currentPartnerCartItems: [],
    cartPartnerHelperData: null,
    cartChosenItems: {},
    currentCartPartnerServiceId: null,
    currentCartPartnerRenderData: {
        title: "",
        description: "",
        renderValue: "",
    },

    totalPrice: 0,
    paymentMethod: 'applePay',

    isCreatingOrder: false,
    isFetchingServices: false,
    isDrawerOpen: false,
    drawerType: null,

    // cleaning specific fields
    propertyArea: "",
    calculatedCleaningPrice: null,

    flatNumber: "",
    flatFloor: "",

    errorFields: {
        flatNumber: "",
        flatFloor: "",
    },
    isTimePickError: {
        flag: false,
        errorCode: null
    },
}


const slice = createSlice({
    name: 'payment',
    initialState,
    reducers: {
        setCurrentServiceASAP(state, action) {
          state.isASAP = action.payload;
        },
        resetErrors(state) {
            state.errorFields.flatNumber = "";
            state.errorFields.flatFloor = "";
            state.isTimePickError.flag = false;
            state.isTimePickError.errorCode = null;
        },
        setTimePickError(state, action) {
            let [flag, code] = action.payload;
            if (code === undefined)
                code = null;
            state.isTimePickError.flag = flag;
            state.isTimePickError.errorCode = code;
        },
        setCurrentCartPartnerServiceId(state, action) {
          state.currentCartPartnerServiceId = action.payload;
        },

        setCurrentPartnerCartItems(state, action) {
            state.currentPartnerCartItems = action.payload;
        },
        setCartChosenItems(state, action) {
            const [items, partnerID] = action.payload;
            state.cartChosenItems[partnerID] = items;
            AsyncStorage.setItem("CART_CONTENT", JSON.stringify(state.cartChosenItems[partnerID]))
        },
        setCartPartnerHelperData(state, action) {
            state.cartPartnerHelperData = action.payload;
        },
        setCurrentCartPartnerRenderData(state, action) {
            const {title, description, renderValue} = action.payload;
            state.currentCartPartnerRenderData = {
                title,
                description,
                renderValue
            }
        },


        setErrorFields(state, action) {
            const [field, value] = action.payload;
            state.errorFields[field] = value;
        },
        setFetchingServicesState(state, action) {
            state.isFetchingServices = action.payload;
        },
        setDrawerState(state, action) {
            state.isDrawerOpen = action.payload;
        },
        setCreatingOrder(state, action) {
            state.isCreatingOrder = action.payload;
        },
        setFlatData(state, action) {
            const [field, value] = action.payload;
            state[field] = value
        },
        setDrawerType(state, action) {
            state.drawerType = action.payload;
        },
        setPaymentMethod(state, action) {
            state.paymentMethod = action.payload;
        },
        setTotalPrice(state, action) {
            state.totalPrice = action.payload;
        },
        setPropertyArea(state, action) {
            state.propertyArea = action.payload;
        },
        setCalculatedCleaningPrice(state, action) {
            state.calculatedCleaningPrice = action.payload;
        },
        setCurrentPageData(state, action) {
            state.currentPageData = action.payload;
        },
        setCurrentPageTitle(state, action) {
            state.currentPageData.title = action.payload;
        },
        setDay(state, action) {
            state.chosenDay = action.payload;
        },
        setTime(state, action) {
            state.chosenTime = action.payload;
        },
        setCurrentPartner(state, action) {
            state.currentPartner = action.payload;
        },
        setMainServices(state, action) {
            state.mainServices = action.payload;
            state.services = [];
            state.additionalServices = [];
        },
        setServices(state, action) {
            state.services = action.payload;
            state.mainServices = action.payload.filter(item => item.is_main);
            state.additionalServices = action.payload.filter(item => !item.is_main)
        },
        setCurrentService(state, action) {
            state.currentService = action.payload;
        },
        addAdditionalProduct(state, action) {
            state.chosenAdditionalProducts.push(action.payload);
        },
        removeAdditionalProduct(state, action) {
            const idToRemove = action.payload.id
            state.chosenAdditionalProducts = state.chosenAdditionalProducts.filter(item => item.id !== idToRemove)
        },
        resetAdditionalProducts(state) {
            state.chosenAdditionalProducts = []
        },
    }
})

export const {actions, reducer} = slice;

export const resetErrors = () => dispatch => dispatch(actions.resetErrors())
export const setTimePickError = (state, flag) => dispatch => dispatch(actions.setTimePickError([state, flag]));
export const setErrorFields = (field, value) => dispatch => dispatch(actions.setErrorFields([field, value]))


export const setCreatingOrderState = state => dispatch => dispatch(actions.setCreatingOrder(state))
export const setFetchingServicesState = state => dispatch => dispatch(actions.setFetchingServicesState(state))

export const closeDrawer = () => dispatch => dispatch(actions.setDrawerState(false));

export const setFlatFieldValue = (field, value) => dispatch => dispatch(actions.setFlatData([field, value]));
export const setPropertyArea = area => dispatch => dispatch(actions.setPropertyArea(area));
export const setTotalPrice = price => dispatch => dispatch(actions.setTotalPrice(price));
export const setTime = time => dispatch => dispatch(actions.setTime(time));
export const setCurrentServiceASAP = state => dispatch => dispatch(actions.setCurrentServiceASAP(state));
export const setPaymentMethod = method => dispatch => dispatch(actions.setPaymentMethod(method));

export const setCurrentPageTitle = title => dispatch => dispatch(actions.setCurrentPageTitle(title));
export const setCurrentPartner = partner => async dispatch => dispatch(actions.setCurrentPartner(partner));

export const setCalculatedCleaningPrice = price => dispatch => dispatch(actions.setCalculatedCleaningPrice(price))

export const resetAdditionalProducts = () => dispatch => dispatch(actions.resetAdditionalProducts([]))


export const setCurrentService = service => (dispatch, getState) => {
    dispatch(actions.setCurrentService(service));
    const {additionalServices} = getState().payment
    return additionalServices.reduce((resultArray, item, index) => {
        if (!item?.category_id.some(serviceItem => serviceItem === service.id))
            return resultArray;
        const chunkIndex = Math.floor(index / 3)
        if (!resultArray[chunkIndex])
            resultArray[chunkIndex] = []
        resultArray[chunkIndex].push({...item, name_of_svc_ru: capitalizeFirstLetter(item.name_of_svc_ru)})
        return resultArray
    }, []).length > 0 ? 766 : 453
}


export const setCartChosenItems = data => (dispatch, getState) =>
    dispatch(actions.setCartChosenItems([data, getState().payment.currentPartner.id]));

export const handleCounterChange = (item, counter, action) => (dispatch, getState) => {
    const {cartChosenItems, currentPartner} = getState().payment;
    const {id} = item;
    const copy = {...cartChosenItems[currentPartner.id]};
    if ((!counter && counter !== 0) && action === 'increment')
        copy[id] = 1
    else if ((!counter && counter !== 0) && action === 'decrement')
        copy[id] = 0;
    else if (counter === -1)
        copy[id] = 0;
    else
        copy[id] = counter
    dispatch(actions.setCartChosenItems([copy, currentPartner.id]));
}

export const setImagesCardData = (title) => dispatch => {
    dispatch(actions.setCurrentCartPartnerRenderData({
        title,
        description: "",
        renderValue: title
    }))
}

export const openBuyDrawer = () => dispatch => {
    dispatch(actions.setDrawerType('buy'));
    dispatch(actions.setDrawerState(true));
}

export const openInfoDrawer = () => dispatch => {
    dispatch(actions.setDrawerType('info'));
    dispatch(actions.setDrawerState(true));
}

export const initUserData = () => async dispatch => {
    const square = await AsyncStorage.getItem('propertyArea') || "";
    const floor = await AsyncStorage.getItem('flatFloor') || "";
    const number = await AsyncStorage.getItem('flatNumber') || "";

    dispatch(actions.setFlatData(['propertyArea', Number(square)]));
    dispatch(actions.setFlatData(['flatFloor', floor]));
    dispatch(actions.setFlatData(['flatNumber', number]));
}

export const createCartPartnerOrder = () => async (dispatch, getState) => {
    const {
        cartChosenItems,
        flatNumber,
        chosenDay,
        chosenTime,
        currentDay,
        currentPartner,
        currentCartPartnerServiceId
    } = getState().payment;
    const {id} = currentPartner;
    const {phone} = getState().auth;

    const successURL = Linking.createURL('payment/success');
    const failedURL = Linking.createURL('payment/failed')

    try {
        const {tower} = getState().auth;
        const address = `Москва, Башня ${tower}, ${flatNumber}`;
        const todayTimeStamp = getTodayStartTime();

        dispatch(actions.setCreatingOrder(true));

        const response = await Axios.post('/orders/new', {
            time_start: chosenTime ? ((todayTimeStamp +
                (getCorrectChosenDay(chosenDay) - currentDay) * 86400 + chosenTime * 3600)) :
                Number((Date.now() / 1000).toFixed()),
            asap: chosenTime === null,
            address,
            resid_complex: "mskcity",
            type_of_order: currentCartPartnerServiceId,
            suborders: getFruitsOrderItemsHelper(cartChosenItems[id]),
            suck_url: successURL,
            fail_url: failedURL
        })

        dispatch(actions.setCreatingOrder(false));

        if (phone !== '+71234567890')
            return response.data.payment.PaymentURL;
        return false;
    } catch (e) {
        dispatch(actions.setCreatingOrder(false));
        console.log("ERROR OCCURRED WHILE CREATING ORDER FOR FRUITS", e);
        return false;
    }

}

export const createOrder = () => async (dispatch, getState) => {
    console.log("CREATING ORDER...")
    const {
        propertyArea,
        currentPartner,
        chosenAdditionalProducts,
        currentService,
        flatNumber,
        flatFloor,
        currentDay,
        chosenDay,
        chosenTime,
        isASAP
    } = getState().payment;
    const {phone} = getState().auth;


    AsyncStorage.setItem('propertyArea', String(propertyArea));
    AsyncStorage.setItem('flatNumber', String(flatNumber));
    AsyncStorage.setItem('flatFloor', String(flatFloor));

    const {tower} = getState().auth;
    const address = `Москва, Башня ${tower}, ${flatNumber}`;
    const todayTimeStamp = getTodayStartTime();
    const area = currentPartner.partner_render_type !== "cleaning" ? {} : {area: propertyArea};
    dispatch(actions.setCreatingOrder(true));

    const successURL = Linking.createURL('payment/success');
    const failedURL = Linking.createURL('payment/failed')

    try {
        const response = await Axios.post('/orders/new', {
            // todo: check twice this place
            time_start: Math.floor(chosenTime ? ((todayTimeStamp + (getCorrectChosenDay(chosenDay) - currentDay) * 86400 + chosenTime * 3600)) : Date.now() / 1000),
            asap: isASAP,
            address,
            ...area,
            type_of_cleaning: currentService.name_of_svc,
            resid_complex: "mskcity",
            type_of_order: currentService.id,
            suborders: chosenAdditionalProducts.map(item => item.id),
            suck_url: successURL,
            fail_url: failedURL
        })
        dispatch(actions.setCreatingOrder(false));

        if (phone !== '+71234567890') {
            return [response.data.payment.PaymentURL, response.status];
        }
    } catch (e) {
        dispatch(actions.setCreatingOrder(false));
        return [false, e.response.status, e.response.data.code];
    }
}

export const handleAdditionalServiceChange = (product, newValue) => (dispatch) => {
    if (newValue === true)
        dispatch(actions.addAdditionalProduct(product));
    else
        dispatch(actions.removeAdditionalProduct(product));
}

export const resetTime = () => dispatch => {
    dispatch(actions.setTime(null));
    dispatch(actions.setDay(0))
}

// todo: write comments
export const chooseNextDay = () => (dispatch, getState) => {
    dispatch(actions.setTime(null));
    const state = getState();
    const {chosenDay} = state.payment;
    if (chosenDay < 6)
        dispatch(actions.setDay(chosenDay + 1))
}

// todo: write comments
export const choosePreviousDay = () => (dispatch, getState) => {
    dispatch(actions.setTime(null));
    const state = getState();
    const {chosenDay, currentPartner, currentDay} = state.payment;

    const {start_workday, end_workday, workdays} = currentPartner;
    const availableDays = getAvailableDays(workdays);
    // todo: fix switch from next day for today, when there are no available days today\
    if (generateHours(true, start_workday, end_workday).length > 0 && chosenDay === 1)
        dispatch(actions.setDay(chosenDay - 1))

    /*else if ((generateHours(true, start_workday, end_workday).length === 0))
        return*/
    if (chosenDay > 0) {
        console.log("MATCHED CONDITION")
        dispatch(actions.setDay(chosenDay - 1))
    }
}

/**
 * Fetch all available products and services for currentPartner
 * */
export const fetchServices = partner => async dispatch => {
    try {
        const {id} = partner;
        dispatch(actions.setFetchingServicesState(true));

        const response = await Axios.get(`/services/list?partner_id=${id}`);

        if (partner.partner_render_type === 'with_images') {
            const {data, name_of_svc_ru, service_id} = formImagesCardDataHelper(response.data.services);
            dispatch(actions.setMainServices(name_of_svc_ru));
            dispatch(actions.setCartPartnerHelperData(data));
            dispatch(actions.setCurrentPartnerCartItems(response.data.services));
            dispatch(actions.setFetchingServicesState(false));
            dispatch(actions.setCurrentCartPartnerServiceId(service_id))
        } else {
            dispatch(actions.setServices(response.data.services));
            dispatch(actions.setFetchingServicesState(false));
        }
    } catch (e) {
        console.log("SOMETHING WENT WRONG WHILE FETCHING SERVICES LIST: ", e);
        dispatch(actions.setFetchingServicesState(false));
    }
}
