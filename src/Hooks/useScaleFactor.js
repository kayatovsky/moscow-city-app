import {useWindowDimensions} from "react-native";

export default function() {
    const {width, height} = useWindowDimensions();
    return {
        verticalScale: height / 896,
        horizontalScale: width / 414,
    }
}
