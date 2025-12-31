import {Pressable, StyleProp, StyleSheet, TextStyle, ViewStyle, Text} from 'react-native';
import React from "react";
import Animated, {useSharedValue, useAnimatedStyle, withSpring} from 'react-native-reanimated';
import {useAvailableIcons} from "@/hooks/useAvailableIcons";
import {COLORS} from "@/constants/colors";
import {useColorScheme} from "nativewind";

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
    rounded?: boolean;
}

const CustomPressable = ({
                             title,
                             className,
                             textClassName,
                             pressFunction,
                             disabled,
                             style,
                             iconName,
                             size = 24,
                             iconColor = 'white',
                             isLeftIcon,
                             rounded
                         }: PROPS) => {
    const {colorScheme} = useColorScheme();
    const scale = useSharedValue(1);

    const animatedContainer = useAnimatedStyle(() => ({
        transform: [{scale: scale.value}],
    }));

    const handlePressIn = () => {
        scale.value = withSpring(iconName ? 1.35 : 1.2, {stiffness: 320, damping: 250});
    };

    const handlePressOut = (e: any) => {
        scale.value = withSpring(1, {stiffness: 320, damping: 250});
        pressFunction(e);
        if (!rounded) return;
    };

    const {Icon} = useAvailableIcons(iconName, size, iconColor);

    return (
        <Animated.View style={[animatedContainer, {...style}]}>
            <Pressable onPressIn={handlePressIn} onPressOut={handlePressOut} className={className} disabled={disabled}
                       style={[{...style}, styles.button, rounded && styles.roundedButton]}>
                {isLeftIcon && <Icon/>}
                {title && !rounded && <Text className={textClassName} style={disabled && {color: COLORS[colorScheme].colors.disabledPressable}}>{title}</Text>}
                {!isLeftIcon && <Icon/>}
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
    roundedButton: {
        width: 50,
        height: 50,
        borderRadius: 50,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
});