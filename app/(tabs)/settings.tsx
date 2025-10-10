import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import React from "react";
import {useUser} from "@/hooks/useUser";
import {UserProviderProps} from "@/types";
import {useRouter} from "expo-router";

const Settings = () => {
    const router = useRouter()
    const {logout} = useUser<UserProviderProps>();

    const signOut = async () => {
        await logout();
        router.replace("/auth");
    };

    return (
        <View className='flex-1 justify-center items-center'>
            <TouchableOpacity style={styles.button} onPress={() => signOut()}>
                <Text style={styles.text}>Выйти</Text>
            </TouchableOpacity>
        </View>
    );
};

export default Settings;

const styles = StyleSheet.create({
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
});