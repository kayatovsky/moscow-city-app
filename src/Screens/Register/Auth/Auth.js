import React, {useState} from 'react'
import {AuthTemplate} from "../Components/Container";
import TextInput from "src/Components/Common/TextInput";
import {useDispatch, useSelector} from "react-redux";
import {setField} from "src/Slices/auth";
import useScaleFactor from "src/Hooks/useScaleFactor";
import {Text, StyleSheet, TouchableWithoutFeedback, View} from "react-native";
import * as WebBrowser from "expo-web-browser";

const Terms = () => {
    const {verticalScale, horizontalScale} = useScaleFactor();
    const {user, personal_data} = useSelector(state => state.auth.docsLinks)
    const styles = StyleSheet.create({
        text: {
            fontFamily: 'regular',
            fontSize: 12 * horizontalScale,
            lineHeight: 14 * verticalScale,
            textAlign: 'center'
        },
        wrapper: {
            position: 'relative',
            bottom: 42 * verticalScale,
            alignItems: 'center',
        },
        underlined: {
            textDecorationLine: 'underline'
        }
    })

    return (
        <View style={styles.wrapper}>
            <TouchableWithoutFeedback onPress={() => WebBrowser.openBrowserAsync(user)}>
                <Text style={styles.text}>Нажимая Далее вы соглашаетесь с условиями
                    <Text style={[styles.text, styles.underlined]}>
                        {" "}Пользовательского соглашения
                    </Text> и
                </Text>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={() => WebBrowser.openBrowserAsync(personal_data)}>
                <Text style={[styles.text, styles.underlined]}>Соглашения на обработку персональных данных</Text>
            </TouchableWithoutFeedback>
        </View>
    )
}

export default function Auth({navigation}) {
    const {phone} = useSelector(state => state.auth)
    const [phoneNumber, setPhone] = useState(phone)
    const [isError, setError] = useState(false);
    const [errorText, setErrorText] = useState("")
    const dispatch = useDispatch()

    const proceed = () => {
        const rePhoneNumber = /^\+?[78][-\(]?\d{3}\)?-?\d{3}-?\d{2}-?\d{2}$/;
        if (rePhoneNumber.test(phoneNumber)) {
            dispatch(setField('phone', phoneNumber))
            navigation.navigate('RegisterName')
        } else {
            setError(true);
            setErrorText("Введите корректный номер телефона");
        }

    }

    const handleTextChange = text => {
        if (text.length === 0) {
            setPhone("");
            return;
        }
        if (text[0] === "8")
            setPhone(text.replace("8", "+7"))
        else if (text[0] !== "+")
            setPhone(`+7${text[0]}`)
        else {
            setError(false);
            setErrorText("");
            setPhone(text);
        }
    }

    return (
        <AuthTemplate
            title='Авторизация'
            buttonText='Далее'
            isAbleToMoveBack={false}
            buttonAction={proceed}
            navigation={navigation}
            iconComponent={<Terms/>}
            isButtonDisabled={phoneNumber.length < 1}
        >
            <TextInput
                title='Номер телефона'
                withContainer={false}
                value={phoneNumber}
                isError={isError}
                errorMessage={errorText}
                onChange={handleTextChange}
                keyboardType="phone-pad"
            />
        </AuthTemplate>
    );
}

