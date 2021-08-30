import React, {useRef, useEffect} from "react";
import {Animated, StyleSheet, Easing} from "react-native";
import useScaleFactor from "src/Hooks/useScaleFactor";
import {useNetInfo} from "@react-native-community/netinfo";
import {MAIN_SCREEN_BACKGROUND_COLOR} from "../../Theme/theme";


export default function NetworkNotification() {
    const netInfo = useNetInfo();
    const {verticalScale, horizontalScale} = useScaleFactor();

    const styles = StyleSheet.create({
        container: {
            zIndex: 100,
            height: 85 * verticalScale,
            position: "absolute",
            //backgroundColor: MAIN_SCREEN_BACKGROUND_COLOR,
            backgroundColor: 'red',
            alignSelf: 'center',
            width: "100%",
            shadowColor: "#e1e1e8",
            shadowOffset: {
                width: 0,
                height: 10,
            },
            shadowOpacity: 0.8,
            /*shadowRadius: 20,
            borderBottomLeftRadius: 20,
            borderBottomRightRadius: 20*/

        },
        text: {
            alignSelf: 'center',
            marginTop: 40 * verticalScale,
            fontSize: 17 * horizontalScale,
            fontWeight: "500",
            lineHeight: 21 * horizontalScale,
        },
    })


    const animate_state = {
        start: 0,
        end: 100
    }

    const valueAnimated = useRef(new Animated.Value(animate_state.start)).current
    const valueAnimated_ = useRef(new Animated.Value(animate_state.start)).current
    const inputRange = Object.values(animate_state)
    const marginTop = valueAnimated.interpolate({inputRange, outputRange: [-85 * verticalScale, 0]})
    const opacity = valueAnimated_.interpolate({inputRange, outputRange: [0, 1]})


    useEffect(() => {
        if (netInfo.isConnected) {
            Animated.timing(valueAnimated, {
                toValue: animate_state.start,
                useNativeDriver: false,
                duration: 1800,
                easing: Easing.bezier(0.22, 1, 0.36, 1)
            }).start()
            Animated.timing(valueAnimated_, {
                toValue: animate_state.start,
                useNativeDriver: false,
                duration: 1800,
                easing: Easing.bezier(0.22, 1, 0.36, 1)
            }).start()
        } else {
            Animated.timing(valueAnimated, {
                toValue: animate_state.end,
                useNativeDriver: false,
                duration: 1000,
                easing: Easing.bezier(0.22, 1, 0.36, 1)
            }).start()
            Animated.timing(valueAnimated_, {
                toValue: animate_state.end,
                useNativeDriver: false,
                duration: 1000,
                easing: Easing.bezier(0.22, 1, 0.36, 1)
            }).start()
        }
    });

    return (
        <Animated.View style={[{marginTop}, styles.container]}>
            <Animated.Text style={[{opacity}, styles.text]}>
                Нет интернет соединения
            </Animated.Text>
        </Animated.View>
    )
}
