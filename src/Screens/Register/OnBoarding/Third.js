import React from 'react'
import {AuthTemplate} from "../Components/Container";
import {Text} from "react-native";
import First from "../../../Assets/People/First";
import Third from "../../../Assets/People/Third";
import useScaleFactor from "../../../Hooks/useScaleFactor";
import Second from "../../../Assets/People/Second";

export default function ({navigation}) {

    const {horizontalScale, verticalScale} = useScaleFactor()
    return (
        <AuthTemplate
            title='Оплата услуг в два клика'
            buttonText='Далее'
            isAbleToMoveBack={true}
            buttonAction={() => navigation.navigate('BOARDING-FOURTH')}
            navigation={navigation}
            isButtonDisabled={false}
            withMargin={false}
            iconComponent={<Third style={{position: 'relative', bottom: 109 * verticalScale}}/>}
        >
            <Text style={{fontSize: 17 * horizontalScale}}>
                Вы сможете оплачивать услуги сервиса внутри мобильного приложения через Apple Pay и Google
                Pay. </Text>
            {/*<Third/>*/}
        </AuthTemplate>
    )
}
