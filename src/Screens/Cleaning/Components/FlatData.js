import React, {Fragment} from 'react'
import {View, Text, StyleSheet, TextInput} from "react-native";
import useScaleFactor from "src/Hooks/useScaleFactor";
import {useDispatch, useSelector} from "react-redux";
import {setErrorFields, setFlatFieldValue} from "src/Slices/payment";


export default function ({displayArea = false}) {
    const {verticalScale, horizontalScale} = useScaleFactor();
    const dispatch = useDispatch();
    const state = useSelector(state => state.payment);
    const errors = state.errorFields

    const data = [
        {
            title: "Квартира",
            fieldName: 'flatNumber',
            editable: true,
        },
        {
            title: "Этаж",
            fieldName: 'flatFloor',
            editable: true,
        },
        {
            title: "Квадратура",
            fieldName: 'propertyArea',
            editable: false,
        },
    ];


    if (!displayArea)
        data.pop()

    const styles = StyleSheet.create({
        card: {
            width: displayArea ? 91 * horizontalScale : 120 * horizontalScale,
            height: "100%",
            borderBottomWidth: 1,
            alignItems: 'center',
        },
        cardTitleText: {
            fontSize: 15 * horizontalScale,
            color: '#000',
            opacity: 0.4,
        },
        cardInput: {
            fontSize: 17 * horizontalScale,
            lineHeight: 21 * verticalScale,
            width: '100%',
            textAlign: 'left',
            paddingTop: 7 * verticalScale,
            paddingBottom: 4 * verticalScale,

        },
        container: {
            flexDirection: "row",
            width: "100%",
            height: 55 * verticalScale,
            marginTop: 21 * verticalScale,
            justifyContent: 'space-between'
        },
        titleWrapper: {
            width: '100%',
            alignItems: 'flex-start'
        }
    })
    return (
        <Fragment>
            <View style={styles.container}>
                {data.map((item, index) =>
                    <View style={[styles.card,
                        {
                            marginRight: (index !== data.length - 1) ? 12 * horizontalScale : 0,
                            borderColor: errors[item.fieldName] ? '#FF1717' : '#000' // paint border if there is an error
                        }]}
                          key={index}>
                        <View style={styles.titleWrapper}>
                            <Text style={styles.cardTitleText}>{item.title}</Text>
                        </View>
                        <TextInput
                            value={String(state[item.fieldName])}
                            onChangeText={text => {
                                if (text) {
                                    if (text[0] === "0" || text === "") {
                                        dispatch(setErrorFields(item.fieldName, "Invalid input"))
                                    } else if (!(text[text.length - 1] >= '0' && text[text.length - 1] <= '9') && text.length > 0) {
                                        dispatch(setErrorFields(item.fieldName, "Invalid input"))
                                    } else {
                                        dispatch(setFlatFieldValue(item.fieldName, text));
                                        dispatch(setErrorFields(item.fieldName, ""))
                                    }
                                }
                                else
                                    dispatch(setFlatFieldValue(item.fieldName, ''));

                            }}
                            style={[styles.cardInput]}
                            editable={item.editable}
                        />
                    </View>
                )}
            </View>
        </Fragment>
    )
}
