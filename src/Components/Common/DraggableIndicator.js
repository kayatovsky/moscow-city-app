import {View} from "react-native";
import React from "react";
import useScaleFactor from "src/Hooks/useScaleFactor";

export default function () {
    const {verticalScale, horizontalScale} = useScaleFactor();
    return (
        <View style={{paddingTop: 16 * verticalScale, alignItems: "center"}}>
            <View style={{
                height: 0,
                width: 84 * horizontalScale,
                borderTopWidth: 3 * horizontalScale,
                borderColor: '#ADADAF'
            }}/>
        </View>
    )
}
