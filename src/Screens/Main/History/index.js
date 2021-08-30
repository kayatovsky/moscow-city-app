import React, {Fragment, useEffect, useRef, useState} from 'react'
import {View, StyleSheet, ActivityIndicator} from "react-native";
import useScaleFactor from "src/Hooks/useScaleFactor";
import NoOrdersView from "../Orders/Components/NoOrdersView";
import OrderItemHistory from "../Orders/Components/OrderItemHistory";
import {useDispatch, useSelector} from "react-redux";
import {fetchOrders} from "src/Slices/mainScreen";
import {parserDateForOrdersHistory} from "../../../Utils/date_utils";
import TemplateAnimated from "../../Cleaning/Components/TemplateAnimated";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import {Modalize} from "react-native-modalize";
import DrawerController from "../Orders/Components/DrawerController";


const Placeholder = () => {
    const {verticalScale, horizontalScale} = useScaleFactor();
    const styles = StyleSheet.create({
        header: {
            height: 20 * verticalScale,
            marginBottom: 18 * verticalScale
        },
        item: {
            height: 60 * verticalScale,
            width: 295 * horizontalScale,
            marginBottom: 23 * verticalScale
        },
        container: {
            marginBottom: 40 * verticalScale
        }
    })

    return (
        <SkeletonPlaceholder
            highlightColor='#F2F8FC'
            backgroundColor='rgba(227,227,227, 0.65)'
        >
            {(new Array(5).fill(0).map((item, index) =>
                <View style={{marginTop: 30 * verticalScale}}
                      key={index}>
                    <SkeletonPlaceholder
                        highlightColor='#F2F8FC'
                        backgroundColor='rgba(227,227,227, 0.65)'
                    >
                        {(new Array(4).fill(0).map((item, indexSecondary) =>
                            <Fragment key={indexSecondary}>
                                <View style={styles.header}/>
                                <View style={styles.item}/>
                                <View style={styles.header}/>
                            </Fragment>
                        ))}
                    </SkeletonPlaceholder>
                </View>
            ))}
        </SkeletonPlaceholder>
    )
}

export default function ({navigation}) {
    const {verticalScale} = useScaleFactor();
    const {historyOrders, isFetchingOrders} = useSelector(state => state.mainScreen)
    const dispatch = useDispatch()

    const ref = useRef(null);
    const [drawerType, setDrawerType] = useState('help');

    const handleOpen = type => {
        setDrawerType(type);
        ref.current && ref.current.open();
    }

    const heightMapper = {
        help: 280 * verticalScale,
        info: 520 * verticalScale,
        infoShort: 410 * verticalScale
    }

    useEffect(() => {
        dispatch(fetchOrders(false))
    }, [])


    // todo: complete this mapper
    const namesMapper = {
        "cleaning_order": 'Клининг №',
        "fruits": 'Фрукты №',
        "massage_king": "Массаж №",
        'massage_edem': "Массаж №",
        "massage_imperium": 'Массаж №'
    }

    return (
        <Fragment>
            <TemplateAnimated
                primaryText='История'
                withInformationIcon={false}
                navigation={navigation}
            >
                <View>
                    {isFetchingOrders ? <Placeholder/> : historyOrders.length === 0 ?
                        <View style={{marginTop: 150 * verticalScale}}><NoOrdersView navigation={navigation}/></View> :
                        <View style={{marginTop: 20 * verticalScale}}>
                            {historyOrders.map((item, index) => {
                                return <OrderItemHistory
                                    key={index}
                                    title={`${namesMapper[item.name_of_service]} ${item.id}`}
                                    phone='8-800-555-35-35'
                                    price={item.value}
                                    date={parserDateForOrdersHistory(item.time_start, true)}
                                    isLastElement={index === historyOrders.length - 1}
                                    onPress={handleOpen}
                                    additionalPrice={item.suborders_price_total}
                                    data={item}
                                />
                            })}
                        </View>
                    }
                </View>
            </TemplateAnimated>
            <Modalize
                ref={ref}
                modalHeight={heightMapper[drawerType]}
                customRenderer={<DrawerController isHistory type={drawerType}/>}
                withHandle={true}
            />
        </Fragment>
    )
}
