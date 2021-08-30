import React from 'react'
import {StyleSheet, TouchableOpacity, Text, ActivityIndicator, View} from 'react-native'
import {formRadius} from "src/Utils/styles";
import {MAIN_BLUE_COLOR} from "src/Theme/theme";
import useScaleFactor from "src/Hooks/useScaleFactor";
import GooglePay from "src/Assets/Icons/Pay/GooglePay";
import ApplePay from "src/Assets/Icons/Pay/ApplePay";
import {isAndroid} from "src/config";

export default function ({
                             isError, title, color = 'light', onPress, variant,
                             fullWidth = false, isLoading = false, style, disabled, withMargins = true
                         }) {
    const {verticalScale, horizontalScale} = useScaleFactor();

    const getBackground = () => {
        if (variant === 'outlined')
            return null
        if (color === 'primary')
            return MAIN_BLUE_COLOR
        if (color === 'secondary')
            return '#000'
    }

    const getBorder = () => {
        if (variant === 'outlined') {
            if (isError)
                return ({borderColor: '#FF1717', borderWidth: 2})
            if (disabled)
                return ({borderColor: '#4D4D4D', borderWidth: 2})
            return ({
                borderWidth: 2,
                borderColor: "#000"
            })
        }
        return null
    }

    const getFontColor = () => {
        if (isError)
            return '#FF1717';
        if (variant === 'outlined')
            return '#000'
        else
            return '#fff'
    }

    const RenderPay = () => {
        return (
            <View>
                {isAndroid ? <GooglePay/> : <ApplePay/>}
            </View>
        )
    }

    const RenderContent = () => {
        return (
            <View>
                {title === "platformPay" ? <RenderPay/> :
                    <Text style={styles.text}>
                        {title}
                    </Text>}
            </View>
        )
    }


    const styles = StyleSheet.create({
        base: {
            backgroundColor: getBackground(),
            ...getBorder(),
            ...formRadius(20),
            width: "100%",
            marginBottom: withMargins ? (21 * verticalScale) : 0,
            marginHorizontal: "auto",
            height: 70 * verticalScale,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
        },
        text: {
            fontSize: 17 * horizontalScale,
            fontWeight: "500",
            lineHeight: 21 * horizontalScale,
            color: getFontColor(),
            fontFamily: 'medium',
        },
        fullWidth: {
            width: "100%"
        },
    })

    const isFullWidth = fullWidth ? styles.fullWidth : null;
    return (
        <TouchableOpacity
            activeOpacity={disabled ? 1 : 0.2}
            onPress={onPress}
            style={[styles.base, isFullWidth, style]}
        >
            {isLoading ?
                <ActivityIndicator/> :
                <RenderContent/>}
        </TouchableOpacity>
    )
}



