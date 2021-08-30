import React from 'react';
import {Text, View, StyleSheet, TouchableWithoutFeedback, Image} from 'react-native';
import {NeomorphBox} from 'react-native-neomorph-shadows'
import useScaleFactor from "src/Hooks/useScaleFactor";
import {setCurrentService} from "src/Slices/mainScreen";
import {useDispatch} from "react-redux";
import {setCurrentPageTitle, setCurrentPartner} from "src/Slices/payment";
import {capitalizeFirstLetter} from "../../../../Utils/misc";

export const Card = ({data, isLast, isFirst, navigation}) => {
    const {verticalScale, horizontalScale} = useScaleFactor();
    const dispatch = useDispatch();
    const {name_ru, name, partner_title_ru} = data;

    const words = partner_title_ru.split(" ");
    const amount = words.length;



    const styles = StyleSheet.create({
        card: {
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "flex-start",
            paddingBottom: 23 * verticalScale,
            paddingLeft: 33 * horizontalScale,
        },
        text: {
            fontFamily: "regular",
            fontSize: 22 * horizontalScale,
            color: "#000",
            opacity: 0.9,
            lineHeight: 25 * verticalScale
        },
        wrapper: {
            height: 100 * verticalScale,
            width: 100 * horizontalScale,
            marginBottom: 34 * verticalScale,
            alignItems: "center",
            justifyContent: 'center',
            position: 'relative',
        }
    })

    return (
        <NeomorphBox
            darkShadowColor="#e1e1e8"
            lightShadowColor="#fff"
            style={{
                shadowOpacity: 1,
                shadowRadius: 8,
                borderRadius: 23,
                backgroundColor: "#F0F0F3",
                width: 220 * horizontalScale,
                height: 270 * verticalScale,
                marginLeft: isFirst ? 56 * horizontalScale : 0,
                marginRight: isLast ? 56 * horizontalScale : 32 * horizontalScale,
                marginVertical: 30 * verticalScale
            }}
        >
            <TouchableWithoutFeedback
                onPress={() => {
                    dispatch(setCurrentService(name));
                    dispatch(setCurrentPartner(data));
                    dispatch(setCurrentPageTitle(name_ru))
                    navigation.navigate('Cleaning');
                }}
            >
                <View style={styles.card}>
                    <View style={styles.wrapper}>
                        <Image
                            style={{width: 100 * verticalScale, height: 100 * verticalScale}}
                            source={{
                                uri: data.img_url || null
                            }}/>
                    </View>
                    {amount >= 2 ?
                        (<View>
                            <Text style={styles.text}>{words && words[0]}</Text>
                            <Text style={styles.text}>{words && words.slice(1).join(" ")}</Text>
                        </View>)
                        :
                        <Text style={styles.text}>{capitalizeFirstLetter(words && words[0])}</Text>
                    }
                </View>
            </TouchableWithoutFeedback>
        </NeomorphBox>
    )
}



