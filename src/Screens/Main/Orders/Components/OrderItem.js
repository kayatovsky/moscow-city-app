import React from 'react'
import useScaleFactor from "src/Hooks/useScaleFactor";
import {View, StyleSheet, Text, TouchableOpacity, Linking} from "react-native";
import NeomorphListItem from "src/Components/Common/NeomorphListItem";
import {useDispatch, useSelector} from "react-redux";
import {setCurrentOrderData} from "src/Slices/mainScreen";
import {getOrdersHelperData} from "src/Utils/helpers";
import {capitalizeFirstLetter} from "src/Utils/misc";

export default function ({
                             date, price, isLastElement, data, onPress = () => {
    }, additionalPrice
                         }) {

    const dispatch = useDispatch();
    const {verticalScale, horizontalScale} = useScaleFactor();
    const {cancel_time, phone, time_start} = data;
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
            opacity: 0.3,
            backgroundColor: '#000',
            height: 1,
            width: '100%'
        },
        text: {
            fontSize: 17 * horizontalScale,
            lineHeight: 22 * verticalScale,
        }
    })

    return (
        <View style={{marginTop: 40 * verticalScale}}>
            <View style={styles.header}>
                <Text style={styles.text}>
                    {date}
                </Text>
                <Text style={styles.text}>
                    {price} ₽
                </Text>
            </View>
            <NeomorphListItem
                onPress={async () => {
                    await dispatch(setCurrentOrderData({
                        data,
                        price,
                        date,
                    }));
                    if (data.sub_orders.length > 3)
                        onPress('info');
                    else
                        onPress('infoShort')
                }}
                title={capitalizeFirstLetter(serviceName + ` №${data.id}`)}
            />
            <View style={[styles.header, {marginBottom: 40 * verticalScale}]}>
                <TouchableOpacity onPress={() => Linking.openURL(`tel:+79773990747`)}>
                    <Text style={[styles.textUnderlined, styles.text]}>
                        Звонок
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => onPress('help')}>
                    <Text style={[styles.textUnderlined, styles.text]}>
                        Помощь
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {
                    dispatch(setCurrentOrderData(data));
                    const date = new Date(time_start);
                    // todo: check this place later
                    onPress('cancelWithRefund')
                    /*if ((date - Date.now()) / 1000 < cancel_time)
                        onPress('cancelWithoutRefund')
                    else
                        onPress('cancelWithRefund')*/
                }}>
                    <Text style={[styles.textUnderlined, styles.text]}>
                        Отмена
                    </Text>
                </TouchableOpacity>
            </View>
            {!isLastElement && <View
                style={styles.br}
            />}
        </View>
    )
}
