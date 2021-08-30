import React, {useMemo, useState, Fragment, useEffect} from "react";
import {View, StyleSheet, Text} from "react-native";
import useScaleFactor from "src/Hooks/useScaleFactor";
import {DrawerGrid} from "src/Components/Layout/DrawerPadding";
import TextInput from "src/Components/Common/TextInput";
import Button from "src/Components/Common/Button";
import {useDispatch, useSelector} from "react-redux";
import Question from "src/Assets/Icons/Question";
import Carousel from "react-native-snap-carousel";
import Checkbox from 'src/Components/Common/Checkbox'
import SwipeHint from "src/Components/Common/SwipeHint";
import Axios from "src/Axios";
import {
    handleAdditionalServiceChange,
    resetAdditionalProducts,
    setCalculatedCleaningPrice, setCurrentServiceASAP,
    setPropertyArea
} from "src/Slices/payment";
import {capitalizeFirstLetter} from "src/Utils/misc";
import {debounced} from "src/Utils/debounce";
import {parseEstimatedCompletionTime} from "src/Utils/date_utils";


export default function ({navigation}) {
    const {verticalScale, horizontalScale} = useScaleFactor();
    const {
        currentService,
        additionalServices,
        chosenAdditionalProducts,
        propertyArea,
        currentPartner
    } = useSelector(state => state.payment);
    const dispatch = useDispatch();
    const [isFetchingPriceData, setFetchingPriceData] = useState(false);
    const [price, setPrice] = useState(0);
    const [areaText, setAreaText] = useState(String(propertyArea))
    const [isError, setError] = useState(false);
    const [errorText, setErrorText] = useState("")

    // todo: MOS-: refactor this component for each type of cards
    // todo: use BuyCardRendererController

    useEffect(() => {
        (async function () {
            if (areaText && currentPartner.partner_render_type === "cleaning") {
                try {
                    setFetchingPriceData(true);
                    const response = await Axios.get(`/orders/cleaning/calculate?square=${areaText}&cleaning_type=${currentService.name_of_svc}`);
                    setFetchingPriceData(false);
                    dispatch(setCalculatedCleaningPrice(response.data.total_price));
                    setPrice(response.data.total_price);
                } catch (e) {
                    setFetchingPriceData(false);
                    dispatch(setCalculatedCleaningPrice(0));
                    setPrice(0);
                }
            }
        })()
    }, [currentService.name_of_svc_ru]) // make component update on service change

    const additionalPrice = chosenAdditionalProducts.reduce((acc, curr) => {
        return acc + curr.price;
    }, 0);

    const fetchPrice = useMemo(() =>
        debounced(async (price, serviceName) => {
            if (!(price === "" || price < 1)) {
                try {
                    setFetchingPriceData(true);
                    const response = await Axios.get(`/orders/cleaning/calculate?square=${price}&cleaning_type=${serviceName}`);
                    setFetchingPriceData(false);
                    dispatch(setCalculatedCleaningPrice(response.data.total_price));
                    setPrice(response.data.total_price);
                } catch (e) {
                    dispatch(setCalculatedCleaningPrice(0));
                    setPrice(0);
                }
            } else {
                setPrice(0);
                dispatch(setCalculatedCleaningPrice(0));
            }
        }, 1300), [])


    const handleTextChange = async text => {
        setError(false);
        if (text[0] === "0" || text === "") {
            setPrice(0)
            setAreaText("");
            setErrorText("Цена не может начинаться с 0")
        } else if (!(text[text.length - 1] >= '0' && text[text.length - 1] <= '9') && text.length > 0) {

            setErrorText("Пожалуйста, введите число");
        } else {
            setAreaText(text);
            setErrorText("");
            fetchPrice(text, currentService.name_of_svc)
        }
    }

    // split towersListHardcode into block of 3 items
    const renderData = useMemo(() => {
        return additionalServices.reduce((resultArray, item, index) => {
            if (!item?.category_id.some(service => service === currentService.id))
                return resultArray;
            const chunkIndex = Math.floor(index / 3)
            if (!resultArray[chunkIndex])
                resultArray[chunkIndex] = []
            resultArray[chunkIndex].push({...item, name_of_svc_ru: capitalizeFirstLetter(item.name_of_svc_ru)})
            return resultArray
        }, [])
    }, additionalServices, chosenAdditionalProducts)


    const styles = StyleSheet.create({
        card: {
            height: renderData.length > 0 ? 766 * verticalScale : 453 * verticalScale,
            borderTopStartRadius: 20,
            borderTopEndRadius: 20,
            backgroundColor: '#fff',
            width: '100%'
        },
        header: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: 62 * verticalScale
        },
        headerText: {
            fontSize: 22 * horizontalScale,
            lineHeight: 28 * verticalScale,
            fontFamily: 'bold',
        },
        descriptionText: {
            fontSize: 17 * horizontalScale,
            lineHeight: 24 * verticalScale,
            fontFamily: 'regular'
        },
        br: {
            height: 1,
            width: '100%',
            marginTop: 18 * verticalScale,
            marginBottom: 10 * verticalScale,
            backgroundColor: "#000",
        },
        timeDeliveryText: {
            fontSize: 17 * horizontalScale,
            lineHeight: 24 * verticalScale,
            fontFamily: 'regular',
            color: "#000",
            opacity: 0.5
        },
        pricingText: {
            fontSize: 24 * horizontalScale,
            lineHeight: 30 * verticalScale,
            color: '#000',
            fontFamily: 'regular'
        },
        additionalText: {
            fontSize: 17 * horizontalScale,
            lineHeight: 22 * verticalScale,
            fontFamily: 'regular'
        },
        carouselContainer: {
            marginTop: 23 * verticalScale,
            paddingLeft: '7.2%'
        }
    })

    useEffect(() => {
        return () => {
            // clear chosen additional products
            dispatch(resetAdditionalProducts());
            // prevent appearing ASAP as true for services without asap functionality
            dispatch(setCurrentServiceASAP(false));
        }
    }, [])


    // todo: move styles to external objcets
    const renderItem = (data) => {
        return (
            <View removeClippedSubviews={false}
                  style={{paddingTop: 20 * verticalScale, marginBottom: 25 * verticalScale}}>
                {data.item.map((item, index) =>
                    <Checkbox
                        isLast={index === data.item.length - 1}
                        withBorder={false}
                        checked={chosenAdditionalProducts.map(item => item.id).includes(item.id)}
                        onChange={nextValue => dispatch(handleAdditionalServiceChange(item, nextValue))}
                        primaryText={item.name_of_svc_ru}
                        secondaryText={`${item.price.toFixed(0)} ₽`}
                        key={index}
                    />
                )}
            </View>
        )
    }

    const getPricingText = () => {
        if (areaText === "")
            return '0 ₽'
        return (currentPartner.partner_render_type === "regular" ? Number(currentService.price.toFixed()) + Number(additionalPrice.toFixed()) : price + additionalPrice) + ' ₽'
    }

    const getTitleText = () => {
        if ((areaText && areaText !== '0' && currentPartner.partner_render_type === "cleaning"))
            return `${(price ? price + additionalPrice + '₽ | ' : "")}Оформить`;
        if (currentPartner.partner_render_type !== "cleaning")
            return `${Number(currentService.price.toFixed()) ? Number(currentService.price.toFixed()) + Number(additionalPrice.toFixed()) + '₽ | ' : ""}Оформить`
        if (((!areaText || areaText === "0") && currentPartner.partner_render_type === "cleaning"))
            return "Укажите квадратуру"
    }

    const getTimeText = () => {
        if (currentPartner.category === 'delivery')
            return `Время доставки ~ ${parseEstimatedCompletionTime(currentService.time_of_delivery)}`
        return `Время оказания услуги ~ ${parseEstimatedCompletionTime(currentService.time_required)}`
    }

    return (
        <Fragment>
            <View style={styles.card}>
                <DrawerGrid>
                    <View style={styles.header}>
                        <Text style={styles.headerText}>{currentService.name_of_svc_ru}</Text>
                        {(currentService.is_main && currentService.what_includes_info) &&
                        <Question onPress={() => navigation.navigate('ProductDetails')}/>
                        }
                    </View>
                    <View style={{marginTop: 18 * verticalScale, height: 96 * verticalScale}}>
                        <Text style={styles.descriptionText}>
                            {currentService.price_info ? currentService.price_info.description : currentService.description_of_svc}
                        </Text>
                    </View>
                    <View style={styles.br}/>
                    <View>
                        <Text style={styles.timeDeliveryText}>
                            {getTimeText()}
                        </Text>
                    </View>
                    {renderData.length > 0 ? <View style={{marginTop: 23 * verticalScale, marginBottom: 23 * verticalScale}}>
                        <Text style={styles.pricingText}>
                            {getPricingText()}
                        </Text>
                    </View> :
                        <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 25 * verticalScale, alignItems: 'center'}}>
                            <Text style={{fontSize: 17 * horizontalScale}}>
                                Стоимость:
                            </Text>
                            <Text style={styles.pricingText}>
                                {getPricingText()}
                            </Text>
                        </View>
                    }
                    {renderData.length > 0 && <TextInput
                        title={currentPartner.partner_render_type !== "cleaning" ?
                            /*todo: fix this hardcode later*/
                            (currentPartner.id === 9 ? "Время оказания услуги" : "Время оказания услуги") : "Ваша квадратура"}
                        defaultText='0'
                        withContainer={false}
                        value={currentPartner.partner_render_type !== "cleaning" ? (/*currentPartner.id === 9 ? '24 часа' : */parseEstimatedCompletionTime(
                            currentService.service_time || currentService.time_required)) :
                            areaText
                        }
                        onChange={handleTextChange}
                        disabled={currentPartner.partner_render_type !== "cleaning"}
                        errorMessage={errorText}
                        keyboardType='default'
                    />}
                </DrawerGrid>
                {renderData.length > 0 && <View style={styles.carouselContainer}>
                    <Text style={styles.additionalText}>Дополнительно</Text>
                    <Carousel
                        data={renderData}
                        renderItem={renderItem}
                        sliderWidth={361 * verticalScale}
                        itemWidth={355 * verticalScale}
                        activeSlideAlignment='start'
                        removeClippedSubviews={false}
                    />
                </View>}
                <DrawerGrid flex>
                    {renderData.length > 0 &&
                    <View style={{marginTop: 17 * verticalScale}}>
                        <SwipeHint/>
                    </View>}
                    <Button
                        title={getTitleText()}
                        variant='outlined'
                        isError={isError}
                        style={{
                            position: 'absolute',
                            left: 0,
                            bottom: 26 * verticalScale
                        }}
                        isLoading={isFetchingPriceData}
                        onPress={() => {
                            if (currentPartner.partner_render_type !== "cleaning")
                                navigation.navigate('Payment');
                            else if (!isError && price && areaText) {
                                dispatch(setPropertyArea(Number(areaText)))
                                navigation.navigate('Payment');
                            } else
                                setError(true);
                        }}
                    />
                </DrawerGrid>
            </View>
        </Fragment>
    )
}
