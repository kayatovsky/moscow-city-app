import * as React from "react"
import Svg, { Path } from "react-native-svg"
import {TouchableOpacity} from "react-native";

export default function({onPress, ...rest}) {
    return (
        <TouchableOpacity onPress={onPress}>
            <Svg
                width={20}
                height={20}
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                {...rest}
            >
                <Path
                    d="M10 20C4.48 19.994.006 15.52 0 10v-.2C.11 4.305 4.635-.072 10.13 0c5.497.074 9.904 4.569 9.868 10.065C19.962 15.562 15.497 20 10 20zm-.016-2H10a8 8 0 10-.016 0zM11 16H9v-2h2v2zm0-3H9a3.583 3.583 0 011.77-3.178C11.43 9.316 12 8.88 12 8a2 2 0 10-4 0H6v-.09A4 4 0 0114 8a3.413 3.413 0 01-1.56 2.645S11.085 12.033 11 13z"
                    fill="#000"
                />
            </Svg>
        </TouchableOpacity>
    )
}
