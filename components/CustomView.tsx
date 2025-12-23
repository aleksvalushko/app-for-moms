import {StyleProp, View, ViewStyle} from 'react-native';
import React, {ReactNode} from "react";

type PROPS = {
    children: ReactNode;
    className?: string;
    style?: StyleProp<ViewStyle> | undefined;
}

const CustomView: React.FC<PROPS> = ({children, className = '', style = {}}) => {
    return <View className={className} style={style}>{children}</View>;
}

export default CustomView;