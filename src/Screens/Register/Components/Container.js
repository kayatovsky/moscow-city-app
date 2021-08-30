import React from 'react'
import {StatusBar} from "expo-status-bar";
import Heading from "src/Screens/Register/Components/Heading";
import Button from "src/Components/Common/Button";
import {View, StyleSheet, KeyboardAvoidingView} from "react-native";
import useScaleFactor from "../../../Hooks/useScaleFactor";
import Back from 'src/Assets/Icons/Navigation/Back';
import {DismissKeyboard} from "../../../Helpers/DismissKeyboard";

export function AuthTemplate({
                                 navigation, children, title, isAbleToMoveBack = true,
                                 buttonText, buttonAction = () => {
    }, isButtonDisabled, isButtonLoading=false, withMargin=true, iconComponent
                             }) {
    const {verticalScale} = useScaleFactor()

    const styles = StyleSheet.create({
        container: {
            paddingLeft: '14.285714285%',
            paddingRight: '14.285714285%',
            flex: 1
        },
        header: {
            paddingTop: 54 * verticalScale
        },
        content: {
            paddingTop: withMargin ? 44 * verticalScale : 18 * verticalScale,
            justifyContent: 'space-between',
            flex: 1
        }
    })

    return (
        <KeyboardAvoidingView style={{flex: 1}} behavior='height'>
            <DismissKeyboard>
                <View style={styles.container}>
                    <StatusBar style='auto'/>
                    <View style={{height: 95 * verticalScale, justifyContent: 'flex-end'}}>
                        {isAbleToMoveBack &&
                        <Back onPress={() => navigation.goBack()}/>
                        }
                    </View>
                    <View style={styles.header}>
                        <Heading title={title}/>
                    </View>
                    <View style={styles.content}>
                        <View>
                            {children}
                        </View>
                        <View>
                            {iconComponent}
                            <Button
                                title={buttonText}
                                onPress={buttonAction}
                                color='secondary'
                                variant='outlined'
                                disabled={isButtonDisabled}
                                style={{marginBottom: 50 * verticalScale}}
                                isLoading={isButtonLoading}
                            />
                        </View>
                    </View>
                </View>
            </DismissKeyboard>
        </KeyboardAvoidingView>
    )
}
