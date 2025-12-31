import {
    FlatList,
    View,
    Text,
    StyleSheet,
} from "react-native";
import React, {useState} from "react";
import ModalWrapper from "@/components/Modals/ModalWrapper";
import ModalWithTextInput from "@/components/Modals/ModalWithTextInput";
import {SafeAreaView, SafeAreaProvider} from "react-native-safe-area-context";
import CustomTouchableHighlight from "@/components/Buttons/CustomTouchableHighlight";
import CustomText from "@/components/CustomText";
import {FamilyMemberType} from "@/types";
import {useAppDispatch, useAppSelector} from "@/hooks";
import {useFamilyMembers} from "@/hooks/useFamilyMembers";
import {chooseFamilyMember, setFamilyMemberName} from "@/store/reducers/familyMembersSlice";
import CustomTouchableOpacity from "@/components/Buttons/CustomTouchableOpacity";
import CustomPressable from "@/components/Buttons/CustomPressable";
import {COLORS} from "@/constants/colors";
import {useColorScheme} from "nativewind";
import {useRouter} from "expo-router";

export const Index = () => {
    const {colorScheme} = useColorScheme();
    const router = useRouter();

    const [isShowAddFamilyMemberModal, setIsShowAddFamilyMemberModal] = useState<boolean>(false);
    const [isShowEditFamilyMemberModal, setIsShowEditFamilyMemberModal] = useState<boolean>(false);
    const [isShowDeleteFamilyMemberModal, setIsShowDeleteFamilyMemberModal] = useState<boolean>(false);

    const {createFamilyMember, updateFamilyMember, deleteFamilyMember} = useFamilyMembers();
    const dispatch = useAppDispatch();

    const familyMembers = useAppSelector(state => {
        return state.familyMembers.familyMembers;
    });
    const familyMember = useAppSelector(state => {
        return state.familyMembers.familyMember;
    });
    const familyMemberName = useAppSelector(state => {
        return state.familyMembers.familyMemberName;
    });

    const addFamilyMemberFunc = async () => {
        if (!familyMemberName) return;

        const memberName = familyMemberName;

        handleCloseModal(setIsShowAddFamilyMemberModal);

        const response = await createFamilyMember(memberName);
        if (!response) return;
    };

    const getFamilyMemberFunc = (member: FamilyMemberType) => {
        if (!member) return;
        chooseFamilyMemberFunc(member, setIsShowEditFamilyMemberModal);
    };

    const updateFamilyMemberFunc = async (member: FamilyMemberType) => {
        if (!member) return;
        handleCloseModal(setIsShowEditFamilyMemberModal);

        const response = await updateFamilyMember(member);
        if (!response) return;
    };

    const setFamilyMemberNameFunc = (name: string) => {
        dispatch(setFamilyMemberName(name));
    };

    const handleCloseModal = (setIsShowModal: (condition: boolean) => void) => {
        dispatch(setFamilyMemberName(''));
        dispatch(chooseFamilyMember({id: '', name: ''}));
        setIsShowModal(false);
    };

    const chooseFamilyMemberFunc = (item: FamilyMemberType, setIsShowModal: (condition: boolean) => void) => {
        dispatch(chooseFamilyMember(item));
        dispatch(setFamilyMemberName(item.name));
        setIsShowModal(true);
    };

    const deleteFamilyMemberFC = async (item: FamilyMemberType) => {
        if (!item.documentId) return;

        const response = await deleteFamilyMember(item.documentId);
        if (!response) return;
        handleCloseModal(setIsShowDeleteFamilyMemberModal);
    };

    const goToFamilyMember = (item: FamilyMemberType) => {
        dispatch(chooseFamilyMember(item));
        router.navigate('/familyMember/[id]');
    }

    const Item = ({item}: { item: FamilyMemberType }) => (
        <CustomTouchableOpacity pressFunction={() => goToFamilyMember(item)}
                                className='flex-1 justify-start bg-listElement my-[5px] min-h-[50px]'
                                style={styles.item}>
            <Text className='flex-1 justify-start text-white text-[25px]'>{item.name}</Text>
            <CustomPressable iconName='edit' className='justify-center items-center'
                             pressFunction={() => getFamilyMemberFunc(item)}/>
            <CustomPressable iconName='delete' className='justify-center items-center'
                             pressFunction={() => chooseFamilyMemberFunc(item, setIsShowDeleteFamilyMemberModal)}/>
        </CustomTouchableOpacity>
    );

    return (
        <SafeAreaView className='flex-1 justify-center items-center pt-[10px]'>
            <CustomText className='text-[30px] mb-[10px] text-black dark:text-white'>Члены семьи</CustomText>
            <SafeAreaProvider style={styles.provider}>
                <SafeAreaView style={styles.container}>
                    <FlatList<FamilyMemberType>
                        className='w-full'
                        data={familyMembers}
                        renderItem={({item}: { item: FamilyMemberType }) => <Item item={item}/>}
                        keyExtractor={(item: FamilyMemberType) => item.id}
                    />
                </SafeAreaView>
            </SafeAreaProvider>
            <ModalWrapper isOpen={isShowAddFamilyMemberModal}>
                <View className='bg-white dark:bg-darkModalBackground' style={styles.modalWrapper}>
                    <ModalWithTextInput title='Введите имя члена семьи' text={familyMemberName}
                                        setText={setFamilyMemberNameFunc}/>
                    <View className='flex-row gap-x-2 w-full justify-between'>
                        <CustomTouchableHighlight name='Добавить' className='bg-primary items-center justify-center'
                                                  disabled={!familyMemberName}
                                                  textClassName='text-white text-[20px]'
                                                  underlayColor={COLORS[colorScheme].colors.underlayForPrimary}
                                                  pressFunction={addFamilyMemberFunc}/>
                        <CustomTouchableHighlight name='Закрыть' className='bg-closeBtn items-center justify-center'
                                                  textClassName='text-white text-[20px]'
                                                  underlayColor={COLORS[colorScheme].colors.underlaySecondary}
                                                  pressFunction={() => handleCloseModal(setIsShowAddFamilyMemberModal)}/>
                    </View>
                </View>
            </ModalWrapper>
            <ModalWrapper isOpen={isShowEditFamilyMemberModal}>
                <View className='bg-white dark:bg-darkModalBackground' style={styles.modalWrapper}>
                    <ModalWithTextInput title='Введите имя члена семьи' text={familyMemberName}
                                        setText={setFamilyMemberNameFunc}/>
                    <View className='flex-row gap-x-2 w-full justify-end'>
                        <CustomTouchableHighlight name='Сохранить' className='bg-primary items-center justify-center'
                                                  textClassName='text-white text-[20px]' disabled={!familyMemberName}
                                                  underlayColor={COLORS[colorScheme].colors.underlayForPrimary}
                                                  pressFunction={() => updateFamilyMemberFunc({
                                                      ...familyMember,
                                                      name: familyMemberName
                                                  })}/>
                        <CustomTouchableHighlight name='Закрыть' className='bg-closeBtn items-center justify-center'
                                                  textClassName='text-white text-[20px]'
                                                  underlayColor={COLORS[colorScheme].colors.underlaySecondary}
                                                  pressFunction={() => handleCloseModal(setIsShowEditFamilyMemberModal)}/>
                    </View>
                </View>
            </ModalWrapper>
            <ModalWrapper isOpen={isShowDeleteFamilyMemberModal}>
                <View className='bg-white dark:bg-darkModalBackground' style={styles.modalWrapper}>
                    <CustomText className='text-black dark:text-white' style={styles.modalText}>Вы действительно хотите
                        удалить <CustomText
                            style={styles.familyMemberName}>{familyMemberName}</CustomText> из списка членов
                        семьи?</CustomText>
                    <View className='flex-row gap-x-2 w-full justify-end'>
                        <CustomTouchableHighlight name='Удалить' className='bg-deleteBtn items-center justify-center'
                                                  textClassName='text-white text-[20px]'
                                                  underlayColor={COLORS[colorScheme].colors.underlayForDeleteBtn}
                                                  pressFunction={() => deleteFamilyMemberFC(familyMember)}/>
                        <CustomTouchableHighlight name='Отменить' className='bg-closeBtn items-center justify-center'
                                                  textClassName='text-white text-[20px]'
                                                  underlayColor={COLORS[colorScheme].colors.underlaySecondary}
                                                  pressFunction={() => handleCloseModal(setIsShowDeleteFamilyMemberModal)}/>
                    </View>
                </View>
            </ModalWrapper>
            <CustomPressable title='Добавить члена семьи' className='bg-primary absolute bottom-[60px] left-[0]' textClassName='text-white text-[20px]'
                             pressFunction={() => setIsShowAddFamilyMemberModal(true)} rounded={true} iconName='add'
                             style={styles.addFamilyMemberButton}/>
        </SafeAreaView>
    )
}

export default Index;

const styles = StyleSheet.create({
    addFamilyMemberButton: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        height: 40,
        fontSize: 14,
        marginVertical: 5,
        position: 'absolute',
        right: 70,
        bottom: 50
    },
    provider: {
        width: '100%',
    },
    container: {
        flex: 1
    },
    item: {
        borderRadius: 10,
        marginHorizontal: 10,
        flex: 1,
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    itemTitle: {
        fontSize: 25,
        color: 'white',
    },
    modalWrapper: {
        width: '100%',
        padding: 20,
        borderRadius: 10
    },
    modalText: {
        fontSize: 18,
        marginBottom: 20
    },
    familyMemberName: {
        fontWeight: 900
    }
});