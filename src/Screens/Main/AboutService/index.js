import React from 'react'
import {View, StyleSheet, Linking} from "react-native";
import Template from 'src/Screens/Cleaning/Components/Template'
import useScaleFactor from "src/Hooks/useScaleFactor";
import ListItemWithArrow from "src/Components/Common/ListItemWithArrow";
import {useSelector} from "react-redux";
import * as WebBrowser from "expo-web-browser";

export default function ({navigation}) {
    const {verticalScale} = useScaleFactor();
    const {user, personal_data, license, trade_conditions, policy} = useSelector(state => state.auth.docsLinks)

    const styles = StyleSheet.create({
        container: {
            marginTop: 40 * verticalScale
        }
    })
    const data = [
        {
            title: "Политика конфиденциальности",
            link: policy,
        },
        {
            title: "Согласие на обработку данных",
            link: personal_data,
        },
        {
            title: "Пользовательское соглашение",
            link: user,
        },
        {
            title: "Оферта на оказание услуг",
            link: trade_conditions,
        },
        {
            title: "Лицензионное соглашение",
            link: license,
        },
        {
            title: "Партнеры",
            link: null,
        },
    ]

    return (
        <Template
            primaryText='О сервисе'
            withInformationIcon={false}
            navigation={navigation}
            withScrollView={false}
        >
            <View style={styles.container}>
                {data.map((item, index) =>
                    <ListItemWithArrow
                        title={item.title}
                        key={index}
                        onPress={() => WebBrowser.openBrowserAsync(item.link)}
                    />
                )}
            </View>
        </Template>
    )
}
