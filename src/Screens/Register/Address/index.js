import React, {useState} from 'react'
import {AuthTemplate} from "../Components/Container";
import TowersList from "src/Screens/Register/Address/TowersList";
import {useDispatch, useSelector} from "react-redux";
import {generateCode} from "../../../Utils/smsCode";
import Axios from "axios";
import {SMS_SECRET_TOKEN} from "src/config";
import {setGeneratedCode} from "src/Slices/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Name({navigation}) {
    const {tower, phone} = useSelector(state => state.auth);
    const [isFetchingData, setFetchingData] = useState(false)
    const dispatch = useDispatch()

    const sendMessage = async () => {
        if (phone !== '+71234567890') {
            console.log("SENDING SMS CODE...")
            try {
                const code = generateCode();
                dispatch(setGeneratedCode(code))
                setFetchingData(true);
                Axios.defaults.headers.common.Authorization = `Key ${SMS_SECRET_TOKEN}`;
                await Axios.post('https://api.devino.online/sms/messages', {
                        "messages": [
                            {
                                "from": "SoCity",
                                "to": phone,
                                "text": `Здравствуйте, ваш код для регистрации в So City: ${code}`
                            }
                        ]
                    },
                )
                Axios.defaults.headers.common.Authorization = `Bearer ${await AsyncStorage.getItem('ACCESS_TOKEN')}`;
                setFetchingData(false);
            } catch (e) {
                setFetchingData(false);
                Axios.defaults.headers.common.Authorization = `Bearer ${await AsyncStorage.getItem('ACCESS_TOKEN')}`;
                console.log("GOT ERROR WHILE MAKING QUERY FOR SMS CODE: ", e)
            }
        }
    }

    return (
        <AuthTemplate
            title='Ваш адрес'
            buttonText='Далее'
            isButtonDisabled={!tower}
            buttonAction={async () => {
                if (tower) {
                    await sendMessage();
                    navigation.navigate('RegisterCode')
                }
            }}
            navigation={navigation}
            isButtonLoading={isFetchingData}
        >
            <TowersList/>
        </AuthTemplate>
    );
}

