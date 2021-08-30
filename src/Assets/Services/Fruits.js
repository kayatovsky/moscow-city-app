import * as React from "react"
import Svg, {Path} from "react-native-svg"
import useScaleFactor from "../../Hooks/useScaleFactor";

export default function (props) {
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
                d="M40.906.094l-.718.687L.78 40.188l-.687.718.687.688c11.281 11.281 29.532 11.281 40.813 0 11.281-11.282 11.281-29.532 0-40.813zM40.813 3c9.808 10.559 9.652 26.91-.626 37.188C29.91 50.465 13.56 50.62 3 40.812L4.313 39.5c9.726 8.988 24.957 8.762 34.406-.688 9.449-9.449 9.676-24.68.687-34.406zM38 5.813c8.207 8.96 7.957 22.917-.719 31.593-8.68 8.68-22.605 8.907-31.562.688zm.813 6.687a1.645 1.645 0 00-.626.094c-.8.398-2.374 2.594-2.374 2.594s2.792.707 3.593.406c.801-.399 1.207-1.293.907-2.094-.301-.602-.891-.977-1.5-1zm1.78 7.094c-.898 0-3.28 1.5-3.28 1.5s2.195 1.718 3.093 1.718c.899 0 1.586-.699 1.688-1.5.101-.898-.602-1.718-1.5-1.718zm-1.5 6.906c-1.124.016-2.687.313-2.687.313s1.48 2.382 2.282 2.78c.8.4 1.726.02 2.124-.78.399-.801-.011-1.82-.812-2.22-.2-.073-.531-.097-.906-.093zm-6.28 6.094s.273 2.8.874 3.5c.602.699 1.614.82 2.313.218.7-.601.695-1.613.094-2.312-.602-.7-3.282-1.406-3.282-1.406zm-17 3.312S13.305 37.2 12.905 38c-.5.8-.207 1.79.594 2.188.8.5 1.79.207 2.188-.594.398-.801.124-3.688.124-3.688zm11.593.282s-.918 2.699-.718 3.5c.3.8 1.199 1.324 2 1.124a1.525 1.525 0 001.125-2c-.2-.8-2.407-2.624-2.407-2.624zm-5.906 1s-1.805 2.101-1.906 3c-.102.898.508 1.71 1.406 1.812.898.102 1.688-.508 1.688-1.406.101-.899-1.188-3.407-1.188-3.407z"/>
        </Svg>
    )
}
