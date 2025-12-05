import React, {useEffect, useMemo, useRef} from 'react';
import {LayoutChangeEvent, StyleSheet, View} from 'react-native';
import Animated, {useAnimatedStyle, useSharedValue, withTiming} from 'react-native-reanimated';
import CustomTabBarButton from "@/components/TabBar/CustomTabBarButton";
import {useTheme} from "@react-navigation/native";

type TabBarProps = {
    state: any;
    descriptors: any;
    navigation: any;
};

type ItemLayout = { x: number; width: number };

const CustomTabBar: React.FC<TabBarProps> = ({state, descriptors, navigation}) => {
    const {colors} = useTheme();
    const pillX = useSharedValue(0);
    const pillW = useSharedValue(0);
    const layoutsRef = useRef<Record<number, ItemLayout>>({});

    const focusedIndex = state.index;

    const animatedPillStyle = useAnimatedStyle(() => ({
        transform: [{translateX: pillX.value}],
        width: pillW.value,
    }));

    const setPillToIndex = (index: number) => {
        const layout = layoutsRef.current[index];
        if (!layout) return;
        pillX.value = withTiming(layout.x, {duration: 350});
        pillW.value = withTiming(layout.width, {duration: 350});
    };

    useEffect(() => {
        setPillToIndex(focusedIndex);
    }, [focusedIndex]);

    const onItemLayout = (index: number) => (e: LayoutChangeEvent) => {
        const {x, width} = e.nativeEvent.layout;
        layoutsRef.current[index] = {x, width};
        if (index === focusedIndex) {
            pillX.value = x;
            pillW.value = width;
        }
    };

    const items = useMemo(() => state.routes.map((route: any, index: number) => {
        const {options} = descriptors[route.key];
        const label =
            options.tabBarLabel !== undefined
                ? options.tabBarLabel
                : options.title !== undefined
                    ? options.title
                    : route.name;

        const isFocused = focusedIndex === index;

        const onPress = () => {
            const event = navigation.emit({
                type: 'tabPress',
                target: route.key,
                canPreventDefault: true,
            });
            if (!isFocused && !event.defaultPrevented) {
                navigation.navigate(route.name);
            }
        };

        return <CustomTabBarButton onPress={onPress} routeName={route.name} key={route.key} hitSlop={8}
                                   onLayout={onItemLayout(index)} index={index} isFocused={isFocused} label={label}
                                   color={isFocused ? colors.primary : colors.text}/>
    }), [state.routes, descriptors, navigation, focusedIndex]);

    return (
        <View style={styles.wrapper}>
            <View style={styles.bar}>
                <Animated.View style={[styles.pill, animatedPillStyle]}/>
                {items}
            </View>
        </View>
    );
};

export default CustomTabBar;

const styles = StyleSheet.create({
    wrapper: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    bar: {
        height: 60,
        bottom: 25,
        marginHorizontal: 20,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        columnGap: 10,
        backgroundColor: 'rgba(67,113,214,0.4)',
        borderRadius: 30,
        padding: 4,
        width: 218
    },
    pill: {
        position: 'absolute',
        left: 0,
        height: '100%',
        backgroundColor: '#809edc',
        borderRadius: 24,
    },
});