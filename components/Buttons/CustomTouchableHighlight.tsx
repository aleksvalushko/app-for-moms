import {StyleProp, StyleSheet, TextStyle, TouchableHighlight, ViewStyle} from 'react-native';
import React from "react";
import CustomText from "@/components/CustomText";
import {useAppColors} from "@/hooks/useAppColors";

type Props = {
    name: string;
    className?: string;
    pressFunction: () => void;
    variant?: ButtonVariant;
    disabled?: boolean;
    buttonStyle?: StyleProp<ViewStyle>;
    textStyle?: StyleProp<TextStyle>;
};

type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'neutral' | 'outline';

const CustomTouchableHighlight = ({
                                      name,
                                      className,
                                      pressFunction,
                                      variant = 'neutral',
                                      disabled,
                                      buttonStyle,
                                      textStyle
                                  }: Props) => {

    const {
        mergedTextStyle,
        mergedButtonStyle,
        underlayColor
    } = useAppColors(variant, disabled, styles, buttonStyle, textStyle);

    return (
        <TouchableHighlight
            onPress={pressFunction}
            disabled={disabled}
            className={className}
            style={mergedButtonStyle}
            underlayColor={underlayColor}
        >
                <CustomText style={mergedTextStyle}>{name}</CustomText>
        </TouchableHighlight>
    );
}

export default CustomTouchableHighlight;

const styles = StyleSheet.create({
    outlinedButton: {
        borderRadius: 8,
        height: 50,
        padding: 10,
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#545457'
    },
    button: {
        borderRadius: 8,
        height: 50,
        padding: 10,
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        fontSize: 20,
    }
});