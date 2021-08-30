import * as React from "react"
import {StyleSheet, Text, View} from "react-native";
import Apple from "./Apple";
import useScaleFactor from "../../../Hooks/useScaleFactor";

export default function () {
    const {verticalScale, horizontalScale} = useScaleFactor();

    const styles = StyleSheet.create({
        container: {
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center"
        },
        payText: {
            marginLeft: 5 * horizontalScale,
            fontSize: 28 * horizontalScale,
            lineHeight: 37 * horizontalScale,
            color: "#FFF",
            fontFamily: 'medium',
        },
    })
    return (
        <View style={styles.container}>
            <Apple/>
            <Text style={styles.payText}>
                Pay
            </Text>
        </View>
    )
}
