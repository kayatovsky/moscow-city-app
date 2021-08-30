import useScaleFactor from "../../../../Hooks/useScaleFactor";
import {StyleSheet, Text, View} from "react-native";
import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {setActiveScreenIndex} from "../../../../Slices/mainScreen";


export default function NoOrdersView({navigation, withDispatch}) {
    const dispatch = useDispatch();
    const {verticalScale, horizontalScale} = useScaleFactor();

    const styles = StyleSheet.create({
        container: {
            height: '95%',
            justifyContent: 'center',
        },
        content: {
            width: "100%",
            alignItems: "center",
        },
        title: {
            fontFamily: "medium",
            fontWeight: "500",
            fontSize: 28 * horizontalScale,
        },
        textContainer: {
            alignItems: "center",
            paddingTop: 14 * verticalScale
        },
        text: {
            fontFamily: "regular",
            color: "#898989",
            fontSize: 17 * horizontalScale,
            lineHeight: 20.5 * verticalScale
        },
        focused: {
            textDecorationLine: "underline"
        }
    })

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <View>
                    <Text style={styles.title}>У вас нет заказов</Text>
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.text}>Чтобы оформить заказ вернитесь</Text>
                    <Text style={{...styles.text, ...styles.focused}}
                          onPress={() => {
                              navigation.navigate('App');
                              if (withDispatch)
                                  dispatch(setActiveScreenIndex(1))
                          }}>
                        обратно
                    </Text>
                </View>
            </View>
        </View>
    )
}
