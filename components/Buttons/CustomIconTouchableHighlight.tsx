import {StyleProp, StyleSheet, TextStyle, TouchableHighlight} from 'react-native';
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

const CustomIconTouchableHighlight = ({
                                          name,
                                          color = 'white',
                                          className,
                                          pressFunction,
                                          disabled,
                                          size = 24,
                                          style
                                      }: PROPS) => {
    return <TouchableHighlight onPress={pressFunction} disabled={disabled}
                               className={className} style={[{...style}, styles.dialogButton]}>
        <AntDesign name={name} size={size} color={color}/>
    </TouchableHighlight>;
}

export default CustomIconTouchableHighlight;

const styles = StyleSheet.create({
    dialogButton: {
        borderRadius: 5,
        padding: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
});