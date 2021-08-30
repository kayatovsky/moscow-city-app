import * as React from "react"
import Svg, {Path} from "react-native-svg"
import {TouchableWithoutFeedback} from "react-native";
import useScaleFactor from "src/Hooks/useScaleFactor";

export default function ({onPress, disabled = false, ...rest}) {
    const {verticalScale, horizontalScale} = useScaleFactor();

    return (
        <TouchableWithoutFeedback style={{padding: 0}} onPress={onPress}>
            <Svg
                width={25 * horizontalScale}
                height={25 * verticalScale}
                viewBox={`0 0 ${25 * verticalScale} ${25 * horizontalScale}`}
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                {...rest}
            >
                <Path
                    d="M9 22a1 1 0 100-2 1 1 0 000 2zM20 22a1 1 0 100-2 1 1 0 000 2zM1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6"
                    stroke={disabled ? '#898989' : '#000'}
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </Svg>
        </TouchableWithoutFeedback>
    )
}
