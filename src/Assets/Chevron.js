import * as React from "react"
import Svg, {Path} from "react-native-svg"
import useScaleFactor from "src/Hooks/useScaleFactor";
import {FILTER_DROP_SHADOW_BOTTOM_BAR} from "src/Theme/shadows";
import {TouchableOpacity} from "react-native";

export default function (props) {
    const {verticalScale, horizontalScale} = useScaleFactor();
    let style = {};
    if (props.active)
        style = FILTER_DROP_SHADOW_BOTTOM_BAR
    const colored = {padding: 4}

    return (
        <TouchableOpacity style={[style, colored]} {...props}>
            <Svg
                width={14}
                height={14}
                viewBox="0 0 14 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                {...props}
            >
                <Path
                    d="M1 13l6-6-6-6"
                    stroke="#000"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </Svg>
        </TouchableOpacity>
    )
}
