import * as React from "react"
import Svg, {Path} from "react-native-svg"

export default function(props) {

    return (
        <Svg
            width={25}
            height={17}
            viewBox="0 0 25 17"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <Path
                d="M1.599 8.333H13.5M1.6 1h22m-22 14.667h22"
                stroke="#000"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </Svg>
    )
}
