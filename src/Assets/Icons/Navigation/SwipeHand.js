import * as React from "react"
import Svg, {Path} from "react-native-svg"

export default function (props) {
    return (
        <Svg
            width={20}
            height={20}
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <Path
                d="M10.7374 2.66493C10.7164 2.65443 8.63591 1.66643 6.98041 1.54043C5.24041 1.40493 3.49691 2.32843 3.47891 2.33843L3.24341 1.89693C3.31941 1.85643 5.13341 0.900935 7.01841 1.04143C8.76791 1.17543 10.8644 2.17193 10.9529 2.21393L10.7374 2.66493Z"
                fill="black"/>
            <Path
                d="M8.97852 3.64839L8.75952 3.19889L10.4745 2.36289L9.36652 0.840387L9.77102 0.546387L11.2295 2.55039L8.97852 3.64839Z"
                fill="black"/>
            <Path
                d="M1.51164 4.9568L1.29614 4.5058C1.38464 4.4638 3.48114 3.4673 5.23114 3.3333C7.11014 3.1963 8.92964 4.1483 9.00564 4.1888L8.77014 4.6303C8.75264 4.6208 7.00364 3.6968 5.26914 3.8323C3.61364 3.9583 1.53264 4.9468 1.51164 4.9568Z"
                fill="black"/>
            <Path
                d="M3.27103 5.94038L1.01953 4.84238L2.47803 2.83838L2.88253 3.13238L1.77453 4.65488L3.48953 5.49088L3.27103 5.94038Z"
                fill="black"/>
            <Path
                d="M12.669 19.7188C12.0325 19.7188 11.387 19.6498 10.803 19.5198C9.80651 19.2978 7.71001 17.6983 7.26651 17.2388C6.86551 16.8233 5.79151 15.2283 5.63401 13.9308C5.56501 13.3658 5.99851 11.6823 6.52901 11.0833C6.63351 10.9658 6.74301 10.8868 6.85501 10.8478C6.83248 10.7963 6.80964 10.745 6.78651 10.6938C6.44151 9.9428 5.93051 9.0753 5.47951 8.3093C4.71601 7.0123 4.43151 6.4943 4.47951 6.1993C4.56001 5.6993 4.97001 5.1223 5.51601 5.0213L5.61251 5.0018C5.75327 4.96787 5.89725 4.9491 6.04201 4.9458C6.51851 4.9458 6.95501 5.2178 7.41651 5.8013C7.81601 6.3068 8.46301 7.7023 9.00751 8.9648C8.98251 8.6468 8.99201 8.3813 9.05901 8.2263C9.32901 7.5998 10.082 7.3533 10.3115 7.3388L10.368 7.3373C10.5135 7.3373 11.258 7.3738 11.603 8.0978C11.658 8.2138 11.7105 8.3388 11.759 8.4653C11.821 8.2503 11.909 8.0628 12.0345 7.9558C12.4205 7.6278 12.949 7.4578 13.3085 7.5588C13.695 7.6673 14.0205 8.0763 14.138 8.6028C14.1885 8.4888 14.2495 8.3963 14.3215 8.3423C14.671 8.0803 15.279 8.0523 15.664 8.3193C16.134 8.6453 17.215 10.5983 17.405 12.3063C17.5605 13.7103 17.736 16.2193 17.1565 17.2533C16.5545 18.3258 15.323 19.1588 14.4335 19.4783C14.0005 19.6328 13.374 19.7188 12.669 19.7188ZM7.03401 11.3288C6.70201 11.3618 6.05151 13.2218 6.13001 13.8693C6.27101 15.0333 7.27051 16.5223 7.62651 16.8913C8.05001 17.3303 10.055 18.8403 10.911 19.0308C11.4605 19.1533 12.0675 19.2183 12.6685 19.2183C13.308 19.2183 13.889 19.1408 14.263 19.0058C14.9355 18.7643 16.1435 18.0328 16.719 17.0063C17.093 16.3408 17.1615 14.6468 16.907 12.3603C16.7265 10.7313 15.673 8.9333 15.3785 8.7283C15.142 8.5648 14.748 8.6448 14.6205 8.7408C14.55 8.8213 14.4455 9.2923 14.405 9.7408L14.2795 11.1243L13.915 9.7838C13.915 9.7838 13.753 9.1888 13.651 8.7173C13.564 8.3188 13.342 8.0858 13.1725 8.0388C12.986 7.9858 12.6115 8.1193 12.358 8.3353C12.22 8.4528 12.1175 9.1318 12.113 9.6668L12.094 11.7453L11.6195 9.7213C11.6175 9.7123 11.419 8.8698 11.1515 8.3113C10.9355 7.8583 10.4605 7.8353 10.368 7.8353C10.2225 7.8453 9.69001 8.0243 9.51801 8.4228C9.39801 8.7023 9.67001 10.1608 9.99051 11.3513L9.51651 11.5073C9.50001 11.4638 7.75751 7.0363 7.02501 6.1098C6.55401 5.5138 6.23901 5.4448 6.04301 5.4448C5.93301 5.4448 5.82701 5.4668 5.71551 5.4903L5.60801 5.5118C5.32701 5.5638 5.03151 5.9223 4.97301 6.2788C4.97751 6.4698 5.49501 7.3488 5.91101 8.0553C6.36751 8.8313 6.88551 9.7108 7.24101 10.4843C7.33151 10.6808 7.41551 10.8853 7.49301 11.0943L7.49401 11.0978C8.03651 11.8453 8.30651 14.3038 8.33601 14.5863L7.83951 14.6438C7.83751 14.6263 7.60851 12.8753 7.05351 11.3473C7.04744 11.3407 7.04092 11.3345 7.03401 11.3288Z"
                fill="black"/>
        </Svg>
    )
}