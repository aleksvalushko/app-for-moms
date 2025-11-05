import {useColorScheme, ViewStyle} from "react-native";
import {shadeColor} from "@/helpers";

export const useAppColors = (variant, disabled, styles, buttonStyle, textStyle) => {
    const colorScheme = useColorScheme();
    const isDarkMode = colorScheme === 'dark';

    const paletteForButtons = {
        primary:    { light: '#4371d6', dark: '#5b86e5' },
        secondary:  { light: '#858791', dark: '#969fae' },
        danger:     { light: '#e53935', dark: '#ef5350' },
        neutral:    { light: '#e5e7eb', dark: '#374151' },
        outline:    { light: 'transparent', dark: 'transparent' },
    } as const;

    const backgroundColorBase = paletteForButtons[variant][isDarkMode ? 'dark' : 'light'];
    const isOutline = variant === 'outline';
    const isButtonWithBackground = variant !== 'outline';

    const baseButtonStyle: ViewStyle = {
        backgroundColor: isOutline ? 'transparent' : backgroundColorBase,
        borderColor: isOutline ? (isDarkMode ? '#9ca3af' : '#6b7280') : 'transparent',
        borderWidth: isOutline ? 1 : 0,
        opacity: disabled ? 0.6 : 1,
    };

    const baseTextColor = isOutline
        ? (isDarkMode ? '#e5e7eb' : '#111827')
        : (isButtonWithBackground ? '#fff': '#000');

    const mergedButtonStyle = Object.assign({}, ...[styles.button, baseButtonStyle, buttonStyle].filter(elem => elem));
    const mergedTextStyle = Object.assign({}, ...[styles.buttonText, { color: baseTextColor }, textStyle].filter(elem => elem));

    const underlayColor = isOutline
        ? (isDarkMode ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)')
        : shadeColor(backgroundColorBase, isDarkMode ? -10 : -8);

  return { mergedButtonStyle, mergedTextStyle, underlayColor };
};