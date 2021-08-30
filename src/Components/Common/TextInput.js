import React from 'react'
import {View, Text, TextInput, StyleSheet} from "react-native";
import useScaleFactor from "src/Hooks/useScaleFactor";

export default function ({
                             title,
                             defaultText = "",
                             defaultValue = "",
                             multiline = false,
                             withContainer = true,
                             disabled,
                             isError,
                             errorMessage = 'Ошибка!',
                             keyboardType = "default",
                             onChange = () => {
                             },
                             value,
                             style,
                             isTextError,
                             errorWithMargins=true,
                             ...rest
                         }) {
    const {verticalScale, horizontalScale} = useScaleFactor();
    const styles = StyleSheet.create({
        container: {
            width: "100%",
            marginTop: withContainer ? 41 * verticalScale : 0,
            marginBottom: withContainer ? 10 * verticalScale : 0,
            ...style
        },
        titleContainer: {
            paddingBottom: multiline ? 55 * horizontalScale : 5 * horizontalScale
        },
        title: {
            color: "#000",
            opacity: 0.4,
            fontSize: 15 * horizontalScale,
            fontWeight: "500",
            lineHeight: 18 * horizontalScale
        },
        input: {
            borderBottomColor: "#000",
            borderBottomWidth: 1,
            fontSize: 17 * horizontalScale,
            lineHeight: 21 * horizontalScale,
            fontWeight: "400",
            paddingBottom: 10 * verticalScale,
            paddingTop: 3 * verticalScale,
            color: isTextError ? "#FF1717" : "#000"
        },
        titleContainerError: {
            alignItems: 'center',
            textAlignVertical: 'top',
            marginTop: errorWithMargins && 20 * verticalScale,
        },
        titleError: {
            color: "#FB4242",
            fontSize: 15 * horizontalScale,
            fontWeight: "500",
            lineHeight: 18 * horizontalScale,
        },
    })

    return (
        <View style={styles.container}>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>
                    {title}
                </Text>
            </View>
            <TextInput
                placeholder={defaultText}
                defaultValue={defaultValue}
                onChangeText={text => onChange(text)}
                style={styles.input}
                multiline={multiline}
                editable={!disabled}
                keyboardType={keyboardType}
                value={value}
                {...rest}
            />
            {isError &&
            <View style={styles.titleContainerError}>
                <Text style={styles.titleError}>
                    {errorMessage}
                </Text>
            </View>
            }
        </View>
    )
}


