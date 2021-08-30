import * as React from "react"
import Svg, {Path} from "react-native-svg"
import useScaleFactor from "../../../Hooks/useScaleFactor";
import {TouchableOpacity} from "react-native";

export default function (props) {
    const {verticalScale} = useScaleFactor();
    return (
        <TouchableOpacity {...props}>
            <Svg
                width={18}
                height={18}
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                {...props}
            >
                <Path d="M17 1L1 17M1 1l16 16" stroke="#000" strokeLinecap="round" />
            </Svg>
        </TouchableOpacity>
    )
}
