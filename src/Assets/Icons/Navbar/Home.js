import * as React from "react"
import Svg, {Path} from "react-native-svg"

export default function (props) {
    return (
        <Svg
            width={16}
            height={19}
            viewBox="0 0 16 19"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <Path
                d="M.293 7.707l7-7a1 1 0 011.414 0l7 7a1 1 0 01.293.707V18a1 1 0 01-1 1h-5v-7H6v7H1a1 1 0 01-1-1V8.414a1 1 0 01.293-.707z"
                fill="#333"
            />
        </Svg>
    )
}
