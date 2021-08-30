import React from 'react'
import {View, Text, StyleSheet} from "react-native";
import useScaleFactor from "src/Hooks/useScaleFactor";

export default function ({label, price, isBold, withMarginBottom = true}) {
    const {horizontalScale, verticalScale} = useScaleFactor()
    const styles = StyleSheet.create({
        container: {
            flexDirection: 'row',
            width: '100%',
            justifyContent: 'space-between',
            marginBottom: withMarginBottom ? 13 * verticalScale : 0,
        },
        text: {
            fontFamily: isBold ? 'bold' : 'regular',
            fontSize: 17 * horizontalScale
        }
    })
    return (
        <View style={styles.container}>
            <Text style={styles.text}>{label}</Text>
            <Text style={styles.text}>{price} ₽</Text>
        </View>
    )
}
