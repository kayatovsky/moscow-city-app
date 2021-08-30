import React from 'react'
import {Text, View, StyleSheet, TouchableOpacity, Linking} from "react-native";
import useScaleFactor from "src/Hooks/useScaleFactor";
import {NeomorphBox} from "react-native-neomorph-shadows";
import Chevron from "src/Assets/Chevron";

export default function({withPaddings=false, navigation, link, title, isNav=true, onPress=() => {}, isLast, href}) {

    const {verticalScale, horizontalScale} = useScaleFactor();


    const styles = StyleSheet.create({
        text: {
            fontFamily: "regular",
            fontSize: 17 * verticalScale,
            lineHeight: 26 * verticalScale,
            color: "#000"
        },
        container: {
            alignItems: "center",
            flexDirection: "row",
            justifyContent: "space-between",
            height: "100%",
            backgroundColor: "#F0F0F3",
            width: "82%",
        },
        alignCenter: {
            width: "100%",
            borderRadius: 23,
            height: "100%",
            alignItems: "center"
        }
    })

    return (
        <TouchableOpacity onPress={() => {
            onPress()
            if (href)
                Linking.openURL(href)
            else if (isNav && link)
                navigation.navigate(link)
        }}>
            <NeomorphBox
                darkShadowColor="#e1e1e8"
                lightShadowColor="#fff"
                style={{
                    shadowOpacity: 1,
                    shadowRadius: 8,
                    borderRadius: 23,
                    backgroundColor: "#F0F0F3",
                    height: withPaddings ? 80 * verticalScale : 60 * verticalScale,
                    width: 295 * horizontalScale,
                    marginBottom: isLast ? 50 * verticalScale: 27 * verticalScale
                }}
            >
                <View style={styles.alignCenter}>
                    <View style={styles.container}>
                        <Text style={styles.text}>{title}</Text>
                        <Chevron/>
                    </View>
                </View>
            </NeomorphBox>
        </TouchableOpacity>
    )
}


