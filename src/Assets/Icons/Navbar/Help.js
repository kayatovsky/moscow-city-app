import * as React from "react"
import Svg, {Path} from "react-native-svg"

export default function (props) {
    return (
        <Svg
            width={20}
            height={20}
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <Path
                d="M10 20C4.477 20 0 15.523 0 10S4.477 0 10 0s10 4.477 10 10c-.006 5.52-4.48 9.994-10 10zm-1-5v2h2v-2H9zm1-10a2 2 0 012 2 1.95 1.95 0 01-.59 1.41l-1.24 1.26A4.015 4.015 0 009 12.5v.5h2a3.42 3.42 0 011.17-2.83l.9-.92A3.16 3.16 0 0014 7a4 4 0 00-8 0h2a2 2 0 012-2z"
                fill="#333"
            />
        </Svg>
    )
}
