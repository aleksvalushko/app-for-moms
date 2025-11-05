import {Pressable, StyleProp, StyleSheet, TextStyle, useColorScheme, ViewStyle} from 'react-native';
import React from "react";
import CustomText from "@/components/CustomText";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

type PROPS = {
    title: string;
    icon?: string;
    className?: string;
    pressFunction: (prop: any) => void;
    disabled?: boolean;
    size?: number;
    style?: StyleProp<TextStyle> | StyleProp<ViewStyle> | undefined;
}

const CustomPressable = ({title, className, pressFunction, style, icon, size = 24}: PROPS) => {
    const colorScheme = useColorScheme();
    const isDarkMode = colorScheme === 'dark';

    const iconColor = style && style['color'] ? style['color'] : isDarkMode ? '#FFF' : '#4371d6';
    const textFontSize = style && style['fontSize'] ? style['fontSize'] : 20;

    return <Pressable onPress={pressFunction} className={className} style={[{...style}, styles.button]}>
        {icon && <MaterialIcons name={icon} size={size} color={iconColor} />}
        <CustomText style={{fontSize: textFontSize}}>{title}</CustomText>
    </Pressable>
}

export default CustomPressable;

const styles = StyleSheet.create({
    button: {
        borderRadius: 5,
        padding: 10,
        display: 'flex',
        flexDirection: 'row',
        columnGap: 10,
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
});