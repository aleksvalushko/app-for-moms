import {Modal, ModalProps, View, StyleSheet} from 'react-native';
import React from "react";
import CustomText from "@/components/CustomText";
import CustomTouchableHighlight from "@/components/Buttons/CustomTouchableHighlight";
import {COLORS} from "@/constants/colors";
import {useColorScheme} from "nativewind";

type Props = ModalProps & {
    isOpen: boolean;
    text: string;
    confirm: () => void;
    cancel: () => void;
};


const ModalWithConfirmation: React.FC<Props> = ({isOpen, text, confirm, cancel}: Props) => {
    const {colorScheme} = useColorScheme();

    return (
        <Modal visible={isOpen} transparent animationType='fade' statusBarTranslucent>
            <View className='items-center justify-center w-full h-full px-5 bg-zinc-900/40 dark:bg-zinc-600/90'>
                <View className='bg-white dark:bg-darkModalBackground' style={styles.modalWrapper}>
                    <CustomText className='text-black dark:text-white' style={styles.modalText}>{text}</CustomText>
                    <View className='flex-row gap-x-2 w-full justify-between'>
                        <CustomTouchableHighlight name='Подтвердить' className="bg-primary items-center justify-center" pressFunction={confirm}
                        textClassName='text-white text-[20px]'
                                                  underlayColor={COLORS[colorScheme].colors.underlayForPrimary}/>
                        <CustomTouchableHighlight name='Отменить' className="bg-closeBtn items-center justify-center" pressFunction={cancel}
                        textClassName='text-white text-[20px]'
                                                  underlayColor={COLORS[colorScheme].colors.underlaySecondary}/>
                    </View>
                </View>
            </View>
        </Modal>
    );
}

export default ModalWithConfirmation;

const styles = StyleSheet.create({
    modalWrapper: {
        width: '100%',
        padding: 20,
        borderRadius: 10
    },
    modalText: {
        fontSize: 18,
        marginBottom: 20,
    },
});