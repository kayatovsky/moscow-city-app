import React from "react"
import ShoppingCart from "src/Assets/Icons/Navigation/ShoppingCart";
import {TouchableOpacity, TouchableWithoutFeedback, View, Text, StyleSheet} from "react-native";
import useScaleFactor from "src/Hooks/useScaleFactor";
import {MAIN_BLUE_COLOR} from "src/Theme/theme";
import {useSelector} from "react-redux";
import {calcTotalPriceHelper} from "src/Utils/helpers";

export const getItemsAmount = data => {
    if (!data)
        return 0
    return Object.values(data).reduce((acc, curr) => {
        return acc += curr
    }, 0)
}


export default function ({onPress}) {
    const {verticalScale, horizontalScale} = useScaleFactor();
    const {cartChosenItems, currentPartnerCartItems, currentPartner} = useSelector(state => state.payment);
    const {id, minimal_price} = currentPartner
    const Wrapper = disabled ? TouchableWithoutFeedback : TouchableOpacity
    const disabled = currentPartner.partner_render_type !== "with_images"

    const styles = StyleSheet.create({
        badge: {
            position: 'relative',
            bottom: 27 * verticalScale,
            left: 25 * horizontalScale,
            width: 6 * verticalScale,
            height: 6 * verticalScale,
            borderRadius: 6 * verticalScale / 2,
            backgroundColor: MAIN_BLUE_COLOR,
            alignItems: 'center',
            justifyContent: 'center'
        },
        text: {
            color: '#fff',
            fontSize: 9 * horizontalScale
        }
    });

    const totalPrice = calcTotalPriceHelper(currentPartnerCartItems, cartChosenItems[id]);
    const amount = getItemsAmount(cartChosenItems[id]);


    return (
        <Wrapper
            onPress={() => {
                if (!disabled)
                    onPress();
            }}
        >
            <View>
                <ShoppingCart disabled={disabled || !(totalPrice && totalPrice !== "0" && Number(totalPrice) > minimal_price)}/>
                {(amount > 0 && !disabled) && <View style={styles.badge}/>}
            </View>
        </Wrapper>
    )
}
