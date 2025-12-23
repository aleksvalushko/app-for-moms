import {router} from 'expo-router'
import {SafeAreaProvider, SafeAreaView} from "react-native-safe-area-context";
import {COLORS} from "@/constants/colors";
import CustomTouchableHighlight from "@/components/Buttons/CustomTouchableHighlight";
import React from "react";
import {useColorScheme} from "nativewind";
import {useUser} from "@/hooks/useUser";
import {FlatList, StyleSheet, View, Text} from "react-native";
import {useAppSelector} from "@/hooks";
import GoBackButton from "@/components/Buttons/GoBackButton";

type FamilyMemberActionsType = {
    id: number;
    title: string;
    icon?: string;
    onPress: () => void;
};

export default function FamilyMember() {
    const {colorScheme} = useColorScheme();
    const {user} = useUser();

    const familyMember = useAppSelector(state => {
        return state.familyMembers.familyMember;
    });

    const familyMemberActions: FamilyMemberActionsType[] = [
        {
            id: 1, title: 'Календарные события', icon: 'calendar', onPress: goToCalendar
        },
        {id: 2, title: 'Школа', icon: 'school', onPress: () => {}},
        {id: 3, title: 'Тренировки', icon: 'gymnastics', onPress: () => {}},
    ];

    function goToCalendar() {
        router.navigate('/calendar/[id]');
    }

    const Item = ({item}: { item: FamilyMemberActionsType }) => (
        <CustomTouchableHighlight pressFunction={item.onPress} name={item.title} style={styles.item} underlayColor={COLORS[colorScheme].colors.underlayForListElement}
                                  className='min-h-[50px] flex-row items-center justify-start bg-listElement my-[5px] max-w-full'
                                  textClassName='text-white text-[20px]'
                                  iconName={item.icon} isLeftIcon={true}/>
    );

    return (
        <SafeAreaView className='flex-1 justify-center items-center'>
            <View className='w-full flex-row justify-center items-center relative my-[10px]'>
                <GoBackButton user={user} />
                <Text className='text-[30px] text-black dark:text-white'>{familyMember?.name ?? ''}</Text>
            </View>
            <SafeAreaProvider style={styles.provider}>
                <SafeAreaView style={styles.container}>
                    <FlatList<FamilyMemberActionsType>
                        data={familyMemberActions}
                        renderItem={({item}: { item: FamilyMemberActionsType }) => <Item item={item}/>}
                        keyExtractor={(item: FamilyMemberActionsType) => item.id.toString()}
                    />
                </SafeAreaView>
            </SafeAreaProvider>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    provider: {
        width: '100%',
        columnGap: 10,
    },
    container: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        padding: 10
    },
    item: {
        flex: 1,
        padding: 10,
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
});