import * as React from "react"
import Svg, {Path} from "react-native-svg"
import useScaleFactor from "../../Hooks/useScaleFactor";

function SvgComponent(props) {

    const {verticalScale, horizontalScale} = useScaleFactor();

    return (
        <Svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 50 50"
            width={100 * horizontalScale}
            height={100 * verticalScale}
            fill='#000'
            {...props}
        >
            <Path
                d="M16.5 0c-2.133 0-4.309 1.086-6.063 2.125-1.753 1.04-3.062 2.094-3.062 2.094a.997.997 0 00-.094 1.5s1.309 1.293 3.063 2.594C12.098 9.613 14.274 11 16.5 11c3.035 0 5.5-2.465 5.5-5.5S19.535 0 16.5 0zm0 2A3.46 3.46 0 0120 5.5 3.46 3.46 0 0116.5 9c-1.273 0-3.348-1.113-4.969-2.313-1.078-.796-1.398-1.148-1.875-1.593.492-.364.75-.61 1.781-1.219C13.06 2.915 15.133 2 16.5 2zM2.844 10a2.782 2.782 0 00-1.063.313c-.02.011-.043-.012-.062 0-1.625.785-2.063 2.851-1.188 4.312l4.813 7.906.031-.031c.29.527.71.895 1.156 1.125C7 23.867 7.477 24 8 24c.32 0 .613-.082.906-.188L5.062 35.688A1.002 1.002 0 006 37h5v10c0 1.645 1.355 3 3 3 .766 0 1.469-.3 2-.781.531.48 1.234.781 2 .781 1.645 0 3-1.355 3-3V37h3a1 1 0 00.969-1.281L24.75 35c.05.004.105 0 .156 0h.282a.753.753 0 00.187 0c.18-.031.336-.094.5-.156l.969.875-.282.312a.998.998 0 00-.03 1.282l2.5 3.124a.913.913 0 00.218.188c.242 1.668 1.098 3.61 2.313 5.375 1.449 2.105 3.496 4 6.03 4a.99.99 0 00.72-.281l9.906-9.907a1 1 0 00-1.032-1.656s-1.332.438-3.843.438c-2.426 0-5.883-.442-10-2.219a.965.965 0 00-.282-.281l-3.28-2.313c-.2-.144-.442-.21-.688-.187a1.013 1.013 0 00-.625.343l-.282.313-.78-.719c.39-.691.507-1.48.374-2.281v-.063l-3.406-14.562v-.063h-.031c-.52-2.656-2.93-4.562-5.75-4.562h-5c-2.016 0-3.828.988-5 2.625l-.031.031-.532.781-2.375-3.968-.031-.031a3.303 3.303 0 00-1.75-1.313A2.724 2.724 0 002.844 10zM3 11.969c.32-.02.668.18.938.562.011.016.023.016.03.031l.282.47A1.02 1.02 0 003.844 13a.999.999 0 00-.5 1.75l6.25 5.563-.813 1.218C8.508 21.938 8.414 22 8 22c-.078 0-.355-.05-.563-.156a.978.978 0 01-.343-.282.879.879 0 00-.032-.093L2.25 13.594c-.313-.52-.148-1.23.375-1.469a.472.472 0 00.063-.063A.761.761 0 013 11.97zM13.594 14h5c1.957 0 3.504 1.262 3.812 2.969.008.02.02.043.032.062l3.375 14.532v.062c.042.36-.02.703-.157.938-.144.25-.316.386-.625.437h-.125c-.457 0-.84-.277-.937-.719v-.031l-2.594-10.5a1 1 0 00-1.938.5l1.344 5.375L9.22 17.312l1-1.53c.828-1.16 1.988-1.782 3.375-1.782zm-2.031 8.063l9.28 8.28a.966.966 0 00.438.25L22.625 35h-6.438a1.016 1.016 0 00-.406 0H12.22a.936.936 0 00-.313-.031.88.88 0 00-.094.031H7.375zM47 29c-1.645 0-3 1.355-3 3s1.355 3 3 3 3-1.355 3-3-1.355-3-3-3zm0 2c.563 0 1 .438 1 1 0 .563-.438 1-1 1-.563 0-1-.438-1-1 0-.563.438-1 1-1zm-6.5 2a1.5 1.5 0 100 3 1.5 1.5 0 000-3zm-11.156 2.906L31 37.063l-1.125 1.218-1.25-1.562zM13 37h2v10c0 .555-.445 1-1 1-.555 0-1-.445-1-1zm4 0h2v10c0 .555-.445 1-1 1-.555 0-1-.445-1-1v-.094zm15.813 1.25c4.246 1.781 7.925 2.344 10.53 2.344.579 0 .895-.086 1.376-.125l-4.125 4.125c-3.176-.14-4.813-2.219-4.813-2.219a.996.996 0 00-.968-.375 1.01 1.01 0 00-.766.64c-.121.337-.055.712.172.985 0 0 1.652 2.004 4.625 2.719l-1.532 1.531c-1.394-.152-2.921-1.297-4.093-3-1.168-1.7-1.875-3.738-1.969-4.875z"/>
        </Svg>
    )
}

export default SvgComponent