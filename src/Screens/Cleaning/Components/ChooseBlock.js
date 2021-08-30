import React from "react";
import {View, Text, StyleSheet} from "react-native";
import useScaleFactor from "src/Hooks/useScaleFactor";

export default function ({title, children}) {
    const {verticalScale, horizontalScale} = useScaleFactor()
    const styles = StyleSheet.create({
        container: {
            borderRadius: 20,
            borderWidth: 1,
            borderColor: '#000',
            marginTop: 13 * verticalScale,
            height: 156 * verticalScale,
            paddingLeft: 14 * horizontalScale
        },
        titleText: {
            fontSize: 22 * horizontalScale,
            lineHeight: 28 * verticalScale,
            fontFamily: 'regular'
        }
    })
    return (
        <View>
            <Text style={styles.titleText}>{title}</Text>
            <View style={styles.container}>
                {children}
            </View>
        </View>
    )
}
