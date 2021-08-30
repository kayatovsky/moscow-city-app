import React from "react";
import {View} from "react-native";
import {useDispatch, useSelector} from "react-redux";
import {setTowerName} from "src/Slices/auth";
import RadioButtonInverted from "src/Components/Common/RadioButtonInverted";

export const towersListHardcode = [
    {
        title: 'Федерация Запад',
        label: {
            primary: 'Федерация',
            secondary: 'Запад'
        },
        id: "1"
    },
    {
        title: 'Федерация Восток',
        id: "2",
        label: {
            primary: 'Федерация',
            secondary: 'Восток',
        },
    },
    {
        title: 'Город столиц МСК',
        id: "3",
        label: {
            primary: 'Город столиц',
            secondary: 'МСК'
        },
    },
    {
        title: 'Город столиц СПБ',
        id: "4",
        label: {
            primary: 'Город столиц',
            secondary: 'СПБ'
        },
    },
    {
        title: 'Башня Империя',
        id: "5",
        label: {
            primary: 'Башня',
            secondary: 'Империя'
        },
    },
    {
        title: 'ОКО Апартаменты',
        id: "6",
        label: {
            primary: 'ОКО',
            secondary: 'Апартаменты'
        },
    },
    {
        title: 'Башня Меркурий',
        id: "7",
        label: {
            primary: 'Башня',
            secondary: 'Меркурий'
        },
    },
    {
        title: 'МФК NEVA TOWERS 22c1',
        id: "8",
        label: {
            primary: 'МФК',
            secondary: 'NEVA TOWERS 22c1'
        },
    },
    {
        title: "МФК NEVA TOWERS 22c2",
        id: "9",
        label: {
            primary: 'МФК',
            secondary: 'NEVA TOWERS 22c2'
        },
    }
];

export default function () {
    const {tower} = useSelector(state => state.auth);
    const dispatch = useDispatch();

    return (
        <View>
            {towersListHardcode.map((item, index) =>
                <RadioButtonInverted
                    key={item.id}
                    disabled={item.title !== tower}
                    primaryText={item.title}
                    onChange={value => dispatch(setTowerName(value))}
                    value={item.title}
                    withBorder
                    isFirst={index === 0}
                />
            )}
        </View>
    )
}
