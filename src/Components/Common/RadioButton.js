import React, {Fragment} from 'react'
import {View, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, Pressable} from "react-native";
import useScaleFactor from "src/Hooks/useScaleFactor";
import {MAIN_BLUE_COLOR} from "src/Theme/theme";


export default function ({
                             withBorder = false, disabled = true, value, primaryText, secondaryText, onChange = () => {
    }
                         }) {
    const {verticalScale, horizontalScale} = useScaleFactor();

    const styles = StyleSheet.create({
        container: {
            flexDirection: 'row',
        },
        marker: {
            marginRight: 16 * horizontalScale,
            justifyContent: 'center',
            width: 22 * horizontalScale,
        },
        textContainer: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingTop: 25 * verticalScale,
            paddingBottom: 25 * verticalScale,
            width: 229 * horizontalScale,
            paddingLeft: 2 * horizontalScale
        },
        text: {
            fontSize: 17 * horizontalScale,
            fontFamily: 'regular'
        },
        markerContainer: {
            width: 20 * verticalScale,
            height: 20 * verticalScale,
            borderRadius: 10 * verticalScale,
            borderWidth: 1,
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: 3
        },
        circle: {
            width: 9 * verticalScale,
            height: 9 * verticalScale,
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
            borderBottomColor: 'rgba(0, 0, 0, .4)',
        }
    })

    return (
        <TouchableOpacity  onPress={() => onChange(value)} style={styles.container}>
            <View style={styles.marker}>
                <View>
                    <View
                        style={[styles.markerContainer, disabled ? styles.disabledMarker : styles.enabledMarker]}>
                        {
                            !disabled && <View style={styles.circle}/>
                        }
                    </View>
                </View>
            </View>
            <View style={[styles.textContainer, withBorder && styles.withBorder]}>
                <Text style={styles.text}>
                    {primaryText}
                </Text>
                <Text style={styles.text}>
                    {secondaryText}
                </Text>
            </View>
        </TouchableOpacity>
    )
}
