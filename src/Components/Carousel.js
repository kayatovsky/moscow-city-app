import React, {createRef, useCallback, useEffect, useMemo} from 'react'
import {View, FlatList, StyleSheet} from "react-native";
import {Card} from "../Screens/Main/Home/Components/Card";
import {useSelector} from "react-redux";
import {MAIN_SCREEN_BACKGROUND_COLOR} from "src/Theme/theme";
import useScaleFactor from "src/Hooks/useScaleFactor";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";

const LoadingContainer = () => {
    const {verticalScale, horizontalScale} = useScaleFactor()
    return (
        <SkeletonPlaceholder
            highlightColor='#F2F8FC'
            backgroundColor='rgba(227,227,227, 0.65)'
        >
            <View style={{flexDirection: 'row'}}>
                <View
                    style={{
                        borderRadius: 23,
                        width: 220 * horizontalScale,
                        height: 270 * verticalScale,
                        marginLeft: 56 * horizontalScale,
                        marginRight: 32 * horizontalScale,
                        marginVertical: 30 * verticalScale
                    }}
                />
                <View
                    style={{
                        borderRadius: 23,
                        width: 220 * horizontalScale,
                        height: 270 * verticalScale,
                        marginLeft: 56 * horizontalScale,
                        marginRight: 32 * horizontalScale,
                        marginVertical: 30 * verticalScale
                    }}
                />
            </View>
        </SkeletonPlaceholder>
    )
}


export default function ({navigation, isLoading}) {
    const {currentTab, services} = useSelector(state => state.mainScreen);
    const {horizontalScale, verticalScale} = useScaleFactor()


    const refContainer = createRef();

    const activePartners = services.filter(item => item.is_active).filter(item => item.category === currentTab)

    useEffect(() => {
        if (activePartners.length > 0)
            refContainer.current.scrollToIndex({animated: true, index: 0});
    }, [currentTab, activePartners])


    return (
        <View style={[styles.container]}>
            <FlatList ref={refContainer}
                      data={activePartners}
                      renderItem={({item, index}) => {
                          if (isLoading)
                              return (
                                  <LoadingContainer/>
                              )
                          else return (
                              <Card
                                  data={item}
                                  isFirst={index === 0}
                                  isLast={index === activePartners.length - 1}
                                  navigation={navigation}
                              />
                          )
                      }}
                      horizontal
                      showsVerticalScrollIndicator={false}
                      showsHorizontalScrollIndicator={false}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        backgroundColor: MAIN_SCREEN_BACKGROUND_COLOR
    },
})


/**const card = {
        common: [
            {
                title: "Ваш клининг",
                key: "1",
                name: 'cleaning',
                pageTitle: "Клининг",
                icon: "cleaning"
            },
            {
                title: "Ваша химчистка",
                key: "2",
                name: "drycleaning",
                pageTitle: "Химчистка",
                icon: 'drycleaning'
            }, {
                 title: "Глажка вещей",
                 key: "3",
                 name: 'ironing',
                 pageTitle: "Глажка",
                 icon: ''
             }
        ]
    c       are: [
    {
        : "Тайский массаж",
        key: "1",
        name: "massage",
        icon: "massage",
        pageTitle: "Массаж"
    },
    {
        title: "Ваш парикмахер",
        key: "2",
        path: require('../Assets/Images/scissors.png'),
        normalizeHorizontal: 0,
        normalizeVertical: 0,
        name: 'hairdresser',
        pageTitle: "Парикмахер"
    },
    {
        title: "Ваш барбер",
        key: "3",
        path: require('../Assets/Images/razor.png'),
        normalizeHorizontal: 0,
        normalizeVertical: 7 * verticalScale,
        name: 'barber',
        pageTitle: "Барбер"
    },
    {
        title: "Nail мастер",
        key: "4",
        path: require('../Assets/Images/nails.png'),
        normalizeHorizontal: 13 * horizontalScale,
        normalizeVertical: 0,
        name: 'nails',
        pageTitle: "Ноготочки"
    }
],
    delivery: [
    {
        title: "Вода питьевая",
        key: "1",
        normalizeHorizontal: 20 * horizontalScale,
        normalizeVertical: 0,
        name: 'water',
        pageTitle: "Вода",
    },
    {
        title: "Паровые коктейли",
        key: "2",
        normalizeHorizontal: 0,
        normalizeVertical: 6 * verticalScale,
        name: 'hookan',
        pageTitle: "Чаха"
    },
    {
        title: "Доставка фруктов",
        key: "3",
        name: 'fruits',
        pageTitle: "Фрукты",
        icon: 'fruits'
    },
]
}*/
