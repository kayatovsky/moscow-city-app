import React from 'react'
import useScaleFactor from "../../../../Hooks/useScaleFactor";
import {View, StyleSheet, Text, TouchableOpacity} from "react-native";
import MenuItem from "src/Components/Common/MenuItem";
import NeomorphListItem from "../../../../Components/Common/NeomorphListItem";
import {setCurrentOrderData} from "../../../../Slices/mainScreen";
import {useDispatch, useSelector} from "react-redux";
import {getOrdersHelperData} from "../../../../Utils/helpers";
import {capitalizeFirstLetter} from "../../../../Utils/misc";

export default function ({date, price, title, isLastElement=false, onPress, data, additionalPrice}) {

    const {verticalScale, horizontalScale} = useScaleFactor();
    const dispatch = useDispatch();
    const {services} = useSelector(state => state.mainScreen)
    const [serviceName] = getOrdersHelperData(data.partner_id, services)
    const styles = StyleSheet.create({
        header: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 18 * verticalScale
        },
        textUnderlined: {
            textDecorationLine: 'underline'
        },
        br: {
            opacity: 0.1,
            backgroundColor: '#000',
            height: 1,
            width: '100%',
        },
        text: {
            fontSize: 17 * horizontalScale,
            lineHeight: 22 * verticalScale,
        },
        textHelp: {
            alignSelf: "center",
        },
    })

    return (
        <View style={{paddingBottom: 40 * verticalScale}}>
            <View style={styles.header}>
                <Text style={styles.text}>
                    {date}
                </Text>
                <Text style={styles.text}>
                    {price} ₽
                </Text>
            </View>
            <NeomorphListItem
                title={capitalizeFirstLetter(serviceName + ` №${data.id}`)}
                style={{marginBottom: 18 * verticalScale}}
                onPress={async () => {
                    await dispatch(setCurrentOrderData({
                        data,
                        price,
                        title,
                        date,
                    }));
                    if (data.sub_orders.length > 3)
                        onPress('info');
                    else
                        onPress('infoShort')
                }}
            />
            <View style={[styles.textHelp, {marginBottom: 40 * verticalScale}]}>
                <TouchableOpacity onPress={() => onPress('help')}>
                    <Text style={[styles.textUnderlined, styles.text]}>
                        Помощь
                    </Text>
                </TouchableOpacity>
            </View>
            {!isLastElement && <View
                style={styles.br}
            />}
        </View>
    )
}
