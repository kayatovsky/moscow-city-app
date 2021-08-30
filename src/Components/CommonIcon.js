import * as React from "react"
import Svg, { Path } from "react-native-svg"
import useScaleFactor from "src/Hooks/useScaleFactor";
import {Fragment} from "react";

export default function CommonIcon({d, viewBox, props}) {

    const {verticalScale, horizontalScale} = useScaleFactor();

    if (!d || !viewBox)
        return <Fragment/>

    return (
        <Svg
            xmlns="http://www.w3.org/2000/svg"
            width={100 * horizontalScale}
            height={100 * verticalScale}
            viewBox={viewBox}
            fill='#000'
            {...props}
        >
            <Path d={d}/>
        </Svg>
    )
}
