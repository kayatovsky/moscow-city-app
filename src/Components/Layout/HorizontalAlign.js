import React, {Fragment} from 'react'
import {View, ScrollView, StyleSheet} from 'react-native'
import {MAIN_SCREEN_BACKGROUND_COLOR} from "../../Theme/theme";

export default function HorizontalAlign({isScrollable, withPadding=true, children}) {
    const Wrapper = isScrollable ? ScrollView : Fragment
    let props = {};

    if (isScrollable)
        props.style = {
            backgroundColor: MAIN_SCREEN_BACKGROUND_COLOR,
            height: '100%',
        }

    return (
        <Wrapper {...props}>
            <View style={styles.container}>
                {withPadding && <View style={styles.paddings}/>}
                <View style={styles.content}>
                    {children}
                </View>
                {withPadding && <View style={styles.paddings}/>}
            </View>
        </Wrapper>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        flex: 1,
        backgroundColor: MAIN_SCREEN_BACKGROUND_COLOR,
    },
    paddings: {
        flex: 1
    },
    content: {
        flex: 5,
    }
})
