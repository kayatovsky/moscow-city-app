import React from 'react'
import {View, StyleSheet, Text} from "react-native";
import useScaleFactor from "src/Hooks/useScaleFactor";
import Carousel from 'react-native-snap-carousel';
import {useSelector} from "react-redux";

export default function () {
    const {verticalScale, horizontalScale} = useScaleFactor();
    const {what_includes_info} = useSelector(state => state.payment.currentService)

    const styles = StyleSheet.create({
        text: {
            width: '71%',
            marginTop: 22 * verticalScale,
            fontFamily: "regular",
            fontSize: 17 * horizontalScale,
        },
        heading: {
            fontFamily: "medium",
            textDecorationLine: 'underline',
            fontSize: 21 * horizontalScale,
        },
    })

    function List({item: object}) {
        console.log("OBJECT: ", object)
        return (
            <View>
                <Text style={styles.heading}>
                    {object[0]}
                </Text>
                {object[1].map((item, index) =>
                    <View key={index}>
                        <Text style={styles.text}>
                            {item}
                        </Text>
                    </View>
                )}
            </View>
        )
    }

    return (
        <Carousel
            data={what_includes_info && Object.entries(what_includes_info)}
            containerCustomStyle={{paddingLeft: '14.5%'}}
            renderItem={({item}) => <List item={item}/>}
            sliderWidth={414 * horizontalScale}
            itemWidth={414 * horizontalScale}
            removeClippedSubviews={false}
        />
    )
}
