import React from "react"
import Svg, {Path} from "react-native-svg"
import {TouchableOpacity, StyleSheet} from "react-native";
import useScaleFactor from "src/Hooks/useScaleFactor";

export default function ({onPress, withPadding=true, ...rest}) {
    const {verticalScale, horizontalScale} = useScaleFactor();

    const styles = StyleSheet.create({
        container: {
            paddingHorizontal: 8 * verticalScale,
            paddingVertical: 8 * horizontalScale,
            width: 30 * horizontalScale,
            position: 'relative',
            right: 8 * horizontalScale
        }
    })

    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
            <Svg
                width={14 * horizontalScale}
                height={14 * verticalScale}
                viewBox="0 0 14 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                {...rest}
            >
                <Path
                    d="M7 13L1 7l6-6"
                    stroke="#000"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </Svg>
        </TouchableOpacity>
    )
}
