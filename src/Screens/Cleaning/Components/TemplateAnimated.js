import {Text, View, StyleSheet, TouchableOpacity} from 'react-native'
import React, {Fragment} from 'react'
import {GREY_TEXT_COLOR, MAIN_SCREEN_BACKGROUND_COLOR} from "src/Theme/theme";
import WithPadding from "src/Components/Layout/WithPadding";
import useScaleFactor from "src/Hooks/useScaleFactor";
import {Icon} from "react-native-elements";
import {useDispatch} from "react-redux";
import {chooseNextDay, choosePreviousDay} from "../../../Slices/payment";
import HorizontalAlignAnimated from "../../../Components/Layout/HorizontalAlignAnimated";

export default function (
    {
        primaryText,
        secondaryText,
        children,
        withScrollView = true,
        isBodyFullWidth = false,
        navigation,
        openDrawer,
        withInformationIcon = true,
        isTimeChoose,
        isAbleToMoveBack = true,
        withShoppingCart = false,
        scrollDisabled = false
    }) {

    const {verticalScale, horizontalScale} = useScaleFactor();
    const dispatch = useDispatch();

    const Wrapper = isBodyFullWidth ? WithPadding : Fragment
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: MAIN_SCREEN_BACKGROUND_COLOR,
            flexDirection: "column",
            height: '100%'
        },
        header: {
            paddingTop: 12 * verticalScale,
            paddingBottom: 30 * verticalScale,
            width: "100%",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: 'center'
        },
        title: {
            fontFamily: "bold",
            fontSize: 34 * horizontalScale,
            fontWeight: "700",
        },
        titleFaded: {
            fontFamily: "bold",
            fontSize: 23 * horizontalScale,
            fontWeight: "700",
        },
        content: {
            flexDirection: "column",
        },
        titleContainer: {
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
            flexDirection: 'row'
        }
    });

    return (
        <HorizontalAlignAnimated isScrollable={withScrollView} secondaryText={secondaryText}
                                 withPadding={!isBodyFullWidth} scrollDisabled={scrollDisabled}
                                 isAbleToMoveBack={isAbleToMoveBack} navigation={navigation}
                                 primaryText={primaryText} withShoppingCart={withShoppingCart}>
            <View style={styles.container}>
                <View>
                    <Wrapper>
                        <View
                            style={{
                                flexDirection: "column",
                                marginBottom: 30 * verticalScale
                            }}>
                            <View style={[styles.titleContainer]}>
                                <Text style={styles.title}>{primaryText}</Text>
                                {withInformationIcon &&
                                <TouchableOpacity
                                    style={{padding: 3, position: 'relative', top: 0, left: 3}}
                                    onPress={openDrawer}
                                >
                                    <Icon name='info-outline'/>
                                </TouchableOpacity>
                                }
                                {
                                    isTimeChoose &&
                                    <View style={styles.timeSwitchContainer}>
                                        <TouchableOpacity onPress={() => dispatch(choosePreviousDay())}>
                                            <Icon style={{marginRight: 7 * horizontalScale}}
                                                  name='keyboard-arrow-left'/>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => dispatch(chooseNextDay())}>
                                            <Icon name='keyboard-arrow-right'/>
                                        </TouchableOpacity>
                                    </View>
                                }
                            </View>
                            <Text style={styles.title}>{secondaryText}</Text>
                        </View>
                    </Wrapper>
                    <View style={styles.content}>
                        {children}
                    </View>
                </View>
            </View>
        </HorizontalAlignAnimated>
    )
}


