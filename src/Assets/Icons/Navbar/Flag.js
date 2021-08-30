import * as React from "react"
import Svg, {Path} from "react-native-svg"

export default function (props) {
    return (
        <Svg
            width={16}
            height={18}
            viewBox="0 0 16 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <Path
                d="M9.66 1.3a1 1 0 00-.98-.8H1.5a1 1 0 00-1 1v15a1 1 0 102 0v-6h5.6l.24 1.2c.09.468.503.805.98.8h5.18a1 1 0 001-1v-8a1 1 0 00-1-1H9.9l-.24-1.2z"
                fill="#333"
            />
        </Svg>
    )
}
