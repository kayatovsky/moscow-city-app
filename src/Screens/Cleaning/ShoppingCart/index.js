import React, {Fragment, useState} from 'react'
import {View, Text, StyleSheet, ScrollView} from "react-native";
import useScaleFactor from "src/Hooks/useScaleFactor";
import Chevron from "src/Assets/Chevron";
import Back from "src/Assets/Icons/Navigation/Back";
import Delete from "src/Assets/Icons/Navbar/Delete";
import TemplateAnimated from "../Components/TemplateAnimated";
import {useDispatch, useSelector} from "react-redux";
import {handleCounterChange} from "src/Slices/payment";
import Button from "src/Components/Common/Button";
import NoOrdersView from "../../Main/Orders/Components/NoOrdersView";
import {calcTotalPriceHelper} from "src/Utils/helpers";

const ProductItem = ({price, amount, name, item}) => {
    const {verticalScale, horizontalScale} = useScaleFactor();


    const styles = StyleSheet.create({
        amountContainer: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center'
        },
        header: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'flex-start'
        },
        amountText: {
            fontSize: 17 * horizontalScale,
            lineHeight: 22 * verticalScale,
            fontFamily: 'regular'
        },
        priceContainer: {
            flexDirection: 'row',
            justifyContent: 'flex-end',
            paddingTop: 24 * verticalScale
        },
        breakline: {
            width: '100%',
            height: 1,
            marginTop: 10 * verticalScale,
            marginBottom: 18 * verticalScale,
            backgroundColor: '#000'
        },
        footer: {
            flexDirection: 'row',
            justifyContent: 'flex-end'
        },
        container: {
            marginTop: 42 * verticalScale
        },
        priceText: {
            fontSize: 17 * horizontalScale,
            lineHeight: 22 * verticalScale,
            fontFamily: 'medium',
            fontWeight: '500'
        }
    })

    const dispatch = useDispatch()

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={{maxWidth: '70%'}}>
                    <Text style={styles.amountText}>{name}</Text>
                </View>
                <View style={styles.amountContainer}>
                    <Back onPress={() => dispatch(handleCounterChange(item, amount - 1, 'decremnent'))}
                          style={{marginRight: 12 * horizontalScale}} withPadding={false}/>
                    <Text style={styles.priceText}>{amount}</Text>
                    <Chevron onPress={() => dispatch(handleCounterChange(item, amount + 1, 'increment'))}
                             style={{marginLeft: 10 * horizontalScale}}/>
                </View>
            </View>
            <View style={styles.priceContainer}>
                <Text style={styles.priceText}>{price}₽</Text>
            </View>
            <View style={styles.breakline}/>
            <View style={styles.footer}>
                <Delete onPress={() => {
                    dispatch(handleCounterChange(item, 0, 'increment'));
                }}/>
            </View>
        </View>
    )
}

const getRenderCondition = data => {
    let flag = false;
    Object.entries(data).map(([key, value]) => {
        if (value > 0)
            flag = true;
    })
    return flag;
}

export default function ({navigation}) {
    const {cartChosenItems, currentPartnerCartItems, isCreatingOrder, currentPartner} = useSelector(state => state.payment);
    const {id, minimal_price} = currentPartner
    const {verticalScale} = useScaleFactor()
    const [error, setError] = useState(false);

    const totalPrice = calcTotalPriceHelper(currentPartnerCartItems, cartChosenItems[id])

    if (Number(totalPrice >= minimal_price) && error)
        setError(false);

    return (
        <TemplateAnimated
            withScrollView={false}
            withInformationIcon={false}
            navigation={navigation}
            primaryText='Корзина'
            scrollDisabled={true}
        >
            {getRenderCondition(cartChosenItems[id]) ?
                <Fragment>
                    <ScrollView
                        style={{height: 525 * verticalScale}}
                        showsVerticalScrollIndicator={false}
                    >
                        {Object.entries(cartChosenItems[id]).map(([key, value]) =>
                            (value > 0 &&
                                <ProductItem
                                    key={key}
                                    name={currentPartnerCartItems.find(item => String(item.id) === key).name_of_svc_ru}
                                    amount={value}
                                    item={currentPartnerCartItems.find(item => String(item.id) === key)}
                                    price={(currentPartnerCartItems.find(item => String(item.id) === key).price * value).toFixed()}
                                />)
                        )}

                    </ScrollView>
                    <Button
                        style={{marginTop: 25 * verticalScale}}
                        variant='outlined'
                        title={!error ? `${totalPrice}₽ | Оформить` : `Минимум ${minimal_price}₽ `}
                        disabled={Number(totalPrice) <= minimal_price}
                        isLoading={isCreatingOrder}
                        isError={error}
                        onPress={() => {
                            if (Number(totalPrice) >= minimal_price)
                                navigation.navigate('Payment')
                            else
                                setError(true);
                        }}
                    />
                </Fragment> :
                <View style={{position: 'relative', bottom: 100 * verticalScale}}><NoOrdersView
                    navigation={navigation}/></View>}
        </TemplateAnimated>
    )
}
