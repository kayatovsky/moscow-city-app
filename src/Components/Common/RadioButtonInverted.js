import React, {Fragment} from 'react'
import {View, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, Pressable} from "react-native";
import useScaleFactor from "src/Hooks/useScaleFactor";
import {MAIN_BLUE_COLOR} from "src/Theme/theme";


export default function ({
                             withBorder = false, disabled = true, value, primaryText, secondaryText, onChange = () => {
    }, isFirst = false
                         }) {
    const {verticalScale, horizontalScale} = useScaleFactor();
    const styles = StyleSheet.create({
        container: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: isFirst ? 0 : 22 * verticalScale,
            paddingBottom: 11 * verticalScale
        },
        marker: {
            width: 15 * horizontalScale,
            justifyContent: 'center',
        },
        textContainer: {
            flexDirection: 'row',
            width: 229 * horizontalScale,
            paddingLeft: 2 * horizontalScale,
            alignItems: 'center',
        },
        text: {
            fontSize: 17 * horizontalScale,
            fontFamily: 'regular'
        },
        markerContainer: {
            width: 15 * verticalScale,
            height: 15 * verticalScale,
            borderRadius: 7.5 * verticalScale,
            borderWidth: 1,
            alignItems: 'center',
            justifyContent: 'center',
        },
        circle: {
            width: 7.5 * verticalScale,
            height: 7.5 * verticalScale,
            backgroundColor: MAIN_BLUE_COLOR,
            borderRadius: 6 * verticalScale
        },
        disabledMarker: {
            borderColor: '#9F9F9F'
        },
        enabledMarker: {
            borderColor: MAIN_BLUE_COLOR
        },
        withBorder: {
            borderBottomWidth: 1,
            borderBottomColor: 'rgba(0, 0, 0, .2)',
        }
    })

    return (
        <TouchableOpacity onPress={() => onChange(value)} style={[styles.container, withBorder && styles.withBorder]}>
            <View style={[styles.textContainer]}>
                <Text style={styles.text}>
                    {primaryText}
                </Text>
            </View>
            <View style={styles.marker}>
                <View
                    style={[styles.markerContainer, disabled ? styles.disabledMarker : styles.enabledMarker]}>
                    {
                        !disabled && <View style={styles.circle}/>
                    }
                </View>
            </View>
        </TouchableOpacity>
    )
}
