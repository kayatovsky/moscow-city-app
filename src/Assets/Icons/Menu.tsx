import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

function MenuIcon(props: SvgProps) {
    return (
        <Svg width={21} height={5} viewBox="0 0 21 5" fill="none" {...props}>
            <Path
                d="M18.375 5c-1.45 0-2.625-1.12-2.625-2.5S16.925 0 18.375 0 21 1.12 21 2.5c0 .663-.277 1.299-.769 1.768A2.693 2.693 0 0118.375 5zM10.5 5C9.05 5 7.875 3.88 7.875 2.5S9.05 0 10.5 0s2.625 1.12 2.625 2.5c0 .663-.277 1.299-.769 1.768A2.693 2.693 0 0110.5 5zM2.625 5C1.175 5 0 3.88 0 2.5S1.175 0 2.625 0 5.25 1.12 5.25 2.5c0 .663-.277 1.299-.769 1.768A2.693 2.693 0 012.625 5z"
                fill="#000"
            />
        </Svg>
    );
}

export default MenuIcon;
