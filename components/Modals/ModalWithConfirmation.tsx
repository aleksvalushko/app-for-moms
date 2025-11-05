import {Modal, ModalProps, View, StyleSheet, useColorScheme} from 'react-native';
import React from "react";
import CustomText from "@/components/CustomText";
import CustomTouchableHighlight from "@/components/Buttons/CustomTouchableHighlight";

type Props = ModalProps & {
    isOpen: boolean;
    text: string;
    confirm: () => void;
    cancel: () => void;
};


const ModalWithConfirmation: React.FC<Props> = ({isOpen, text, confirm, cancel}: Props) => {
    const colorScheme = useColorScheme();
    const isDarkMode = colorScheme === 'dark';

    return (
        <Modal visible={isOpen} transparent animationType='fade' statusBarTranslucent>
            <View className='items-center justify-center w-full h-full px-5 bg-zinc-900/40'>
            <View style={isDarkMode ? styles.darkModalWrapper : styles.lightModalWrapper}>
                <CustomText style={styles.modalText}>{text}</CustomText>
                <View className='flex-row gap-x-2 w-full justify-between'>
                    <CustomTouchableHighlight name='Подтвердить' variant="primary" pressFunction={confirm}/>
                    <CustomTouchableHighlight name='Отменить' variant="secondary" pressFunction={cancel}/>
                </View>
            </View>
            </View>
        </Modal>
    );
}

export default ModalWithConfirmation;

const styles = StyleSheet.create({
    darkModalWrapper: {
        backgroundColor: '#302f2f',
        width: '100%',
        padding: 20,
        borderRadius: 10
    },
    lightModalWrapper: {
        backgroundColor: '#fff',
        width: '100%',
        padding: 20,
        borderRadius: 10
    },
    modalText: {
        fontSize: 18,
        marginBottom: 20,
    },
});