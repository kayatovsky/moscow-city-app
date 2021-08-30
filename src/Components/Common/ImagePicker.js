import React, {useEffect, useState} from 'react';
import {Image, View, Platform, TouchableOpacity, StyleSheet} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import useScaleFactor from "src/Hooks/useScaleFactor";
import {formRadius} from "src/Utils/styles";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function () {
    const [uri, setURI] = useState("")
    const {horizontalScale} = useScaleFactor();

    useEffect(() => {
        AsyncStorage.getItem('AVATAR_URI').then(res => {
            if (res)
                setURI(JSON.parse(res));
        })
    }, [uri])


    const styles = StyleSheet.create({
        avatarPlaceholder: {
            width: "100%",
            height: "100%",
            alignItems: "center",
            justifyContent: "center",
        },
    })

    const askPermission = async () => {
        if (Platform.OS !== 'web') {
            const {status} = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted')
                alert('Sorry, we need camera roll permissions to make this work!');
        }
    }

    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [3, 3],
            quality: 1,
        });
        if (!result.cancelled) {
            setURI(result.uri);
            await AsyncStorage.setItem('AVATAR_URI', JSON.stringify(result.uri))
        }
    };

    return (
        <TouchableOpacity
            onPress={async () => {
                await askPermission();
                await pickImage();
            }}
            style={styles.avatarPlaceholder}
        >
            {uri ?
                <Image
                    style={{
                        width: "100%",
                        height: "100%",
                        ...formRadius(20),
                    }}
                    source={{uri}}
                    defaultSource={require("src/Assets/Images/placeholder.png")}
                /> :
                <View style={styles.avatarPlaceholder}>
                    <Image
                        style={{
                            width: "100%",
                            height: "100%",
                            ...formRadius(20),
                        }}
                        source={require("src/Assets/Images/placeholder.png")}
                    />
                </View>}
        </TouchableOpacity>
    )
}
