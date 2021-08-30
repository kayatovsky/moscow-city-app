import React from 'react'
import {View, Text, StyleSheet} from 'react-native'
import useScaleFactor from "../../../Hooks/useScaleFactor";

export default function({title}) {
    const {verticalScale, horizontalScale} = useScaleFactor();
    const styles = StyleSheet.create({
        container: {
            display: "flex",
            justifyContent: "flex-start",
            width: "100%",
        },
        text: {
            fontFamily: "bold",
            color: "#000",
            fontWeight: "700",
            fontSize: 34 * horizontalScale,
            lineHeight: 41 * verticalScale,
        }
    });
    return (
        <View style={styles.container}>
            <Text style={styles.text}>
                {title}
            </Text>
        </View>
    )
}


