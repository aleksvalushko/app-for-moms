import {StyleProp, StyleSheet, TextStyle, TouchableHighlight, View, ViewStyle} from 'react-native';
import React from "react";
import CustomText from "@/components/CustomText";
import {useAvailableIcons} from "@/hooks/useAvailableIcons";

type Props = {
    name?: string;
    iconName?: string;
    color?: string;
    className?: string;
    textClassName?: string;
    underlayColor?: string;
    pressFunction: (props: any) => void;
    disabled?: boolean;
    isLeftIcon?: boolean;
    size?: number;
    style?: StyleProp<ViewStyle> | undefined;
    textStyle?: StyleProp<TextStyle>;
};

const CustomTouchableHighlight = ({
                                      name,
                                      iconName,
                                      color = 'white',
                                      className,
                                      textClassName,
                                      underlayColor = 'rgba(0, 0, 0, 0.1)',
                                      pressFunction,
                                      disabled,
                                      isLeftIcon = false,
                                      style={},
                                      size = 24,
                                      textStyle
                                  }: Props) => {

    const {Icon} = useAvailableIcons(iconName, size, color);

    return (
        <TouchableHighlight
            onPress={pressFunction}
            disabled={disabled}
            className={className}
            style={[styles.button, {...style}, disabled ? {opacity: 0.5} : {opacity: 1}]}
            underlayColor={underlayColor}
        >
            <View className='flex-row gap-x-[5px] max-w-full items-center' >
                {isLeftIcon && <Icon/>}
                <CustomText className={textClassName} style={textStyle}>{name}</CustomText>
                {!isLeftIcon && <Icon/>}
            </View>
        </TouchableHighlight>
    );
}

export default CustomTouchableHighlight;

const styles = StyleSheet.create({
    button: {
        borderRadius: 8,
        height: 50,
        padding: 10,
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
});