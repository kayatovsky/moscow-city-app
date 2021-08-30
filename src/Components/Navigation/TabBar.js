import React, {Fragment} from 'react'
import {StyleSheet, View} from "react-native";
import {Icon} from "react-native-elements";
import {MAIN_SCREEN_BACKGROUND_COLOR} from "src/Theme/theme";
import User from "src/Assets/Icons/Tabbar/User";
import History from "src/Assets/Icons/Tabbar/History";
import Home from "src/Assets/Icons/Tabbar/Home";
import {useSelector, useDispatch} from "react-redux";
import HorizontalAlign from "../Layout/HorizontalAlign";
import useScaleFactor from "../../Hooks/useScaleFactor";
import {setActiveScreenIndex} from "../../Slices/mainScreen";

export const TabBar = ({navigation}) => {
    const {verticalScale} = useScaleFactor()
    const components = [User, Home, History];
    const dispatch = useDispatch();
    const {activeScreenIndex} = useSelector(state => state.mainScreen)
    const links = ['Profile', 'App', 'History'];
    const placements = {
        0: "flex-start",
        1: "center",
        2: "flex-end"
    };

    const styles = StyleSheet.create({
        iconContainer: {
            flex: 1,
        },
        container: {
            width: "100%",
            flexDirection: "row",
            paddingBottom: 20 * verticalScale,
            paddingTop: 10 * verticalScale,
            backgroundColor: MAIN_SCREEN_BACKGROUND_COLOR,
            overflow: "visible",
        },
        wrapper: {
            width: "100%",
            flexDirection: "row",
            paddingBottom: 25 * verticalScale,
            paddingTop: 10 * verticalScale,
            backgroundColor: MAIN_SCREEN_BACKGROUND_COLOR,
        },
    })
    const corrections = {
        0: {
            position: "relative",
            top: 0,
            right: 8
        },
        1: {
            position: "relative",
            top: 0,
            right: 0
        },
        2: {
            position: "relative",
            top: 0,
            right: -9
        },
    }

    return (
        <Fragment>
            <View style={styles.wrapper}>
                <HorizontalAlign>
                    <View style={styles.container}>
                        {components.map((Icon, index) =>
                            <View
                                key={index}
                                style={[styles.iconContainer, {alignItems: placements[index]}, corrections[index]]}
                            >
                                <Icon
                                    onPress={async () => {
                                        await dispatch(setActiveScreenIndex(index))
                                        navigation.navigate(links[index])
                                    }}
                                    key={index}
                                    active={index === activeScreenIndex}
                                />
                            </View>
                        )}
                    </View>
                </HorizontalAlign>
            </View>
        </Fragment>
    )
}

