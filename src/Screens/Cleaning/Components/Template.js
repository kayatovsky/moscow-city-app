import {Text, View, StyleSheet, TouchableOpacity} from 'react-native'
import React, {Fragment} from 'react'
import {GREY_TEXT_COLOR, MAIN_SCREEN_BACKGROUND_COLOR} from "src/Theme/theme";
import HorizontalAlign from "src/Components/Layout/HorizontalAlign";
import WithPadding from "src/Components/Layout/WithPadding";
import useScaleFactor from "src/Hooks/useScaleFactor";
import Back from 'src/Assets/Icons/Navigation/Back';
import {Icon} from "react-native-elements";
import {useDispatch} from "react-redux";
import {chooseNextDay, choosePreviousDay} from "src/Slices/payment";
import ShoppingCart from "src/Assets/Icons/Navigation/ShoppingCart";
import Question from "src/Assets/Icons/Question";
import ShoppingBag from "src/Components/Common/ShoppingBag";

export default function CleaningScreensContainer(
    {
        primaryText,
        children,
        isBodyFullWidth = false,
        withScrollView = true,
        navigation,
        openDrawer,
        isAbleToMoveBack = true,
        withShoppingCart = false,
        withInformationIcon = true,
        withTimeChoose,
    }) {

    const {verticalScale, horizontalScale} = useScaleFactor();
    const dispatch = useDispatch();


    const Wrapper = isBodyFullWidth ? WithPadding : Fragment

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: MAIN_SCREEN_BACKGROUND_COLOR,
            flexDirection: "column",
        },
        header: {
            paddingTop: 65 * verticalScale,
            paddingBottom: 48 * verticalScale,
            width: "100%",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: 'center',
        },
        title: {
            fontFamily: "bold",
            fontSize: 34 * horizontalScale,
            fontWeight: "700",
        },
        content: {
            flexDirection: "column",
        },
        titleContainer: {
            paddingBottom: 27 * horizontalScale,
            justifyContent: 'space-between',
            flexDirection: 'row',
            alignItems: 'center',
        },
        date: {
            fontFamily: 'light',
            color: GREY_TEXT_COLOR,
            fontSize: 17 * horizontalScale,
            textDecorationLine: 'underline',
            lineHeight: 22 * verticalScale
        },
        timeSwitchContainer: {
            flexDirection: 'row',
        }
    });

    return (
        <HorizontalAlign isScrollable={withScrollView} withPadding={!isBodyFullWidth}>
            <View style={styles.container}>
                <View style={{width: "100%"}}/>
                <View>
                    <Wrapper>
                        <View style={styles.header}>
                            {
                                isAbleToMoveBack && <Back
                                    onPress={() => navigation.goBack()}
                                />
                            }
                            {
                                withShoppingCart &&
                                <ShoppingBag
                                    disabled={primaryText === 'Клининг' || primaryText === 'Массаж'}
                                    onPress={() => navigation.navigate('ShoppingCart')}
                                />
                            }

                        </View>

                        <View style={[styles.titleContainer]}>
                            <Text style={styles.title}>{primaryText}</Text>

                            {withInformationIcon &&
                            <TouchableOpacity
                                style={{padding: 3, position: 'relative', top: 0, left: 3}}
                            >
                                <Question onPress={openDrawer}/>
                            </TouchableOpacity>
                            }


                            {
                                withTimeChoose &&
                                <View style={styles.timeSwitchContainer}>
                                    <TouchableOpacity onPress={() => dispatch(choosePreviousDay())}>
                                        <Icon style={{marginRight: 5 * horizontalScale}} name='keyboard-arrow-left'/>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => dispatch(chooseNextDay())}>
                                        <Icon style={{position: 'relative', left: 8 * horizontalScale}} name='keyboard-arrow-right'/>
                                    </TouchableOpacity>
                                </View>
                            }

                        </View>
                    </Wrapper>
                    <View style={styles.content}>
                        {children}
                    </View>
                </View>
            </View>
        </HorizontalAlign>
    )
}

