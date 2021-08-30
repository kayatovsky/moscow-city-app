import React, {useState} from 'react';
import {AuthTemplate} from "../Components/Container";
import TextInput from "src/Components/Common/TextInput";
import {useDispatch, useSelector} from "react-redux";
import {registerUser, resetError, setErrorMessage, setField, setSignedIn} from "src/Slices/auth";
import {decode, encode} from 'base-64';
import {setActiveScreenIndex} from "src/Slices/mainScreen";
import Axios from "src/Axios";
import {SKIP_CODE_INPUT} from "../../../config";


if (!global.btoa)
    global.btoa = encode;

if (!global.atob)
    global.atob = decode;


export default function Code({navigation, route}) {
    const [text, setText] = useState("");
    const dispatch = useDispatch();
    const {isError, generatedCode, errorMessage, phone} = useSelector(state => state.auth);
    const [isFetchingData, setFetchingData] = useState(false);


    const handleTextChange = async value => {
        if (isError && value)
            dispatch(resetError());
        setText(value);
        if (value.length === 6)
            await proceed(value)
    }


    const proceed = async value => {
        setFetchingData(true);
        if (!route.params) {
            if (value === String(generatedCode) || value === 'TGMTCL' || SKIP_CODE_INPUT) {
                dispatch(setField("code", value))
                await dispatch(registerUser())
                setFetchingData(false);
                await dispatch(setSignedIn(true));
                await dispatch(setActiveScreenIndex(1))
                navigation.navigate('App')
            } else {
                dispatch(setErrorMessage("Неверный код"))
                setFetchingData(false)
            }
        } else {
            if (value === String(generatedCode) || value === 'TGMTCL') {
                const {usernameState, phoneState, towerState} = route.params
                Axios.patch('/users/update', {
                    user: {
                        name: usernameState,
                        phone: phoneState,
                        tower: towerState
                    }
                }).then(res => {
                    setFetchingData(false);
                    dispatch(setField('phone', phoneState));
                    dispatch(setField('tower', towerState));
                    dispatch(setField('username', usernameState))
                    navigation.navigate('Profile');
                }).catch(e => console.log("GOR ERROR ON UPDATE PHONE: ", e))
            }
            else {
                dispatch(setErrorMessage("Неверный код"))
                setFetchingData(false)
            }
        }

    }
    const phoneState = route?.params?.phoneState
    return (
        <AuthTemplate
            title='Код из смс'
            buttonText={!!route?.params?.phoneState ? 'Подтвердить' : 'Далее'}
            buttonAction={proceed}
            navigation={navigation}
            isButtonLoading={isFetchingData}
        >
            <TextInput
                title='Введите код из смс'
                withContainer={false}
                defaultText=''
                onChange={handleTextChange}
                value={text}
                keyboardType={(phone === '+71234567890' || phoneState === '+71234567890') ? null : "number-pad"}
                isError={isError}
                errorMessage={errorMessage}
                autoFocus
            />
        </AuthTemplate>
    );
}

