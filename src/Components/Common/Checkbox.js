import React, {useState} from 'react'
import {View, Text, StyleSheet, TouchableOpacity} from "react-native";
import useScaleFactor from "src/Hooks/useScaleFactor";
import {Icon} from "react-native-elements";
import {MAIN_BLUE_COLOR} from "src/Theme/theme";


export default function ({checked, isLast, onChange=() => {}, primaryText, secondaryText, withBorder=false, ...rest}) {

    const {horizontalScale, verticalScale} = useScaleFactor();

    const styles = StyleSheet.create({
        container: {
            flexDirection: 'row',
            justifyContent: 'space-between',
        },
        marker: {
            marginRight: 14 * horizontalScale,
            justifyContent: 'center',
            width: 22 * horizontalScale
        },
        textContainer: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingLeft: 2 * horizontalScale
        },
        text: {
            fontSize: 17 * horizontalScale,
            fontFamily: 'regular'
        },
        withBorder: {
            borderBottomWidth:  1,
            borderBottomColor: 'rgba(0, 0, 0, .4)',
        },
        withMargin: {
            marginBottom: 17 * verticalScale
        }
    })

    return (
        <TouchableOpacity onPress={() => onChange(!checked)} style={[styles.container, !isLast && styles.withMargin]} {...rest}>
            <View style={{flexDirection: 'row'}}>
                <View style={styles.marker}>
                    <View>
                        <Icon
                            name={checked ? 'check-box' : 'check-box-outline-blank'}
                            size={20 * horizontalScale}
                            color={checked ? MAIN_BLUE_COLOR : '#BDBDBD'}
                        />
                    </View>
                </View>
                <Text style={styles.text}>
                    {primaryText}
                </Text>
            </View>
            <View style={[styles.textContainer, withBorder && styles.withBorder]}>
                <Text style={styles.text}>
                    {secondaryText}
                </Text>
            </View>
        </TouchableOpacity>
    )
}
