import {StyleProp, StyleSheet, TouchableOpacity, ViewStyle} from 'react-native';
import React, {ReactNode} from "react";

type PROPS = {
    className?: string;
    pressFunction: () => void;
    disabled?: boolean;
    style?: StyleProp<ViewStyle> | undefined;
    children: ReactNode;
}

const CustomTouchableOpacity = ({className, pressFunction, disabled, style, children}: PROPS) => {
    return <TouchableOpacity onPress={pressFunction} disabled={disabled}
                               className={className} style={[styles.button, {...style}]}>
        {children}
    </TouchableOpacity>;
}

export default CustomTouchableOpacity;

const styles = StyleSheet.create({
    button: {
        borderRadius: 5,
        padding: 10,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
});