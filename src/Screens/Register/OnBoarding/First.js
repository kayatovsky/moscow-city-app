import React from 'react'
import {AuthTemplate} from "../Components/Container";
import {Text, View} from "react-native";
import First from "../../../Assets/People/First";
import useScaleFactor from "../../../Hooks/useScaleFactor";

export default function ({navigation}) {
    const {horizontalScale, verticalScale} = useScaleFactor()
    return (
        <AuthTemplate
            title='Качественное оказание услуг'
            buttonText='Далее'
            isAbleToMoveBack={false}
            buttonAction={() => navigation.navigate('BOARDING-SECOND')}
            navigation={navigation}
            isButtonDisabled={false}
            withMargin={false}
            iconComponent={<First style={{position: 'relative', bottom: 109 * verticalScale}}/>}
        >
            <View style={{height: 208 * verticalScale}}>
                <Text style={{fontSize: 17 * horizontalScale}}>
                    Мы отобрали лучших мастеров своего дела в вашем районе специально для вас.
                </Text>
            </View>
        </AuthTemplate>
    )
}
