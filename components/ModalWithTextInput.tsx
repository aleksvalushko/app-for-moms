import {Text, TextInput, View, StyleSheet} from 'react-native';
import React from "react";

type PROPS = {
    title: string;
    text: string;
    setText: (param: string) => void;
}

const ModalWithTextInput: React.FC<PROPS> = ({title, text, setText}) => {
    return (
        <View>
            <Text>{title}</Text>
            <TextInput
                style={styles.input}
                onChangeText={setText}
                value={text}
                autoFocus
                placeholder="Например: Екатерина"
                placeholderTextColor="lightgrey"
            />
        </View>
    );
}

const styles = StyleSheet.create({
    input: {
        height: 40,
        borderWidth: 1,
        padding: 10,
        marginTop: 10,
        marginBottom: 10,
    },
});

export default ModalWithTextInput;