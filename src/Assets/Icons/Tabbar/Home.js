import * as React from "react"
import Svg, {Path} from "react-native-svg"
import {MAIN_BLUE_COLOR, MAIN_SCREEN_ICON_COLOR} from "../../../Theme/theme";
import {TouchableOpacity} from 'react-native'
import useScaleFactor from "../../../Hooks/useScaleFactor";
import {BOX_SHADOW_PURPLE_BUTTON, FILTER_DROP_SHADOW_BOTTOM_BAR} from "../../../Theme/shadows";

export default function (props) {
    const {verticalScale, horizontalScale} = useScaleFactor();
    const color = props.active ? MAIN_BLUE_COLOR : MAIN_SCREEN_ICON_COLOR
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
                style={BOX_SHADOW_PURPLE_BUTTON}
            >
                <Path
                    d="M13.596.554a1.55 1.55 0 00-2.192 0L.554 11.404a1.55 1.55 0 002.192 2.192l.454-.454V23.35a1.55 1.55 0 001.55 1.55h3.1a1.55 1.55 0 001.55-1.55v-3.1a1.55 1.55 0 011.55-1.55h3.1a1.55 1.55 0 011.55 1.55v3.1a1.55 1.55 0 001.55 1.55h3.1a1.55 1.55 0 001.55-1.55V13.142l.454.454a1.55 1.55 0 002.192-2.192L13.596.554z"
                    fill={color}
                />
            </Svg>
        </TouchableOpacity>
    )
}
