import {StyleSheet, Text, TouchableHighlight, View} from 'react-native';
import React from "react";

type PROPS = {
    name: string;
    className: string;
    pressFunction: () => void;
    disabled?: boolean;
}

const CustomTouchableHighlight = ({name, className, pressFunction, disabled}: PROPS) => {
    return <TouchableHighlight onPress={pressFunction} disabled={disabled}
                               className={className} style={styles.dialogButton}>
        <View>
            <Text style={styles.dialogButtonText}>{name}</Text>
        </View>
    </TouchableHighlight>;
}

export default CustomTouchableHighlight;

const styles = StyleSheet.create({
    dialogButton: {
        borderRadius: 5,
        padding: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    dialogButtonText: {
        color: 'white',
    }
});