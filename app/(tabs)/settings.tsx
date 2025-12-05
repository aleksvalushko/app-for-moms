import {FlatList, StyleSheet, Text} from "react-native";
import React, {useState} from "react";
import {useUser} from "@/hooks/useUser";
import {useRouter} from "expo-router";
import {SafeAreaProvider, SafeAreaView} from "react-native-safe-area-context";
import CustomText from "@/components/CustomText";
import ModalWithConfirmation from "@/components/Modals/ModalWithConfirmation";
import {useColorScheme} from "nativewind";
import CustomTouchableHighlight from "@/components/Buttons/CustomTouchableHighlight";
import {COLORS} from "@/constants/colors";

type ItemType = {
    id: number;
    title: string;
    icon?: string;
    onPress: () => void;
};

const Settings = () => {
    const router = useRouter();
    const {colorScheme, toggleColorScheme} = useColorScheme();
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
        toggleColorScheme();
        setIsShowChangeAppColorModal(false);
    };

    const settings: ItemType[] = [
        {
            id: 1, title: 'Изменить цвет приложения', icon: 'theme-light-dark', onPress: () => setIsShowChangeAppColorModal(true)
        },
        {id: 2, title: 'Выйти', icon: 'logout', onPress: () => setIsShowLogoutModal(true)},
    ]

    const SettingsItem = ({item}: { item: ItemType }) => (
        <CustomTouchableHighlight pressFunction={item.onPress} name={item.title} style={styles.item} underlayColor={COLORS[colorScheme].colors.activeListElement}
                                  className='h-[100px] flex-row items-center justify-start text-white text-[20px] bg-listElement' textStyle={styles.itemLabel}
                                  iconName={item.icon} isLeftIcon={true}/>
    );

    return (
        <SafeAreaView className='flex-1 justify-center items-center p-[10px]'>
            <CustomText className='text-[30px] mb-[10px] text-black dark:text-white'>Настройки</CustomText>
            <SafeAreaProvider style={styles.provider}>
                <SafeAreaView style={styles.container}>
                    <FlatList<ItemType>
                        data={settings}
                        renderItem={({item}: { item: ItemType }) => <SettingsItem item={item}/>}
                        keyExtractor={(item: ItemType) => item.id.toString()}
                    />
                    {error && <Text style={styles.error}>{error}</Text>}
                </SafeAreaView>
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
        padding: 10,
        marginVertical: 8,
        borderRadius: 10,
        flex: 1,
        marginHorizontal: 10,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#5b86e5',
    },
    itemLabel: {
        color: '#ffffff',
        fontSize: 20
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