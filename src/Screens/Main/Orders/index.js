import React, {useEffect, Fragment, useRef, useState, useCallback} from 'react'
import {View, StyleSheet} from 'react-native'
import useScaleFactor from "src/Hooks/useScaleFactor";
import {useDispatch, useSelector} from "react-redux";
import {fetchOrders, setBackdropState} from "src/Slices/mainScreen";
import OrderItem from "./Components/OrderItem";
import NoOrdersView from "./Components/NoOrdersView";
import {parserDateForOrdersHistory} from "src/Utils/date_utils";
import Container from "../Components/Container";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import {Modalize} from "react-native-modalize";
import DrawerController from "./Components/DrawerController";
import moment from "moment";

const SkeletonContainer = () => {
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
        <View style={{marginTop: 40 * verticalScale}}>
            <SkeletonPlaceholder
                highlightColor='#F2F8FC'
                backgroundColor='rgba(227,227,227, 0.65)'
            >
                {(new Array(4).fill(0).map((item, index) =>
                    <Fragment key={index}>
                        <View style={styles.header}/>
                        <View style={styles.item}/>
                        <View style={styles.header}/>
                    </Fragment>
                ))}
            </SkeletonPlaceholder>
        </View>
    )
}

export default function Orders({navigation}) {
    const {verticalScale} = useScaleFactor();
    const {currentOrders, isFetchingOrders} = useSelector(state => state.mainScreen)
    const dispatch = useDispatch()
    const ref = useRef(null);
    const [drawerType, setDrawerType] = useState('help');


    const heightMapper = {
        help: 280 * verticalScale,
        cancelWithRefund: 182 * verticalScale,
        cancelWithoutRefund: 378 * verticalScale,
        info: 520 * verticalScale,
        infoShort: 410 * verticalScale
    }

    useEffect(() => {
        dispatch(fetchOrders(true))
    }, [])

    useEffect(() => {
        return () => dispatch(setBackdropState(false));
    }, [])

    const closeBottomDrawer = () => {
        ref.current && ref.current.close();
    }

    const openBottomDrawer = (type) => {
        setDrawerType(type)
        dispatch(setBackdropState(true));
        ref.current && ref.current.open();
    }

    const shouldRender = (order) => {
        const deltaHours = (moment.now() - moment(order.init_date)) / 1000 / 60 / 60;
        if (order.status === 'declined_by_partner' && deltaHours <= 16)
            return true;
        else if (order.status === 'declined_by_partner' && deltaHours > 16)
            return false
        return true;
    }

    return (
        <Fragment>
            <Container
                primaryText="Текущие"
                secondaryText="заказы"
                navigation={navigation}
            >
                {isFetchingOrders ? <SkeletonContainer/> : currentOrders && currentOrders.length === 0 ?
                    <NoOrdersView withDispatch navigation={navigation}/> :
                    <View>
                        {currentOrders && currentOrders.map((item, index) =>
                            shouldRender(item) && <OrderItem
                                onPress={openBottomDrawer}
                                data={item}
                                key={index}
                                phone='8-800-555-35-35'
                                isLastElement={index === currentOrders.length - 1}
                                price={item.value}
                                additionalPrice={item.suborders_price_total}
                                date={parserDateForOrdersHistory(item.time_start)}
                                toggleDrawer={openBottomDrawer}
                            />
                        )}
                    </View>
                }
            </Container>
            <Modalize
                ref={ref}
                modalHeight={heightMapper[drawerType]}
                customRenderer={<DrawerController closeDrawer={closeBottomDrawer} type={drawerType}/>}
                withHandle={true}
            />
        </Fragment>
    )
}

