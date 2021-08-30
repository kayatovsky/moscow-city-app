import React from "react";
import {View, Text, StyleSheet} from "react-native";
import useScaleFactor from "src/Hooks/useScaleFactor";
import DraggableIndicator from "src/Components/Common/DraggableIndicator";
import TextInput from "src/Components/Common/TextInput";
import {useSelector} from "react-redux";
import {DrawerGrid} from "src/Components/Layout/DrawerPadding";
import {parseTime, parseWorkdays} from "../../../Utils/date_utils";

export default function ({}) {
    const {verticalScale} = useScaleFactor();
    const {start_workday, end_workday, workdays} = useSelector(state => state.payment.currentPartner);
    const [start_time, end_time] = parseTime(start_workday, end_workday);
    const styles = StyleSheet.create({
        card: {
            height: 366 * verticalScale,
            borderTopStartRadius: 20,
            borderTopEndRadius: 20,
            backgroundColor: '#fff',
            width: '100%'
        }
    })

    return (
        <View style={styles.card}>
            <DrawerGrid>
                <View style={{paddingTop: 57 * verticalScale}}>
                    <TextInput
                        withContainer={false}
                        title='График работы'
                        defaultValue={`${start_time}-${end_time}`}
                        disabled
                    />
                </View>
                <View style={{paddingTop: 21 * verticalScale}}>
                    <TextInput
                        withContainer={false}
                        title='Выходные'
                        defaultValue={parseWorkdays(workdays)}
                        disabled
                    />
                </View>
                <View style={{paddingTop: 21 * verticalScale}}>
                    <TextInput
                        withContainer={false}
                        title='Зона обслуживания'
                        defaultValue='ММДЦ Москва-Сити'
                        disabled
                    />
                </View>
            </DrawerGrid>
        </View>
    )
}
