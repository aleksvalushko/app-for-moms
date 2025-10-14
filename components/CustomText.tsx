import {StyleProp, Text, TextStyle} from 'react-native';
import React, {ReactNode} from "react";

type PROPS = {
    children: ReactNode;
    className?: string;
    style?: StyleProp<TextStyle> | undefined;
}

const CustomText = ({children, className, style}: PROPS) => {
    return <Text className={className} style={style}>{children}</Text>;
}

export default CustomText;