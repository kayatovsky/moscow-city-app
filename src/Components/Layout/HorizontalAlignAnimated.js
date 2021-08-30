import React, {Fragment, useRef} from 'react'
import {View, StyleSheet, Animated} from 'react-native'
import {MAIN_SCREEN_BACKGROUND_COLOR} from "../../Theme/theme";
import useScaleFactor from "../../Hooks/useScaleFactor";
import Back from "../../Assets/Icons/Navigation/Back";
import ShoppingCart from "../../Assets/Icons/Navigation/ShoppingCart";
import WithPadding from "./WithPadding";
import ShoppingBag from "../Common/ShoppingBag";


export default function HorizontalAlignAnimated({
                                                    withPadding = true, children, isAbleToMoveBack, navigation,
                                                    primaryText, withShoppingCart, secondaryText, isScrollable
                                                }) {

    const offset = useRef(new Animated.Value(0)).current;
    const Wrapper = withPadding ? WithPadding : Fragment;
    const {verticalScale, horizontalScale} = useScaleFactor();

    const styles = StyleSheet.create({
        container: {
            flexDirection: "row",
            flex: 1,
            backgroundColor: MAIN_SCREEN_BACKGROUND_COLOR,
            height: '100%'
        },
        paddings: {
            flex: 1
        },
        content: {
            flex: 5,
            height: '100%'
        },
        header: {
            paddingTop: 65 * verticalScale,
            paddingBottom: 48 * verticalScale,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: 'space-between',
        },
        titleFaded: {
            fontFamily: "bold",
            fontSize: 18 * horizontalScale,
            fontWeight: "700",
            flex: 1,
            textAlign: 'center'
        },
    })

    const opacity = offset.interpolate({
        inputRange: [20 * verticalScale, 25 * verticalScale],
        outputRange: [0, 1],
        extrapolate: 'clamp'
    });

    const Heading = () => {
        return (
            <View style={{backgroundColor: MAIN_SCREEN_BACKGROUND_COLOR}}>
                <View style={{width: "100%"}}/>
                <Wrapper>
                    <View style={styles.header}>
                        <View style={{flexDirection: 'row', alignItems: 'center', width: '90%'}}>
                            {isAbleToMoveBack &&
                            (<Back
                                onPress={() => navigation.goBack()}
                            />)}

                            <Animated.Text
                                style={[styles.titleFaded, {opacity}]}>
                                {primaryText} {secondaryText}
                            </Animated.Text>
                        </View>
                        <View style={{justifyContent: 'center'}}>
                            {withShoppingCart ?
                                <ShoppingBag
                                    onPress={() => navigation.navigate('ShoppingCart')}
                                /> : <View style={{
                                    flex: 1,
                                }}/>}
                        </View>
                    </View>
                </Wrapper>
            </View>
        )
    }
    const WrapperComponent = isScrollable ? Animated.ScrollView : Animated.View
    return (
        <View style={{
            backgroundColor: MAIN_SCREEN_BACKGROUND_COLOR,
            flexDirection: 'column',
            flex: 1,
        }}>
            <Heading/>
            <WrapperComponent
                scrollEventThrottle={100}
                style={{height: '100%', flex: 1}}
                onScroll={Animated.event(
                    [{nativeEvent: {contentOffset: {y: offset}}}],
                    {useNativeDriver: true},
                )}
            >

                <View style={styles.container}>
                    {withPadding && <View style={styles.paddings}/>}
                    <View style={styles.content}>
                        {children}
                    </View>
                    {withPadding && <View style={styles.paddings}/>}
                </View>
            </WrapperComponent>
        </View>
    )
}

