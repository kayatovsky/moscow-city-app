import React, {forwardRef, Fragment, useCallback, useMemo} from 'react'
import useScaleFactor from "src/Hooks/useScaleFactor";
import Button from "src/Components/Common/Button";
import {DrawerGrid} from "src/Components/Layout/DrawerPadding";
import {StyleSheet, View, Text, ScrollView, Linking} from 'react-native'
import {useDispatch, useSelector} from "react-redux"
import {capitalizeFirstLetter} from "src/Utils/misc";
import {cancelOrder} from "src/Slices/mainScreen";
import moment from 'moment'
import {getOrdersHelperData} from "../../../../Utils/helpers";
import {days} from "../../../../Utils/date_utils";


const HelpCard = ({}) => {
    const {verticalScale} = useScaleFactor();

    const styles = StyleSheet.create({
        container: {
            backgroundColor: "#fff",
            borderTopStartRadius: 20,
            borderTopEndRadius: 20,
        }
    })

    return (
        <View style={styles.container}>
            <DrawerGrid>
                <Button
                    title='Telegram'
                    variant='outlined'
                    color='primary'
                    style={{marginTop: 62 * verticalScale}}
                    onPress={() => Linking.openURL('https://t.me/moscina')}
                    withMargins={false}
                />
                <Button
                    title='Email'
                    variant='outlined'
                    color='primary'
                    style={{marginTop: 28 * verticalScale}}
                    onPress={() => Linking.openURL("mailto:Waaaks13@gmail.com")}
                />
            </DrawerGrid>
        </View>
    )
}

const InfoCard = ({isHistory}) => {
    const {currentOrderData} = useSelector(state => state.mainScreen)
    const {verticalScale, horizontalScale} = useScaleFactor()
    const {data} = currentOrderData;
    const {partner_id, sub_orders, value, suborders_price_total, name_of_service_ru, time_start, status} = data;
    const date = moment(time_start);
    const {services} = useSelector(state => state.mainScreen)
    const [serviceName, renderType] = getOrdersHelperData(partner_id, services)

    const styles = StyleSheet.create({
        container: {
            backgroundColor: "#fff",
            borderTopStartRadius: 20,
            borderTopEndRadius: 20,
        },
        wrapper: {
            marginTop: 31 * verticalScale
        },
        title: {
            fontFamily: 'bold',
            fontSize: 22 * horizontalScale
        },
        br: {
            height: 1,
            width: '100%',
            marginTop: 19 * verticalScale,
            marginBottom: 10 * verticalScale,
            backgroundColor: "#000",
        },
        statusContainer: {
            flexDirection: 'row',
            justifyContent: 'space-between'
        },
        statusContainerText: {
            fontFamily: 'regular',
            color: '#000',
            opacity: 0.5,
            fontSize: 17 * horizontalScale
        },
        namingText: {
            fontFamily: 'bold',
            fontSize: 17 * horizontalScale
        },
        serviceText: {
            fontSize: 17 * horizontalScale,
            fontFamily: 'regular',
        },
        brSecond: {
            height: 1,
            width: '100%',
            marginTop: 19 * verticalScale,
            marginBottom: 19 * verticalScale,
            backgroundColor: "#000",
        },
        boldText: {
            fontFamily: "bold"
        },
    })

    //todo: move to helper
    const getStatus = useCallback((status) => {
        if (status === 'new' && isHistory && currentOrderData.data.payment_info &&
            (currentOrderData.data.payment_info.Status === 'NEW' || currentOrderData.data.payment_info.Status === 'FORM_SHOWED'))
            return "Не оплачен"
        else if (status === 'new' && isHistory && currentOrderData.data.payment_info && currentOrderData.data.payment_info.Status === 'NEW')
            return false;
        switch (status) {
            case "new":
                return "Ожидание"
            case "in_work":
                return "В работе"
            case "declined_by_user":
                return "Отменён"
            case "declined_by_partner":
                return "Отклонён"
            case "done":
                return "Завершен"
            default:
                return ""
        }
    }, [])


    // todo: fix this function
    const getDate = () => {
        let minutes = date.minutes();
        if (minutes < 10)
            minutes = "0" + minutes
        if (date.year() <= 2020)
            return 'Как можно скорее'
        return `${days[date.day()]}, ${date.hours()}:${minutes}`
    }

    return (
        <Fragment>
            <ScrollView style={[styles.container, {maxHeight: '87%'}]}>
                <DrawerGrid>
                    <View style={styles.wrapper}>
                        <Text style={styles.title}>{capitalizeFirstLetter(serviceName)}</Text>
                        <View style={styles.br}/>
                        <View style={styles.statusContainer}>
                            <Text style={styles.statusContainerText}>{getStatus(status)}</Text>
                            <Text style={styles.statusContainerText}>{getDate()}</Text>
                        </View>
                        <View style={{marginTop: 30}}>
                            <View>
                                <Text style={styles.namingText}>Наименование</Text>
                            </View>
                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                marginTop: 17 * verticalScale
                            }}>
                                <Text style={styles.serviceText}>{name_of_service_ru}</Text>
                                <Text style={styles.serviceText}>{value - suborders_price_total} ₽</Text>
                            </View>
                            {sub_orders.map((item, index) =>
                                <View key={index}
                                      style={{
                                          flexDirection: 'row',
                                          justifyContent: 'space-between',
                                          marginTop: 17 * verticalScale
                                      }}>
                                    <Text style={styles.serviceText}>{capitalizeFirstLetter(item.name)}</Text>
                                    <Text style={styles.serviceText}>{item.price} ₽</Text>
                                </View>
                            )}
                            <View style={styles.brSecond}/>
                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                marginTop: 17 * verticalScale
                            }}>
                                <Text style={[styles.serviceText, styles.boldText]}>Стоимость</Text>
                                <Text style={[styles.serviceText, styles.boldText]}>{value - suborders_price_total} ₽</Text>
                            </View>
                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                marginTop: 17 * verticalScale
                            }}>
                                <Text style={[styles.serviceText]}>{renderType === 'with_images' ? 'Доставка' : 'Дополнительно'}</Text>
                                <Text
                                    style={[styles.serviceText,]}>{suborders_price_total} ₽</Text>
                            </View>
                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                marginTop: 17 * verticalScale
                            }}>
                                <Text style={[styles.serviceText,]}>Итого</Text>
                                <Text
                                    style={[styles.serviceText, styles.boldText]}>{value} ₽</Text>
                            </View>
                        </View>
                    </View>
                </DrawerGrid>
            </ScrollView>
        </Fragment>
    )
}

const CancelWithRefund = ({close}) => {
    const dispatch = useDispatch()
    const {verticalScale} = useScaleFactor();
    const {isRemovingOrder} = useSelector(state => state.mainScreen);
    return (
        <DrawerGrid>
            <Button
                title='Отменить'
                variant='outlined'
                color='primary'
                style={{marginTop: 62 * verticalScale}}
                onPress={async () => {
                    await dispatch(cancelOrder());
                    close()
                }}
                isLoading={isRemovingOrder}
            />
        </DrawerGrid>
    )
}

const CancelWithoutRefund = ({close}) => {

    const dispatch = useDispatch()
    const {verticalScale, horizontalScale} = useScaleFactor();

    const {isRemovingOrder} = useSelector(state => state.mainScreen);

    const styles = StyleSheet.create({
        title: {
            fontFamily: 'bold',
            fontSize: 22 * horizontalScale
        }
    })

    return (
        <DrawerGrid>
            <View style={{marginTop: 62 * verticalScale}}>
                <Text style={styles.title}>Внимание!</Text>
                <View style={{marginTop: 18 * verticalScale}}>
                    <Text style={{fontSize: 17 * horizontalScale}}>При отмене заказа менее чем за 3 часа до начала его
                        исполнения денежные средства возврату не
                        подлежат. Приносим свои извинения за доставленные неудобства.</Text>
                </View>
                <Button
                    title='Отменить'
                    variant='outlined'
                    color='primary'
                    style={{marginTop: 45 * verticalScale}}
                    onPress={async () => {
                        await dispatch(cancelOrder());
                        close()
                    }}
                    isLoading={isRemovingOrder}
                />
            </View>
        </DrawerGrid>
    )
}

const DrawerController = forwardRef(({type, closeDrawer, isHistory}, ref) => {

    if (type === 'info' || type === 'infoShort')
        return <InfoCard isHistory={isHistory}/>
    if (type === 'help')
        return <HelpCard/>
    if (type === "cancelWithRefund")
        return <CancelWithRefund close={closeDrawer}/>
    if (type === "cancelWithoutRefund")
        return <CancelWithoutRefund close={closeDrawer}/>
})

export default DrawerController
