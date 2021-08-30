import * as React from "react"
import Svg, {Path} from "react-native-svg"
import {MAIN_BLUE_COLOR, MAIN_SCREEN_ICON_COLOR} from "../../../Theme/theme";
import {StyleSheet, TouchableOpacity, View} from 'react-native'
import {FILTER_DROP_SHADOW_BOTTOM_BAR} from "../../../Theme/shadows";
import useScaleFactor from "../../../Hooks/useScaleFactor";

export default function (props) {
    const {verticalScale, horizontalScale} = useScaleFactor();
    const color = props.active ? MAIN_BLUE_COLOR : MAIN_SCREEN_ICON_COLOR;
    let style = {};
    /*if (props.active)
        style = FILTER_DROP_SHADOW_BOTTOM_BAR*/
    const colored = {padding: 4}
    return (
        <TouchableOpacity style={[style, colored]} {...props}>
            <Svg
                width={25 * horizontalScale}
                height={25 * verticalScale}
                viewBox="0 0 25 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <Path
                    d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2M12 11a4 4 0 100-8 4 4 0 000 8z"
                    stroke={color}
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </Svg>
        </TouchableOpacity>
    )
}
