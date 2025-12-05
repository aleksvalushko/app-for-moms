import {StyleProp, StyleSheet, TouchableOpacity, View, ViewStyle} from 'react-native';
import React, {ReactNode} from "react";
import AntDesign from "@expo/vector-icons/AntDesign";

type PROPS = {
    iconName?: string;
    color?: string;
    className?: string;
    pressFunction: (props: any) => void;
    disabled?: boolean;
    size?: number;
    style?: StyleProp<ViewStyle> | undefined;
    children?: ReactNode;
}

const CustomTouchableOpacity = ({
                                    iconName,
                                    color = 'white',
                                    className,
                                    pressFunction,
                                    disabled,
                                    style,
                                    size = 24,
                                    children
                                }: PROPS) => {
    return <TouchableOpacity onPress={pressFunction} disabled={disabled}
                             className={className} style={{...style}}>
        <View style={styles.button}>
            {iconName && <AntDesign name={iconName} size={size} color={color}/>}
            {children}
        </View>
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