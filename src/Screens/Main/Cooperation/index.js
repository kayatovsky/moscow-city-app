import React from 'react'
import {View, StyleSheet, Linking} from "react-native";
import Template from 'src/Screens/Cleaning/Components/Template'
import useScaleFactor from "src/Hooks/useScaleFactor";
import NeomorphListItem from "../../../Components/Common/NeomorphListItem";


export default function ({navigation}) {
    const {verticalScale} = useScaleFactor()

    const styles = StyleSheet.create({
        container: {
            marginTop: 40 * verticalScale
        },
    })

    const data = [
        {
            title: "Telegram",
            link: "https://t.me/moscina",
        },
        {
            title: "Email",
            link: "mailto:Waaaks13@gmail.com",
        }
    ]

    return (
        <Template
            primaryText='Сотрудничество'
            withInformationIcon={false}
            navigation={navigation}
            withScrollView={false}
        >
            <View style={styles.container}>
                {data.map((item, index) =>
                    <NeomorphListItem
                        title={item.title}
                        onPress={() => Linking.openURL(item.link)}
                        key={index}
                    />
                )}
            </View>
        </Template>
    )
}
