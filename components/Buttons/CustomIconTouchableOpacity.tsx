import {StyleProp, StyleSheet, TextStyle, TouchableOpacity, View} from 'react-native';
import React from "react";
import AntDesign from "@expo/vector-icons/AntDesign";

type PROPS = {
    name: string;
    color?: string;
    className?: string;
    pressFunction: (prop: any) => void;
    disabled?: boolean;
    size?: number;
    style?: StyleProp<TextStyle> | undefined;
}

const CustomIconTouchableOpacity = ({name, color = 'white', className, pressFunction, disabled, size = 24, style}: PROPS) => {
    return <TouchableOpacity onPress={pressFunction} disabled={disabled}
                               className={className} style={[{...style}, styles.button]}>
        <View>
            <AntDesign name={name} size={size} color={color}/>
        </View>
    </TouchableOpacity>;
}

export default CustomIconTouchableOpacity;

const styles = StyleSheet.create({
    button: {
        borderRadius: 5,
        padding: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
});