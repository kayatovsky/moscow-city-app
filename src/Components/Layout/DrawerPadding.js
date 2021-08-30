import {StyleSheet, View} from "react-native";
import React from "react";

export const DrawerGrid = ({children, flex}) => {
    const styles = StyleSheet.create({
        container: {
            flexDirection: "row",
            width: "100%",
            justifyContent: "center",
            flex: flex && 1,
            position: 'relative',
        },
        content: {
            width: "83.6%",
            overflow: "visible"
        },
    })

    return (
        <View style={styles.container}>
            <View style={styles.content}>{children}</View>
        </View>
    )
}
