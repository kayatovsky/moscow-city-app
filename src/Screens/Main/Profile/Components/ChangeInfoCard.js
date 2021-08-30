import React, {forwardRef, useState} from 'react'
import useScaleFactor from "src/Hooks/useScaleFactor";
import {DrawerGrid} from "src/Components/Layout/DrawerPadding";
import {View, StyleSheet} from "react-native";
import TextInput from "src/Components/Common/TextInput";
import Button from "src/Components/Common/Button";
import {useDispatch, useSelector} from "react-redux";
import Axios from "src/Axios";
import {generateCode} from "../../../../Utils/smsCode";
import {setField, setGeneratedCode} from "../../../../Slices/auth";
import {SMS_SECRET_TOKEN} from "../../../../config";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const ChangeInfoCard = forwardRef(({closeDrawer, navigation}, ref) => {
    const dispatch = useDispatch()
    const {verticalScale} = useScaleFactor();
    const {username, phone, tower} = useSelector(state => state.auth);
    const [usernameState, setUsername] = useState(username)
    const [phoneState, setPhone] = useState(phone)
    const [towerState, setTower] = useState(tower)
    const [errors, setErrors] = useState({
        phone: "",
        tower: "",
        username: ""
    })
    const [isFetching, setFetchingState] = useState(false)


    const styles = StyleSheet.create({
        container: {
            height: 350 * verticalScale,
            backgroundColor: "#fff",
            borderTopStartRadius: 20,
            borderTopEndRadius: 20,
        }
    })

    const sendMessage = async (newPhone) => {
        if (newPhone !== '+71234567890') {
            try {
                const code = generateCode();
                dispatch(setGeneratedCode(code))
                Axios.defaults.headers.common.Authorization = `Key ${SMS_SECRET_TOKEN}`;
                await Axios.post('https://api.devino.online/sms/messages', {
                        "messages": [
                            {
                                "from": "SoCity",
                                "to": newPhone,
                                "text": `Ваш код для изменения номера телефона: ${code}`
                            }
                        ]
                    },
                )
                Axios.defaults.headers.common.Authorization = `Bearer ${await AsyncStorage.getItem('ACCESS_TOKEN')}`;
            } catch (e) {
                console.log("GOT ERROR WHILE MAKING QUERY FOR SMS CODE: ", e)
            }
        }
    }

    const handleChangePersonalInfo = async () => {
        const rePhoneNumber = /^\+?[78][-\(]?\d{3}\)?-?\d{3}-?\d{2}-?\d{2}$/;
        if (!rePhoneNumber.test(phoneState)) {
            setErrors(prevState => ({...prevState, phone: "Введите корректный номер телефона"}))
            return;
        }
        if (usernameState.length === 0) {
            setErrors(prevState => ({...prevState, username: "Новое имя не должно быть пустым"}))
            return;
        }
        if (tower.length === 0) {
            setErrors(prevState => ({...prevState, tower: "Название башни не должно быть пустым"}))
            return;
        }

        setFetchingState(true)
        if (phone !== phoneState) {
            await sendMessage(phoneState);
            closeDrawer();
            navigation.navigate('RegisterCode', {
                usernameState,
                phoneState,
                towerState
            });
        }
        else {
            Axios.patch('/users/update', {
                user: {
                    name: usernameState,
                    phone: phoneState,
                    tower: towerState
                }
            }).then(res => {
                dispatch(setField('phone', phoneState));
                dispatch(setField('tower', towerState));
                dispatch(setField('username', usernameState))
                closeDrawer();
                setFetchingState(false);
            })
        }
    }

    return (
        <View style={styles.container}>
            <DrawerGrid>
                <TextInput
                    title='Имя'
                    value={usernameState}
                    withContainer={false}
                    style={{marginTop: 46 * verticalScale}}
                    onChange={value => {
                        setErrors(prevState => ({...prevState, username: "",}))
                        setUsername(value);
                    }}
                    isError={!!errors.username}
                    errorMessage={errors.username}
                />
                <TextInput
                    title='Номер телефона'
                    value={phoneState}
                    withContainer={false}
                    style={{marginTop: 21 * verticalScale}}
                    onChange={value => {
                        setErrors(prevState => ({...prevState, phone: "",}))
                        setPhone(value);
                    }}
                    isError={!!errors.phone}
                    errorMessage={errors.phone}
                />
                {/*<TextInput
                    title='Название башни'
                    value={towerState}
                    withContainer={false}
                    style={{marginTop: 21 * verticalScale}}
                    onChange={value => {
                        setErrors(prevState => ({...prevState, tower: ""}))
                        setTower(value);
                    }}
                    isError={!!errors.tower}
                    errorMessage={errors.tower}
                />*/}
                <Button
                    title='Изменить'
                    variant='outlined'
                    style={{marginTop: 34 * verticalScale}}
                    onPress={handleChangePersonalInfo}
                    isLoading={isFetching}
                />
            </DrawerGrid>
        </View>
    )
})
