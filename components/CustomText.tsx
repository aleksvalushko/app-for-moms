import {StyleProp, Text, TextStyle, useColorScheme} from 'react-native';
import React, {ReactNode} from "react";

type PROPS = {
    children: ReactNode;
    className?: string;
    style?: StyleProp<TextStyle> | undefined;
}

const CustomText: React.FC<PROPS> = ({children, className, style}) => {
    const colorScheme = useColorScheme();
    const isDarkMode = colorScheme === 'dark';

    const textStyle = {
        color: style && style['color'] ? style['color'] : isDarkMode ? '#FFF' : '#000',
    };

    return <Text className={className} style={[{...style}, textStyle]}>{children}</Text>;
}

export default CustomText;