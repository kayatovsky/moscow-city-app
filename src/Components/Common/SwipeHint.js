import React from "react";
import {View, StyleSheet, Text} from "react-native";
import SwipeHand from "src/Assets/Icons/Navigation/SwipeHand";
import useScaleFactor from "src/Hooks/useScaleFactor";

export default function () {

    const {horizontalScale} = useScaleFactor();
    const styles = StyleSheet.create({
        container: {
            flexDirection: "row",
            justifyContent: "center",
        },
        text: {
            alignSelf: "center",
            fontFamily: "regular",
            fontSize: 12 * horizontalScale,
            marginLeft: 6 * horizontalScale
        },
    })

    return (
        <View style={styles.container}>
            <SwipeHand/>
            <Text style={styles.text}>
                свайпайте, чтобы видеть больше
            </Text>
        </View>
    )
}
