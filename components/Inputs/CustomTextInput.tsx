import {KeyboardTypeOptions, StyleProp, StyleSheet, TextInput, TextStyle, useColorScheme, View} from 'react-native';
import React, {useEffect, useState} from "react";
import CustomIconTouchableOpacity from "@/components/Buttons/CustomIconTouchableOpacity";

type PROPS = {
    className?: string;
    placeholder?: string;
    placeholderTextColor?: string;
    keyboardType?: KeyboardTypeOptions;
    value: string;
    onChangeText: (value: string) => void;
    secureTextEntry?: boolean;
    autoFocus?: boolean;
    style?: StyleProp<TextStyle> | undefined;
}

const CustomTextInput: React.FC<PROPS> = ({
                                              className,
                                              placeholder,
                                              placeholderTextColor,
                                              keyboardType,
                                              value,
                                              onChangeText,
                                              secureTextEntry = false,
                                              autoFocus = false,
                                              style
                                          }) => {
    const colorScheme = useColorScheme();
    const isDarkMode = colorScheme === 'dark';

    const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);

    const textStyle = {
        color: style && style['color'] ? style['color'] : isDarkMode ? '#FFF' : '#000',
    };

    useEffect(() => {
        setIsPasswordVisible(secureTextEntry);
    }, []);

    return <View style={styles.container}>
        <TextInput style={[{...style}, styles.input, textStyle]} placeholder={placeholder}
                   placeholderTextColor={placeholderTextColor} keyboardType={keyboardType}
                   className={`${className} border-primary text-current`} autoFocus={autoFocus}
                   secureTextEntry={isPasswordVisible} value={value}
                   onChangeText={onChangeText}/>
        {
            value && secureTextEntry && isPasswordVisible &&
            <CustomIconTouchableOpacity name="eye" style={styles.showPasswordButton}
                                          pressFunction={() => setIsPasswordVisible(false)} size={22}
                                          color={textStyle.color}/>
        }
        {
            value && secureTextEntry && !isPasswordVisible &&
            <CustomIconTouchableOpacity name="eye-invisible" style={styles.showPasswordButton}
                                          pressFunction={() => setIsPasswordVisible(true)} size={22}
                                          color={textStyle.color}/>
        }
        {
            value && <CustomIconTouchableOpacity name="close-circle" style={styles.clearButton}
                                                   pressFunction={() => onChangeText('')} size={22}
                                                   color={textStyle.color}/>
        }
    </View>
}

export default CustomTextInput;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    input: {
        height: 60,
        borderWidth: 2,
        borderRadius: 8,
        marginVertical: 15,
        paddingHorizontal: 10,
        fontSize: 16,
        shadowColor: '#f8f8f8',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 4,
        position: 'relative',
    },
    showPasswordButton: {
        position: 'absolute',
        right: 30
    },
    clearButton: {
        position: 'absolute',
        right: 0
    },
});