import React, {useState} from 'react'
import {Animated, View, Image} from "react-native";

export default function ({source, style}) {
    const [thumbnailOpacity, setThumbnailOpacity] = useState(new Animated.Value(0));

    const onLoad = () => {
        Animated.timing(thumbnailOpacity,{
            toValue: 0,
            duration : 250
        }).start()

    }
    const onThumbnailLoad = () => {
        Animated.timing(thumbnailOpacity,{
            toValue: 1,
            duration: 250
        }).start();
    }
    return (
        <View
            width={style.width}
            height={style.height}
            backgroundColor={'#ffffff'}
        >
            <Animated.Image
                resizeMode = {'contain'}
                style = {[
                    {
                        position: 'absolute'
                    },
                    style
                ]}
                source = {source}
                onLoad = {onLoad}
            />
            <Animated.Image
                resizeMode={'contain'}
                style={[
                    {
                        opacity: thumbnailOpacity
                    },
                    style
                ]}
                source={thumbnail}
                onLoad={onThumbnailLoad}
            />
        </View>
    )
}

