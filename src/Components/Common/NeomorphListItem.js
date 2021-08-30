import React from 'react'
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {NeomorphBox} from "react-native-neomorph-shadows";
import useScaleFactor from "src/Hooks/useScaleFactor";

export default function ({onPress=() => {}, title, style}) {

    const {verticalScale, horizontalScale} = useScaleFactor()

    const styles = StyleSheet.create({
        text: {
            fontSize: 20 * horizontalScale,
            fontFamily: 'regular'
        },
        item: {
            height: '100%',
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center'
        }
    })

    return (
        <TouchableOpacity onPress={onPress}>
            <NeomorphBox
                darkShadowColor="#e1e1e8"
                lightShadowColor="#fff"
                style={{
                    shadowOpacity: 1,
                    shadowRadius: 8,
                    borderRadius: 23,
                    backgroundColor: "#F0F0F3",
                    height: 60 * verticalScale,
                    width: 295 * horizontalScale,
                    marginBottom: 27 * verticalScale,
                    ...style
                }}
            >
                <View style={styles.item}>
                    <Text style={styles.text}>{title}</Text>
                </View>
            </NeomorphBox>
        </TouchableOpacity>
    )
}
