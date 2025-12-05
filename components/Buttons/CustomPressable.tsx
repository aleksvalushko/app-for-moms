import {Pressable, StyleProp, StyleSheet, TextStyle, ViewStyle} from 'react-native';
import React from "react";
import CustomText from "@/components/CustomText";
import Animated, {useSharedValue, useAnimatedStyle, withSpring} from 'react-native-reanimated';
import {useAvailableIcons} from "@/hooks/useAvailableIcons";

type PROPS = {
    title?: string;
    iconName?: string;
    iconColor?: string;
    className?: string;
    textClassName?: string;
    pressFunction: (prop: any) => void;
    disabled?: boolean;
    size?: number;
    style?: StyleProp<TextStyle> | StyleProp<ViewStyle> | undefined;
    isLeftIcon?: boolean;
}

const CustomPressable = ({title, className, textClassName, pressFunction, style, iconName, size = 24, iconColor = 'white', isLeftIcon}: PROPS) => {
    const scale = useSharedValue(1);

    const animatedContainer = useAnimatedStyle(() => ({
        transform: [{scale: scale.value}],
    }));

    const handlePressIn = () => {
        scale.value = withSpring(iconName ? 2 : 1.2, {stiffness: 320, damping: 250});
    };

    const handlePressOut = (e: any) => {
        scale.value = withSpring(1, {stiffness: 320, damping: 250});
        pressFunction(e);
    };

    const { Icon } = useAvailableIcons(iconName, size, iconColor);

    return (
        <Animated.View style={[styles.button, animatedContainer, {...style}]}>
            <Pressable onPressIn={handlePressIn} onPressOut={handlePressOut} className={className}  style={[{...style}, styles.button]}>
                {isLeftIcon && <Icon />}
                {title && <CustomText className={textClassName}>{title}</CustomText>}
                {!isLeftIcon && <Icon />}
            </Pressable>
        </Animated.View>
    )
}

export default CustomPressable;

const styles = StyleSheet.create({
    button: {
        borderRadius: 5,
        padding: 5,
        display: 'flex',
        flexDirection: 'row',
        columnGap: 10,
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
});