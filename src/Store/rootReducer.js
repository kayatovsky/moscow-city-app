import {combineReducers} from '@reduxjs/toolkit'
import {reducer as mainScreen} from 'src/Slices/mainScreen'
import {reducer as auth} from "src/Slices/auth";
import {reducer as payment} from "src/Slices/payment";

export const rootReducer = combineReducers({
    mainScreen,
    auth,
    payment,
})
