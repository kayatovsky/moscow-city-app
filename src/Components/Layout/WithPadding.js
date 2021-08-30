import React from 'react'
import {View, StyleSheet} from "react-native";



export default function ({children}) {
    const styles = StyleSheet.create({
        padding: {
            flex: 1
        },
        content: {
            width: "71.4%",
            overflow: "visible"
        },
        container: {
            flexDirection: "row",
            width: "100%",
            justifyContent: "center",
        }
    })

    return (
        <View style={styles.container}>
            <View style={styles.content}>{children}</View>
        </View>
    )
}
