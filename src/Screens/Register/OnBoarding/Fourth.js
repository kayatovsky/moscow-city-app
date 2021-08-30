import React from 'react'
import {AuthTemplate} from "../Components/Container";
import {Text} from "react-native";
import First from "../../../Assets/People/First";
import Fourth from "../../../Assets/People/Fourth";
import useScaleFactor from "../../../Hooks/useScaleFactor";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ({navigation}) {

    const {horizontalScale, verticalScale} = useScaleFactor()
    return (
        <AuthTemplate
            title='Приветствуем вас в So City'
            buttonText='Далее'
            isAbleToMoveBack={true}
            buttonAction={async () => {
                await AsyncStorage.setItem('IS_FIRST_LOGIN', 'false')
                navigation.navigate('RegisterMobile');
            }}
            navigation={navigation}
            isButtonDisabled={false}
            withMargin={false}
            iconComponent={<Fourth style={{position: 'relative', bottom: 109 * verticalScale}}/>}
        >
            <Text style={{fontSize: 17 * horizontalScale}}>
                Любую необходимую услугу на дом можно оформить внутри нашего мобильного приложения.
            </Text>
        </AuthTemplate>
    )
}
