import { StyleSheet } from 'react-native'
import React, {useState} from 'react'
import {useUser} from "@/hooks/useUser";
import {SafeAreaView} from "react-native-safe-area-context";
import CustomTextInput from "@/components/Inputs/CustomTextInput";
import CustomText from "@/components/CustomText";
import CustomTouchableOpacity from "@/components/Buttons/CustomTouchableOpacity";

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [error, setError] = useState(null);

    const {register} = useUser();

    const signUp = async (email: string, password: string, name: string) => {
        try {
            await register(email, password, name);
        } catch (error: any) {
            setError(error.message);
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <CustomTextInput placeholder="E-mail" placeholderTextColor="#9E9E9E" keyboardType='email-address' style={styles.input}
                             value={email} onChangeText={setEmail}/>
            <CustomTextInput placeholder="Пароль" placeholderTextColor="#9E9E9E" value={password} style={styles.input}
                             onChangeText={setPassword} secureTextEntry/>
            <CustomTextInput placeholder="Имя" placeholderTextColor="#9E9E9E" style={styles.input} value={name} onChangeText={setName}/>
            <CustomTouchableOpacity className='bg-accent' style={styles.button} pressFunction={() => signUp(email, password, name)}>
                <CustomText style={styles.text}>Зарегистрироваться</CustomText>
            </CustomTouchableOpacity>

            {error && <CustomText style={styles.error}>{error}</CustomText>}
        </SafeAreaView>
    )
}


export default Register;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        width: '90%',
        marginVertical: 15,
        padding: 10,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#4371d6',
        shadowOffset: {width: 0, height: 4},
        shadowOpacity: 0.4,
        shadowRadius: 5,
        elevation: 5,
    },
    text: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: '600',
    },
    input: {
        width: '90%'
    },
    error: {
        color: 'red',
        padding: 10,
        backgroundColor: '#f5c1c8',
        borderColor: '#f87a8b',
        borderWidth: 1,
        borderRadius: 6,
        marginHorizontal: 10
    }
});