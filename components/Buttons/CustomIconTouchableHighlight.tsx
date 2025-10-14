import {StyleSheet, TouchableHighlight, View} from 'react-native';
import React from "react";
import AntDesign from "@expo/vector-icons/AntDesign";

type PROPS = {
    name: string;
    color?: string;
    className: string;
    pressFunction: () => void;
    disabled?: boolean;
}

const CustomIconTouchableHighlight = ({name, color = 'white', className, pressFunction, disabled}: PROPS) => {
    return <TouchableHighlight onPress={pressFunction} disabled={disabled}
                               className={className} style={styles.dialogButton}>
        <View>
            <AntDesign name={name} size={24} color={color}/>
        </View>
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