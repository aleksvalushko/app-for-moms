import {LayoutChangeEvent, StyleSheet} from 'react-native';
import React, {useEffect} from "react";
import {PlatformPressable} from "@react-navigation/elements";
import CustomText from "@/components/CustomText";
import {TAB_ICONS} from "@/constants/icons";
import Animated, {interpolate, useAnimatedStyle, useSharedValue, withSpring} from "react-native-reanimated";

type Props = {
    onPress: () => void;
    routeName: string;
    key: string;
    isFocused: boolean;
    label: string;
    color: string;
    hitSlop: number;
    index: number;
    onLayout: (e: LayoutChangeEvent) => void;
}

const CustomTabBarButton: React.FC<Props> = ({onPress, routeName, isFocused, label, color,  onLayout, hitSlop}) => {
    const scale = useSharedValue(0);

    const animatedIconStyles = useAnimatedStyle(() => {
        const scaleValue = interpolate(scale.value, [0, 1], [0.8, 1.2])

        return {
            transform: [{scale: scaleValue}],
        }
    });

    useEffect(() => {
        scale.value = withSpring(isFocused ? 1 : 0, {duration: 350});
    }, [scale, isFocused]);

    return (
        <PlatformPressable
            onPress={onPress}
            style={[styles.tabBarItem]}
            key={routeName}
            onLayout={onLayout}
            hitSlop={hitSlop}
        >
            <Animated.View style={[animatedIconStyles]}>
                {
                    TAB_ICONS[routeName] && TAB_ICONS[routeName]({color})
                }
            </Animated.View>
            <CustomText style={{color}}>
                {label}
            </CustomText>
        </PlatformPressable>
    );
}

export default CustomTabBarButton;

const styles = StyleSheet.create({
    tabBarItem: {
        height: 56,
        width: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 30
    },
});