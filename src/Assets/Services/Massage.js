import * as React from "react"
import Svg, { Path } from "react-native-svg"
import useScaleFactor from "../../Hooks/useScaleFactor";

function SvgComponent(props) {

    const {verticalScale, horizontalScale} = useScaleFactor();

    return (
        <Svg
            xmlns="http://www.w3.org/2000/svg"
            width={100 * horizontalScale}
            height={100 * verticalScale}
            viewBox="0 0 1280 1280"
            fill='#000'
            {...props}
        >
            <Path d="M60.4 436.5c-23.7 5.1-43.5 21.2-53.8 43.7C0 494.6 0 494.5 0 557.8V615h76v76H51v52h25v153H51v52h25v102h155v-77h613v77h155V948h25v-52h-25V743h25v-52h-25v-76h281v-57.2c0-63.3 0-63.2-6.6-77.6-10.4-22.7-30.2-38.7-54.2-43.7-9.7-2.1-124.6-2.1-134.2-.1-11.1 2.4-23.3 8.4-34.5 17-.7.5-3.1-.6-6.6-3.3-7.2-5.6-17.9-10.7-27.4-13.1-7.8-2-11.6-2-478.9-1.9-388.8 0-472.2.3-477.2 1.4zm945.8 51.7c5.3 1.6 13.1 8.7 15.4 14 1.6 3.7 1.9 8.1 2.2 32.5l.4 28.3H52v-28.3c0-26.2.2-28.5 2.1-32.7 2.7-6 6.4-9.8 12.4-12.6l5-2.4h465.4c356.6 0 466.3.3 469.3 1.2zm207.4 1.2c5.9 2.7 11.6 9 13.2 14.5.8 2.5 1.2 13.4 1.2 31.5V563h-152v-28.3c0-26.2.2-28.5 2.1-32.7 2.7-6 6.4-9.8 12.4-12.6l5-2.4h113l5.1 2.4zM179 806.5V998h-51V615h51v191.5zm665-77V844H231V615h613v114.5zm103 77V998h-51V615h51v191.5zm-103 102V921H231v-25h613v12.5z" />
        </Svg>
    )
}

export default SvgComponent
