import React, {useRef, Fragment, useEffect} from 'react'
import {View, Text, StyleSheet, TouchableOpacity, } from 'react-native'
import Template from "../Components/Container";
import MenuItem from "src/Components/Common/MenuItem";
import useScaleFactor from "src/Hooks/useScaleFactor";
import {NeomorphBox} from "react-native-neomorph-shadows";
import {useDispatch, useSelector} from "react-redux";
import {setBackdropState} from "src/Slices/mainScreen";
import {ChangeInfoCard} from "./Components/ChangeInfoCard";
import ImagePicker from "src/Components/Common/ImagePicker";
import {Modalize} from 'react-native-modalize';
import {MAIN_BLUE_COLOR} from "src/Theme/theme";
import {logout} from "src/Slices/auth";

export default function ({navigation}) {
    const {verticalScale, horizontalScale} = useScaleFactor();
    const {username, phone, tower} = useSelector(state => state.auth)
    const ref = useRef(null);
    const dispatch = useDispatch();

    const closeBottomDrawer = async () => {
        dispatch(setBackdropState(false));
    }
    const openBottomDrawer = () => {
        dispatch(setBackdropState(true));
    }

    useEffect(() => {
        return () => dispatch(setBackdropState(false));
    }, [])

    const styles = StyleSheet.create({
        container: {
            flexDirection: "column",
            paddingBottom: 20 * verticalScale, /*todo: fix padding of needed*/
        },
        textChange: {
            fontSize: 17 * horizontalScale,
            lineHeight: 21 * verticalScale,
            color: MAIN_BLUE_COLOR
        },
        infoContainer: {
            display: "flex",
            flexDirection: "row",
            width: "100%",
            paddingTop: 18 * verticalScale,
            marginBottom: 22 * verticalScale
        },
        dataContainer: {
            paddingTop: 20 * verticalScale,
        },
        infoContainerDataName: {
            fontFamily: "regular",
            fontSize: 22 * horizontalScale,
            lineHeight: 22 * horizontalScale,
            color: "#000",
        },
        infoContainerDataLowerBlock: {
            paddingVertical: 26 * verticalScale,
            maxWidth: 185 * horizontalScale,
        },
        lowerBlockText: {
            fontSize: 15 * horizontalScale,
            lineHeight: 21 * verticalScale,
            color: "#000",
            fontFamily: "regular"
        },
        buttonWrapper: {
            fontFamily: "regular",
            paddingTop: 15 * verticalScale,
            alignItems: "center",
            width: "100%",
        },
    })

    const sections = [
        {
            title: "История заказов",
            link: "HistoryOrders",
        },
        {
            title: "Помощь",
            link: "Help",
        },
        {
            title: "О сервисе",
            link: "About",
        },
        {
            title: "Сотрудничество",
            link: "Cooperation",
            href: "https://t.me/moscina"
        }
    ]

    return (
        <Fragment>
            <Template
                primaryText="Ваш"
                secondaryText="профиль"
                navigation={navigation}
                withScrollView
            >
                <View style={styles.container}>
                    <TouchableOpacity onPress={() => {
                        openBottomDrawer();
                        ref.current && ref.current.open();
                    }}>
                        <Text style={styles.textChange}>Изменить</Text>
                    </TouchableOpacity>
                    <View style={styles.infoContainer}>
                        <NeomorphBox
                            darkShadowColor="#e1e1e8"
                            lightShadowColor="#fff"
                            style={{
                                shadowOpacity: 1,
                                shadowRadius: 8,
                                borderRadius: 23,
                                backgroundColor: "#F0F0F3",
                                width: 123 * horizontalScale,
                                height: 136 * verticalScale,
                                marginRight: 18 * horizontalScale
                            }}
                        >
                            <ImagePicker/>
                        </NeomorphBox>
                        <View style={styles.dataContainer}>
                            <Text style={styles.infoContainerDataName}>{username}</Text>
                            <View style={styles.infoContainerDataLowerBlock}>
                                <View style={{marginBottom: 8 * verticalScale}}>
                                    <Text style={styles.lowerBlockText}>{phone}</Text>
                                </View>
                                <Text style={styles.lowerBlockText}>{tower}</Text>
                            </View>
                        </View>
                    </View>
                    {sections.map((item, index) =>
                        <MenuItem title={item.title} href={item.href} link={item.link} key={index} navigation={navigation}/>
                    )}
                    <View style={styles.buttonWrapper}>
                        <TouchableOpacity>
                            <Text
                                style={{
                                    color: '#000',
                                    fontFamily: 'regular',
                                    fontSize: 16 * horizontalScale,
                                    textDecorationLine: 'underline'
                                }}
                                onPress={() => {
                                    navigation.navigate('RegisterMobile');
                                    dispatch(logout());
                                }}
                            >
                                Выйти
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Template>
            <Modalize
                ref={ref}
                modalHeight={350 * verticalScale}
                onClosed={closeBottomDrawer}
                keyboardAvoidingBehavior='position'
                customRenderer={<ChangeInfoCard navigation={navigation} closeDrawer={() => ref?.current.close()}/>}
                withHandle={true}
            />
        </Fragment>

    )
}


