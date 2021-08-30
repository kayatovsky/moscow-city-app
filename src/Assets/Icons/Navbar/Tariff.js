import * as React from "react"
import Svg, {Path} from "react-native-svg"

export default function (props) {
    return (
        <Svg
            width={19}
            height={19}
            viewBox="0 0 19 19"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <Path
                d="M9.897 18.968c-.53.002-1.04-.21-1.414-.586L.646 10.547a1.993 1.993 0 01-.58-1.567l.5-6.566A1.989 1.989 0 012.414.573l6.566-.5c.052-.011.103-.011.155-.011.53 0 1.037.21 1.41.586l7.838 7.834a2 2 0 010 2.829l-7.072 7.071a1.987 1.987 0 01-1.414.586zM5.654 3.654a2 2 0 101.415 3.414l.007-.006.007-.007-.008.007a2 2 0 00-1.421-3.408z"
                fill="#333"
            />
        </Svg>
    )
}
