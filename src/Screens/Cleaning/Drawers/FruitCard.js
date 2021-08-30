import React, {useState} from "react";
import {View, StyleSheet, Text, Image, TouchableOpacity} from "react-native";
import useScaleFactor from "src/Hooks/useScaleFactor";
import {DrawerGrid} from "src/Components/Layout/DrawerPadding";
import TextInput from "src/Components/Common/TextInput";
import Button from "src/Components/Common/Button";
import {MAIN_BLUE_COLOR} from "src/Theme/theme";
import Carousel from "react-native-snap-carousel";
import {Icon} from "react-native-elements";
import {formRadius} from "src/Utils/styles";
import {useDispatch, useSelector} from "react-redux";
import {handleCounterChange} from "src/Slices/payment";
import {calcTotalPriceHelper} from "src/Utils/helpers";
import {parseEstimatedCompletionTime} from "src/Utils/date_utils";
import SwipeHint from "../../../Components/Common/SwipeHint";


const RenderItem = ({item}) => {
    const {name_of_svc_ru, price, price_info, image_url, id} = item;

    const {net_weight} = price_info;
    const {cartChosenItems, currentPartner} = useSelector(state => state.payment);
    const amount = cartChosenItems[currentPartner.id] ? cartChosenItems[currentPartner.id][id] : 0

    const dispatch = useDispatch()
    const {verticalScale, horizontalScale} = useScaleFactor();

    const styles = StyleSheet.create({
        card: {
            height: 766 * verticalScale,
            borderTopStartRadius: 20,
            borderTopEndRadius: 20,
            backgroundColor: '#fff',
            width: '100%'
        },
        header: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: 48 * verticalScale
        },
        headerText: {
            fontSize: 22 * horizontalScale,
            lineHeight: 28 * verticalScale,
            fontFamily: 'bold'
        },
        descriptionText: {
            fontSize: 17 * horizontalScale,
            lineHeight: 24 * verticalScale,
            fontFamily: 'regular'
        },
        br: {
            height: 1,
            width: '100%',
            marginTop: 18 * verticalScale,
            marginBottom: 10 * verticalScale,
            backgroundColor: "#000",
        },
        timeDeliveryText: {
            fontSize: 17 * horizontalScale,
            lineHeight: 24 * verticalScale,
            fontFamily: 'regular',
            color: "#000",
            opacity: 0.5
        },
        pricingText: {
            fontSize: 24 * horizontalScale,
            lineHeight: 30 * verticalScale,
            color: MAIN_BLUE_COLOR,
            fontFamily: 'regular'
        },
        additionalText: {
            fontSize: 17 * horizontalScale,
            lineHeight: 22 * verticalScale,
            fontFamily: 'regular'
        },
        priceText: {
            fontSize: 17 * horizontalScale,
            lineHeight: 22 * verticalScale,
            fontFamily: 'medium'
        },
    })
    return (
        <View style={{
            borderWidth: 1,
            ...formRadius(20)
        }}>
            <View
                style={{
                    flexDirection: "row",
                    height: 216 * verticalScale,
                    ...formRadius(20),
                    overflow: 'hidden',
                }}
            >
                <Image
                    style={{width: 126.5 * verticalScale, height: 216 * verticalScale}}
                    source={{
                        uri: image_url
                    }}
                    defaultSource={require('src/Screens/Cleaning/Drawers/placeholder.png')}
                />
                <View style={{
                    flexDirection: "column",
                    justifyContent: "space-between",
                    marginLeft: 16 * horizontalScale,
                    ...formRadius(20),
                }}>
                    <View>
                        <Text style={[styles.additionalText, {marginTop: 15 * verticalScale}]}>
                            {name_of_svc_ru}
                        </Text>
                        {net_weight && <Text style={[styles.timeDeliveryText, {marginTop: 13 * verticalScale}]}>
                            {net_weight} г
                        </Text>}
                    </View>
                    <View style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: 6 * verticalScale,
                        width: 190 * horizontalScale
                    }}>
                        <Text style={[styles.priceText]}>
                            {price.toFixed()} ₽
                        </Text>
                        <View style={{flexDirection: "row", alignItems: "center"}}>
                            <TouchableOpacity style={{marginRight: 8 * horizontalScale}} onPress={() => {
                                dispatch(handleCounterChange(item, amount - 1, 'decrement'))
                            }}>
                                <Icon name='keyboard-arrow-left'/>
                            </TouchableOpacity>
                            <Text style={styles.priceText}>
                                {amount || 0}
                            </Text>
                            <TouchableOpacity style={{marginLeft: 8 * horizontalScale}} onPress={() => {
                                dispatch(handleCounterChange(item, amount + 1, 'increment'))
                            }}>
                                <Icon name='keyboard-arrow-right'/>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default function ({navigation}) {
    const {verticalScale, horizontalScale} = useScaleFactor();
    const {currentCartPartnerRenderData, cartPartnerHelperData, cartChosenItems, currentPartnerCartItems, currentPartner} = useSelector(state => state.payment);
    const {id, minimal_price} = currentPartner
    const renderData = cartPartnerHelperData[currentCartPartnerRenderData.title];
    const [isError, setError] = useState(false)
    const totalPrice = calcTotalPriceHelper(currentPartnerCartItems, cartChosenItems[id])
    const description = currentPartner?.svc_categories?.marks_description || {};

    const descriptionText = description[currentCartPartnerRenderData.title]

    const styles = StyleSheet.create({
        card: {
            height: 766 * verticalScale,
            borderTopStartRadius: 20,
            borderTopEndRadius: 20,
            backgroundColor: '#fff',
            width: '100%'
        },
        header: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: 48 * verticalScale
        },
        headerText: {
            fontSize: 22 * horizontalScale,
            lineHeight: 28 * verticalScale,
            fontFamily: 'bold'
        },
        descriptionText: {
            fontSize: 17 * horizontalScale,
            lineHeight: 24 * verticalScale,
            fontFamily: 'regular'
        },
        br: {
            height: 1,
            width: '100%',
            marginTop: 18 * verticalScale,
            marginBottom: 10 * verticalScale,
            backgroundColor: "#000",
        },
        timeDeliveryText: {
            fontSize: 17 * horizontalScale,
            lineHeight: 24 * verticalScale,
            fontFamily: 'regular',
            color: "#000",
            opacity: 0.5
        },
        pricingText: {
            fontSize: 24 * horizontalScale,
            lineHeight: 30 * verticalScale,
            color: MAIN_BLUE_COLOR,
            fontFamily: 'regular'
        },
        additionalText: {
            fontSize: 17 * horizontalScale,
            lineHeight: 22 * verticalScale,
            fontFamily: 'regular'
        },
        priceText: {
            fontSize: 17 * horizontalScale,
            lineHeight: 22 * verticalScale,
            fontFamily: 'medium'
        },
    })

    return (
        <View style={styles.card}>
            <DrawerGrid>
                <View style={styles.header}>
                    <Text style={styles.headerText}>{currentCartPartnerRenderData.title}</Text>
                </View>
                <View style={{marginTop: 18 * verticalScale}}>
                    <Text style={styles.descriptionText}>
                        {descriptionText}
                    </Text>
                </View>
                <View style={styles.br}/>
                <View style={{marginBottom: 26 * verticalScale}}>
                    <Text style={styles.timeDeliveryText}>
                        Время доставки - {parseEstimatedCompletionTime(currentPartner.work_unit_interval)}
                    </Text>
                </View>
                <TextInput
                    title='Минимальная стоимость заказа'
                    value={`${minimal_price} ₽`}
                    withContainer={false}
                    disabled
                    isTextError={isError}
                />
                <View style={{marginTop: 23 * verticalScale}}>
                    <Text style={styles.additionalText}>{currentCartPartnerRenderData.title}</Text>
                </View>
            </DrawerGrid>
            <View style={{marginTop: 23 * verticalScale}}>
                <Carousel
                    data={renderData || []}
                    renderItem={({item}) => <RenderItem item={item}/>}
                    sliderWidth={414 * horizontalScale}
                    itemWidth={350 * horizontalScale}
                    removeClippedSubviews={false}
                />
            </View>
            <DrawerGrid>
                <View>
                    <Button
                        title={`${totalPrice && totalPrice !== "0" ? totalPrice + '₽ | ' : ""}В корзину`}
                        variant='outlined'
                        style={{marginTop: 44 * verticalScale}}
                        onPress={() => {
                            if (totalPrice && totalPrice !== "0" && Number(totalPrice) >= minimal_price) {
                                setError(false);
                                navigation.navigate('ShoppingCart');
                            }
                            else
                                setError(true)
                        }}
                    />
                </View>
            </DrawerGrid>
        </View>
    )
}
