import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import React, {useState} from "react";
import {useUser} from "@/hooks/useUser";
import {useRouter} from "expo-router";

const Settings = () => {
    const router = useRouter();
    const {logout} = useUser();

    const [error, setError] = useState(null);

    const signOut = async () => {
        try {
            setError(null);
            await logout();
            router.replace("/(auth)");
        } catch (error: any) {
            setError(error.message);
        }
    };

    return (
        <View className='flex-1 justify-end items-center'>
            <TouchableOpacity style={styles.button} onPress={() => signOut()}>
                <Text style={styles.text}>Выйти</Text>
            </TouchableOpacity>

            {error && <Text style={styles.error}>{error}</Text>}
        </View>
    );
};

export default Settings;

const styles = StyleSheet.create({
    button: {
        width: '90%',
        marginVertical: 25,
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