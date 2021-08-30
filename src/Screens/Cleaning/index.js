import React, {useRef, Fragment, useState, useEffect} from 'react'
import {View, Text, StyleSheet} from "react-native";
import useScaleFactor from "src/Hooks/useScaleFactor";
import TextInput from 'src/Components/Common/TextInput';
import MenuItem from 'src/Components/Common/MenuItem'
import {useDispatch, useSelector} from "react-redux";
import {
    fetchServices,
    setCurrentService,
    closeDrawer,
    openBuyDrawer,
    openInfoDrawer,
    setImagesCardData,
} from "src/Slices/payment";
import {Modalize} from "react-native-modalize";
import {RenderContent} from "./Components/DrawerRenderer";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import TemplateAnimated from './Components/TemplateAnimated'

const SkeletonContainer = () => {
    const {verticalScale, horizontalScale} = useScaleFactor()
    const styles = StyleSheet.create({
        item: {
            height: 80 * verticalScale,
            width: 295 * horizontalScale,
            marginBottom: 27 * verticalScale,
            borderRadius: 23,
        },
    })

    return (
            <SkeletonPlaceholder
                highlightColor='#F2F8FC'
                backgroundColor='rgba(227,227,227, 0.65)'
            >
                {(new Array(5).fill(0).map((item, index) =>
                    <View key={index} style={styles.item}/>
                ))}
            </SkeletonPlaceholder>
    )
}


export default function ({navigation}) {
    const {verticalScale, horizontalScale} = useScaleFactor();
    const {
        currentPartner,
        mainServices,
        drawerType,
        isFetchingServices,
        currentPageData
    } = useSelector(state => state.payment);

    const [height, setHeight] = useState(366 * verticalScale);
    const ref = useRef(null);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchServices(currentPartner));
    }, [currentPartner.id])

    const styles = StyleSheet.create({
        listTitleContainer: {
            marginTop: 42 * verticalScale,
            marginBottom: 47 * verticalScale
        },
        listTitleText: {
            fontSize: 22 * horizontalScale,
            lineHeight: 28 * verticalScale,
            fontFamily: "regular"
        },
        card: {
            height: 535 * verticalScale,
            borderTopStartRadius: 20,
            borderTopEndRadius: 20,
            backgroundColor: '#fff',
            width: '100%'
        }
    })

    // todo: fix this, towersListHardcode is got from backend
    const {title} = currentPageData

    const closeBottomDrawer = async () => {
        dispatch(closeDrawer());
        setHeight(0)
    }
    const openBottomDrawer = (height) => {
        dispatch(openBuyDrawer());
        setHeight(height * verticalScale)
        ref.current.open()
    }
    const openInfo = () => {
        dispatch(openInfoDrawer());
        setHeight(366 * verticalScale)
        ref.current.open()
    }

    return (
        <Fragment>
            <TemplateAnimated
                primaryText={title}
                navigation={navigation}
                withScrollView
                withShoppingCart
                openDrawer={openInfo}
            >
                <View>
                    <TextInput
                        title='Время ожидания'
                        defaultValue='По запросу'
                        disabled
                        withContainer={false}
                    />
                    <View style={styles.listTitleContainer}>
                        <Text style={styles.listTitleText}>Услуги</Text>
                    </View>
                    <View>
                        {isFetchingServices ? <SkeletonContainer/> : mainServices.map((item, index) =>
                            <MenuItem
                                key={index}
                                withPaddings={true}
                                title={item.name_of_svc_ru}
                                navigation={navigation}
                                isNav={false}
                                isLast={index === mainServices.length - 1}
                                onPress={async () => {
                                    if (currentPartner.partner_render_type === "with_images") {
                                        await dispatch(setImagesCardData(item.name_of_svc_ru));
                                        openBottomDrawer();
                                    } else {
                                        const height = await dispatch(setCurrentService(item));
                                        openBottomDrawer(height);
                                    }
                                }}
                            />
                        )}
                    </View>
                </View>
            </TemplateAnimated>
            <Modalize
                ref={ref}
                modalHeight={height}
                customRenderer={
                    <RenderContent
                        navigation={navigation}
                        closeBottomDrawer={closeBottomDrawer}
                        currentPartner={currentPartner}
                        drawerType={drawerType}
                    />
                }
                withHandle={true}
            />
        </Fragment>
    )
}


