import {FlatList, StyleSheet, Text, useColorScheme} from "react-native";
import React, {useState} from "react";
import {useUser} from "@/hooks/useUser";
import {useRouter} from "expo-router";
import {SafeAreaProvider, SafeAreaView} from "react-native-safe-area-context";
import CustomPressable from "@/components/Buttons/CustomPressable";
import CustomText from "@/components/CustomText";
import {setColorScheme} from "react-native/Libraries/Utilities/Appearance";
import ModalWithConfirmation from "@/components/Modals/ModalWithConfirmation";

type ItemType = {
    id: number;
    title: string;
    icon?: string;
    onPress: () => void;
};

const Settings = () => {
    const router = useRouter();
    const colorScheme = useColorScheme();
    const {logout} = useUser();

    const [error, setError] = useState(null);
    const [isShowLogoutModal, setIsShowLogoutModal] = useState<boolean>(false);
    const [isShowChangeAppColorModal, setIsShowChangeAppColorModal] = useState<boolean>(false);

    const signOut = async () => {
        try {
            setError(null);
            await logout();
            router.replace("/(auth)");
        } catch (error: any) {
            setError(error.message);
        } finally {
            setIsShowLogoutModal(false);
        }
    };

    const changeAppColor = async () => {
        if (colorScheme === 'dark') {
            setColorScheme('light');
        } else {
            setColorScheme('dark');
        }
        setIsShowChangeAppColorModal(false);
    };

    const settings: ItemType[] = [
        {
            id: 1, title: 'Поменять цвет приложения', icon: 'circle', onPress: () => setIsShowChangeAppColorModal(true)
        },
        {id: 2, title: 'Выйти', icon: 'logout', onPress: () => setIsShowLogoutModal(true)},
    ]

    return (
        <SafeAreaView className='flex-1 justify-center items-center p-5'>
            <CustomText className='text-[30px] mb-10'>Настройки</CustomText>
            <SafeAreaProvider style={styles.provider}>
                <SafeAreaView style={styles.container}>
                    <FlatList<ItemType>
                        className='w-full'
                        data={settings}
                        renderItem={({item}: { item: ItemType }) => <CustomPressable title={item.title}
                                                                                     pressFunction={item.onPress}
                                                                                     icon={item.icon}/>}
                        keyExtractor={(item: ItemType) => item.id.toString()}
                    />
                </SafeAreaView>
                {error && <Text style={styles.error}>{error}</Text>}
            </SafeAreaProvider>

            <ModalWithConfirmation isOpen={isShowChangeAppColorModal}
                                   text='Вы действительно хотите изменить цвет приложения?'
                                   confirm={changeAppColor}
                                   cancel={() => setIsShowChangeAppColorModal(false)}/>

            <ModalWithConfirmation isOpen={isShowLogoutModal}
                                   text='Вы действительно хотите выйти из аккаунта?'
                                   confirm={signOut}
                                   cancel={() => setIsShowLogoutModal(false)}/>
        </SafeAreaView>
    );
};

export default Settings;

const styles = StyleSheet.create({
    provider: {
        width: '100%',
        columnGap: 10,
    },
    container: {
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start'
    },
    item: {
        backgroundColor: '#6B8FD4',
        padding: 10,
        marginVertical: 8,
        borderRadius: 10,
        flex: 1,
        marginHorizontal: 10,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
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
    },
    modalWrapper: {
        backgroundColor: '#302f2f',
        width: '100%',
        padding: 20,
        borderRadius: 10
    },
    modalText: {
        fontSize: 18,
        marginBottom: 20,
    },
});