import React from 'react'
import {AuthTemplate} from "../Components/Container";
import {Text} from "react-native";
import First from "../../../Assets/People/First";
import Second from "../../../Assets/People/Second";
import useScaleFactor from "../../../Hooks/useScaleFactor";

export default function ({navigation}) {

    const {horizontalScale, verticalScale} = useScaleFactor()
    return (
        <AuthTemplate
            title='Больше не надо никому звонить'
            buttonText='Далее'
            isAbleToMoveBack={true}
            buttonAction={() => navigation.navigate('BOARDING-THIRD')}
            navigation={navigation}
            isButtonDisabled={false}
            withMargin={false}
            iconComponent={<Second style={{position: 'relative', bottom: 109 * verticalScale}}/>}
        >
            <Text style={{fontSize: 17 * horizontalScale}}>
                Любую необходимую услугу на дом можно оформить внутри нашего мобильного приложения.
            </Text>
            {/*<Second/>*/}
        </AuthTemplate>
    )
}
