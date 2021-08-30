import React from 'react'
import {View, StyleSheet, ScrollView} from "react-native";
import useScaleFactor from "src/Hooks/useScaleFactor";
import {cleaningGeneral, cleaningRepair, cleaningSupport} from "src/Screens/Cleaning/Mocks/Cleaning";
import SwipeHint from "src/Components/Common/SwipeHint";
import Carousel from "../Components/Carousel";
import Template from '../Components/Template'
import {useSelector} from "react-redux";

export default function ({navigation}) {
    const {verticalScale} = useScaleFactor();
    const {name_of_svc} = useSelector(state => state.payment.currentService);



    const dataMapper = {
        cleaning_general: cleaningGeneral,
        cleaning_after_repair: cleaningRepair,
        cleaning_support: cleaningSupport
    }

    const styles = StyleSheet.create({
        container: {
            marginTop: 30 * verticalScale,
            height: '83%',
        },
        swipeHint: {
            position: "absolute",
            bottom: 40 * verticalScale,
            alignSelf: "center",
        }
    })



    return (
        <View>
            <Template
                primaryText='Что входит?'
                withInformationIcon={false}
                navigation={navigation}
                isBodyFullWidth={true}
            >
                <ScrollView style={styles.container}>
                    <Carousel/>
                </ScrollView>
            </Template>
            <View style={styles.swipeHint}>
                <SwipeHint/>
            </View>
        </View>
    )
}
