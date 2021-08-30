import {createSlice} from "@reduxjs/toolkit";
import Axios from "../Axios";
import {setField} from "./auth";

const initialState = {
    currentTab: "common",
    isFetchingData: false,
    isFetchingOrders: false,
    services: [],
    currentOrders: [],
    historyOrders: [],
    availableServices: [],
    currentService: null,
    isBackdropOpen: false,
    currentOrderData: {},
    activeScreenIndex: 1,
    isRemovingOrder: false,
    isSavingTower: false,
}


const slice = createSlice({
    name: "mainScreen",
    initialState,
    reducers: {
        setSavingTowerState(state, action) {
          state.isSavingTower = action.payload;
        },
        setRemovingOrder(state, action) {
          state.isRemovingOrder = action.payload;
        },
        setActiveScreenIndex(state, action) {
            state.activeScreenIndex = action.payload;
        },
        setCurrentOrderData(state, action) {
            state.currentOrderData = action.payload;
        },
        setFetchingOrdersState(state, action) {
            state.isFetchingOrders = action.payload;
        },
        setBackdropState(state, action) {
            state.isBackdropOpen = action.payload;
        },
        toggleTab(state, action) {
            state.currentTab = action.payload;
        },
        setCurrentService(state, action) {
            state.currentService = action.payload;
        },
        setFetching(state, action) {
            state.isFetchingData = action.payload;
        },
        setServices(state, action) {
            state.services = action.payload;
            state.availableServices = action.payload.filter(item => item.is_active).map(item => item.name);
        },
        setCurrentOrders(state, action) {
            state.currentOrders = action.payload;
        },
        setHistoryOrders(state, action) {
            state.historyOrders = action.payload;
        }
    }
})

export const {actions, reducer} = slice

export const handleChangeTower = tower => async dispatch => {
    try {
        dispatch(actions.setSavingTowerState(true));
        const response = await Axios.patch('/users/update', {
            user: {
                tower: tower
            }
        })
        console.log("RESPONSE: ", response.data);
        dispatch(actions.setSavingTowerState(false));
        dispatch(setField('tower', tower))
    }
    catch (e) {
        console.log("SOMETHING WENT WRONG: ", e);
        dispatch(actions.setSavingTowerState(false));
    }
}

export const setActiveScreenIndex = index => dispatch => dispatch(actions.setActiveScreenIndex(index))
export const setCurrentService = service => dispatch => dispatch(actions.setCurrentService(service));
export const setBackdropState = state => dispatch => dispatch(actions.setBackdropState(state));
export const toggleTab = newTab => dispatch => dispatch(actions.toggleTab(newTab))
export const setCurrentOrderData = data => dispatch => dispatch(actions.setCurrentOrderData(data));


export const cancelOrder =  () => async (dispatch, getState) => {
    const {currentOrderData: data} = getState().mainScreen
    const orderId = data.id;
    const {partner_id} = data;
    const isCleaningOrder = partner_id === 1;
    try {
        dispatch(actions.setRemovingOrder(true));
        await Axios.patch('/orders/user_update', {
            "order_id": Number(orderId),
            "type_of_order": isCleaningOrder ? 'cleaning' : 'placeholder',
            "status": "cancel"
        });
        dispatch(fetchOrders(true));
        dispatch(actions.setRemovingOrder(false));
    } catch (e) {
        dispatch(actions.setRemovingOrder(false));
        console.log("GOT ERROR WHILE CANCELLING ORDER, ", e)
    }
}

export const fetchServices = () => async dispatch => {
    try {
        dispatch(actions.setFetching(true));
        const response = await Axios.get('/partners/all');
        dispatch(actions.setServices(response.data.msg));
        dispatch(actions.setFetching(false));
    } catch (e) {
        console.log(`ERROR HAS OCCURRED WHILE FETCHING SERVICES DATA ${e}`)
        dispatch(actions.setFetching(false));
    }
}

export const fetchOrders = isCurrentOrders => async dispatch => {
    try {
        dispatch(actions.setFetchingOrdersState(true));
        const response = await Axios.get(`/orders/history?actual=${String(isCurrentOrders)}`)
        isCurrentOrders ? dispatch(actions.setCurrentOrders(response.data.orders)) : dispatch(actions.setHistoryOrders(response.data.orders))
        dispatch(actions.setFetchingOrdersState(false));
    } catch (e) {
        console.log(`SOMETHING WENT WRONG WHILE FETCHING ORDERS`, e)
        dispatch(actions.setFetchingOrdersState(false));
    }
}
