import {Text, View, StyleSheet, ScrollView, RefreshControl, TouchableOpacity} from 'react-native'
import React, {Fragment} from 'react'
import {GREY_TEXT_COLOR, MAIN_SCREEN_BACKGROUND_COLOR} from "src/Theme/theme";
import HorizontalAlign from "src/Components/Layout/HorizontalAlign";
import WithPadding from "src/Components/Layout/WithPadding";
import useScaleFactor from "src/Hooks/useScaleFactor";
import {days} from "../../../Utils/date_utils";
import {TabBar} from "../../../Components/Navigation/TabBar";
import {useDispatch, useSelector} from "react-redux";
import {fetchOrders, fetchServices} from "../../../Slices/mainScreen";
import MenuIcon from "../../../Assets/Icons/Menu";


export default function MainScreensContainer(
    {
        primaryText,
        secondaryText,
        children,
        withScrollView = false,
        isBodyFullWidth = false,
        navigation,
        menuIconAction,
        useDateTitle=true
    }) {
    const Wrapper = isBodyFullWidth ? WithPadding : Fragment
    const {verticalScale, horizontalScale} = useScaleFactor();
    const dispatch = useDispatch();
    const {activeScreenIndex, isFetchingData} = useSelector(state => state.mainScreen);

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: MAIN_SCREEN_BACKGROUND_COLOR,
            flexDirection: "column",
        },
        header: {
            // todo: fix this
            paddingTop: 25 * verticalScale,
            paddingBottom: 20 * verticalScale,
            width: "100%",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: 'center',

        },
        title: {
            fontFamily: "bold",
            fontSize: 32 * horizontalScale,
            fontWeight: "700",
            lineHeight: 43 * verticalScale
        },
        content: {
            flexDirection: "column",
        },
        titleContainer: {
            paddingBottom: 27 * horizontalScale,
        },
        date: {
            fontFamily: 'light',
            color: GREY_TEXT_COLOR,
            fontSize: 17 * horizontalScale,
            lineHeight: 22 * verticalScale
        }
    });

    const time = new Date();
    const day = time.getDay();
    const date = time.getDate();

    return (
        <Fragment>
            <ScrollView
                style={{height: '88%', backgroundColor: MAIN_SCREEN_BACKGROUND_COLOR}}
                refreshControl={
                    <RefreshControl
                        refreshing={isFetchingData}
                        onRefresh={() => {
                            if (activeScreenIndex === 2)
                                dispatch(fetchOrders(true))
                            if (activeScreenIndex === 1)
                                dispatch(fetchServices());
                        }}
                    />
                }
            >
                <HorizontalAlign isScrollable={withScrollView} withPadding={!isBodyFullWidth}>
                    <View style={styles.container}>
                        <View style={{width: "100%", height: 65 * verticalScale}}/>
                        <View>
                            <Wrapper>
                                <View style={styles.header}>
                                    <Text style={styles.date}>{useDateTitle ? `${days[day]}, ${date}` : "Услуги в вашем ЖК"}</Text>
                                    {!useDateTitle && <TouchableOpacity
                                        style={{height: 20 * verticalScale, justifyContent: 'center'}}
                                        onPress={menuIconAction}
                                    >
                                        <MenuIcon
                                        />
                                    </TouchableOpacity>}
                                </View>
                                <View style={[styles.titleContainer]}>
                                    <Text style={styles.title}>{primaryText}</Text>
                                    <Text style={styles.title}>{secondaryText}</Text>
                                </View>
                            </Wrapper>
                            <View style={styles.content}>
                                {children}
                            </View>
                        </View>
                    </View>
                </HorizontalAlign>
            </ScrollView>
            <TabBar navigation={navigation}/>
        </Fragment>
    )
}

