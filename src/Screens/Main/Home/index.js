import {Text, View, StyleSheet, TouchableOpacity, ActivityIndicator, Alert} from 'react-native'
import React, {useEffect, useRef, Fragment, useState} from 'react'
import Template from "../Components/Container";
import Carousel from "src/Components/Carousel";
import {useDispatch, useSelector} from "react-redux";
import {MAIN_BLUE_COLOR} from "src/Theme/theme";
import {fetchServices, handleChangeTower, setBackdropState, toggleTab} from "src/Slices/mainScreen";
import useScaleFactor from "src/Hooks/useScaleFactor";
import HorizontalAlign from "src/Components/Layout/HorizontalAlign";
import {Modalize} from "react-native-modalize";
import RadioButtonInverted from "../../../Components/Common/RadioButtonInverted";
import {setTowerName} from "../../../Slices/auth";
import {towersListHardcode} from "../../Register/Address/TowersList";
import {DrawerGrid} from "../../../Components/Layout/DrawerPadding";
import Button from "../../../Components/Common/Button";
import WithPadding from "../../../Components/Layout/WithPadding";

const tabs = [
    {
        title: "Общее",
        value: "common"
    },
    {
        title: "Уход",
        value: "care"
    },
    {
        title: "Доставка",
        value: "delivery"
    },
]



export default function Home({navigation}) {
    const {currentTab, isFetchingData, isSavingTower} = useSelector(state => state.mainScreen);
    const dispatch = useDispatch();
    const {tower} = useSelector(state => state.auth)
    const {verticalScale, horizontalScale} = useScaleFactor();
    const [towersState, setTowersState] = useState(tower);

    const target = towersListHardcode.find(item => item.title === tower);

    const ref = useRef(null);

    const closeBottomDrawer = () => {
        ref.current && ref.current.close();
        //dispatch(setBackdropState(false));
    }
    const openBottomDrawer = () => {
        ref.current && ref.current.open();
        dispatch(setBackdropState(true));
    }

    useEffect(() => {
        setTowersState(tower);
    }, [tower])

    const styles = StyleSheet.create({
        menuItem: {
            marginRight: 35 * verticalScale
        },
        menuItemText: {
            fontFamily: "regular",
            fontSize: 17 * horizontalScale,
            lineHeight: 21 * verticalScale,
            fontWeight: "400",
            color: "#9a9a9d"
        },
        isActiveItem: {
            color: MAIN_BLUE_COLOR
        }
    })

    useEffect(() => {
        dispatch(fetchServices())
    }, [dispatch])

    return (
        <Fragment>
        <Template
            primaryText={target?.label?.primary}
            secondaryText={target?.label?.secondary}
            navigation={navigation}
            withScrollView={false}
            isBodyFullWidth
            menuIconAction={openBottomDrawer}
            useDateTitle={false}
        >
            <HorizontalAlign>
                <View style={{flexDirection: "row", paddingBottom: 30 * verticalScale}}>
                    {tabs.map((item, index) =>
                        <TouchableOpacity key={index} onPress={() => dispatch(toggleTab(item.value))}>
                            <View
                                key={index}
                                style={styles.menuItem}
                            >
                                <Text
                                    style={[styles.menuItemText, item.value === currentTab && styles.isActiveItem]}>
                                    {item.title}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    )}
                </View>
            </HorizontalAlign>
            <View style={{paddingVertical: 5, overflow: "visible"}}>
                <Carousel isLoading={isFetchingData} navigation={navigation}/>
            </View>
            <WithPadding>
                <TouchableOpacity  style={{marginTop: 34 * verticalScale}} onPress={() => dispatch(toggleTab('special'))}>
                    <View
                        style={styles.menuItem}
                    >
                        <Text
                            style={[styles.menuItemText, 'special' === currentTab && styles.isActiveItem]}>
                            Спец.предложение
                        </Text>
                    </View>
                </TouchableOpacity>
            </WithPadding>
        </Template>
    <Modalize
        ref={ref}
        modalHeight={712 * verticalScale}
        onClosed={() => {setTowersState(tower)}}
        keyboardAvoidingBehavior='position'
        customRenderer={
                <View style={{
                    height: 712 * verticalScale,
                    backgroundColor: "#fff",
                    borderTopStartRadius: 20,
                    borderTopEndRadius: 20,
                    paddingTop: 50 * verticalScale,
                    position: 'relative'
                }}>
                   <DrawerGrid style={{borderWidth: 1}}>
                       {towersListHardcode.map((item, index) =>
                           <RadioButtonInverted
                               key={item.id}
                               disabled={item.title !== towersState}
                               primaryText={item.title}
                               onChange={value => setTowersState(value)}
                               value={item.title}
                               withBorder
                               isFirst={index === 0}
                           />
                       )}
                       <Button
                           title='Изменить'
                           variant='outlined'
                           style={{position: 'absolute', bottom: -150 * verticalScale, left: 0}}
                           onPress={async () => {
                               if (towersState !== tower) {
                                   await dispatch(handleChangeTower(towersState))
                                   ref?.current?.close();
                               }

                           }}
                           isLoading={isSavingTower}
                       />
                   </DrawerGrid>
                </View>
        }
        withHandle={true}
    />
    </Fragment>
    )
}
