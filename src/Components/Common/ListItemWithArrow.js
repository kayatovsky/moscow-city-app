import React from "react";
import {View, Text, StyleSheet, TouchableOpacity} from "react-native";
import useScaleFactor from "src/Hooks/useScaleFactor";
import {Icon} from "react-native-elements";

export default function ({title, onPress}) {

    const {verticalScale, horizontalScale} = useScaleFactor();
    const styles = StyleSheet.create({
        container: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            borderBottomWidth: 1,
            borderBottomColor: 'rgba(0, 0,  0, 0.3)',
            height: 45 * verticalScale,
            marginBottom: 25 * verticalScale
        },
        text: {
            fontSize: 17 * horizontalScale,
            fontFamily: 'regular'
        }
    })

    return (
        <TouchableOpacity onPress={onPress} style={styles.container}>
            <View>
                <Text style={styles.text}>
                    {title}
                </Text>
            </View>
            <View>
                <Icon name='keyboard-arrow-right'/>
            </View>
        </TouchableOpacity>
    )
}
