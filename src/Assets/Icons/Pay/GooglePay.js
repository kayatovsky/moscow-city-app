import * as React from "react"
import useScaleFactor from "src/Hooks/useScaleFactor";
import {StyleSheet, Text, View} from "react-native";
import Google from "./Google";

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
            fontSize: 26 * horizontalScale,
            color: "#FFF",
            fontFamily: 'medium',
        },
    })

    return (
        <View style={styles.container}>
            <Google/>
            <Text style={styles.payText}>
                Pay
            </Text>
        </View>
    )
}
