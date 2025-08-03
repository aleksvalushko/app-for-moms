import {Modal, ModalProps, KeyboardAvoidingView, View, Platform} from 'react-native';

type PROPS = ModalProps & {
    isOpen: boolean;
    withInput?: boolean;
};

const ModalWrapper = ({isOpen, withInput, children, ...rest}: PROPS) => {
    const content = withInput ?
        (
            <KeyboardAvoidingView
                className='items-center justify-center px-5 bg-zinc-900/40'
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
                {children}
            </KeyboardAvoidingView>
        ) :
        (
            <View className='items-center justify-center w-full h-full px-5 bg-zinc-900/40'>
                {children}
            </View>
        )

    return (
        <Modal visible={isOpen} transparent animationType='fade' statusBarTranslucent {...rest}>
            {content}
        </Modal>
    );
}

export default ModalWrapper;