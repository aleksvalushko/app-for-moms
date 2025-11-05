import {View, StyleSheet} from 'react-native';
import React from "react";
import CustomTextInput from "@/components/Inputs/CustomTextInput";
import CustomText from "@/components/CustomText";

type PROPS = {
    title: string;
    text: string;
    setText: (param: string) => void;
}

const ModalWithTextInput: React.FC<PROPS> = ({title, text, setText}) => {
    return (
        <View>
            <CustomText className='font-semibold text-[20px]'>{title}</CustomText>
            <CustomTextInput
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
        fontSize: 20,
        width: '100%',
        paddingRight: 40,
        paddingLeft: 10
    },
});

export default ModalWithTextInput;