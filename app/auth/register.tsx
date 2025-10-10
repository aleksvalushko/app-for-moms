import {
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    SafeAreaView,
} from 'react-native'
import React, {useState} from 'react'
import {useUser} from "@/hooks/useUser";
import {UserProviderProps} from "@/types";

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [error, setError] = useState(null);

    const {register} = useUser<UserProviderProps>();

    const signUp = async (email: string, password: string, name: string) => {
        try {
            await register(email, password, name);
            // if (user) router.replace('/(tabs)');
        } catch (error: any) {
            setError(error.message);
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <TextInput style={styles.textInput} placeholder="E-mail" placeholderTextColor="#9E9E9E"
                       keyboardType='email-address'
                       clearButtonMode="while-editing" value={email} onChangeText={setEmail}/>
            <TextInput style={styles.textInput} placeholder="Пароль" placeholderTextColor="#9E9E9E"
                       clearButtonMode="while-editing" value={password} onChangeText={setPassword} secureTextEntry/>
            <TextInput style={styles.textInput} placeholder="Имя" placeholderTextColor="#9E9E9E"
                       clearButtonMode="while-editing" value={name} onChangeText={setName}/>
            <TouchableOpacity style={styles.button} onPress={() => signUp(email, password, name)}>
                <Text style={styles.text}>Зарегистрироваться</Text>
            </TouchableOpacity>

            {error && <Text style={styles.error}>{error}</Text>}
        </SafeAreaView>
    )
}

export default Register;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FAFAFA',
    },
    textInput: {
        height: 50,
        width: '90%',
        backgroundColor: '#FFFFFF',
        borderColor: '#E8EAF6',
        borderWidth: 2,
        borderRadius: 15,
        marginVertical: 15,
        paddingHorizontal: 25,
        fontSize: 16,
        color: '#3C4858',
        shadowColor: '#9E9E9E',
        shadowOffset: {width: 0, height: 4},
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 4,
    },
    button: {
        width: '90%',
        marginVertical: 15,
        backgroundColor: '#4371d6',
        padding: 20,
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