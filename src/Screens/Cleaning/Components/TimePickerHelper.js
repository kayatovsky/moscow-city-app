import React from 'react'
import useScaleFactor from "src/Hooks/useScaleFactor";
import {View, Text, StyleSheet, TouchableOpacity} from "react-native";
import {useSelector} from "react-redux";
import {days} from "src/Utils/date_utils";

// todo: refactor error flags system
export default function ({title, navigation, isPriceError}) {
    const {verticalScale, horizontalScale} = useScaleFactor();
    const {chosenTime, chosenDay, currentDay, isTimePickError, isASAP} = useSelector(state => state.payment);

    const {errorCode, flag} = isTimePickError;

    const styles = StyleSheet.create({
        titleText: {
            fontSize: 22 * horizontalScale,
            lineHeight: 28 * verticalScale,
            fontFamily: 'regular'
        },
        container: {
            borderRadius: 20,
            borderWidth: 2,
            // todo: fix this
            borderColor: (flag && errorCode !== 500) ? "#FF1717" :'#000',
            height: 70 * verticalScale,
            marginTop: 24 * verticalScale,
            justifyContent: 'center',
            flexDirection: 'row',
            alignItems: 'center'
        },
        text: {
            fontSize: 17 * horizontalScale,
            fontFamily: 'regular',
            // todo: fix this
            color: (flag && errorCode !== 500) ? "#FF1717" :'#000'
        },
    })
    const handlePress = () => {
        navigation.navigate('OrderTime')
    }
    // todo: fix ifs conditions
    const getText = () => {
        // todo: fix this ASAP
        if (isASAP)
            return "Как можно скорее"
        if (flag && !chosenTime)
            return "Укажите время"
        if (flag && chosenTime && errorCode === 400 && !isPriceError)
            return "Укажите другое время"
        if (flag && chosenTime && errorCode === 500)
            return "Выбрать время"
        if (!flag && !chosenTime)
            return "Выбрать время"
        if (chosenDay === 0) {
            if (chosenTime === 23)
                return `Сегодня, ${chosenTime}:00-0:00`
            return `Сегодня, ${chosenTime}:00-${chosenTime + 1}:00`
        }
        else {
            if (chosenTime === 23)
                return `${days[(chosenDay + currentDay) % 7]}, ${chosenTime}:00-0:00`
            return `${days[(chosenDay + currentDay) % 7]}, ${chosenTime}:00-${chosenTime + 1}:00`
        }
    }

    return (
        <View>
            <Text style={styles.titleText}>{title}</Text>
            <TouchableOpacity onPress={handlePress}>
                <View style={styles.container}>
                    <Text style={styles.text}>{getText()}</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}
