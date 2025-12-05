import {
    FlatList,
    View,
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

export const Index = () => {
    const [isShowAddFamilyMemberModal, setIsShowAddFamilyMemberModal] = useState<boolean>(false);
    const [isShowEditFamilyMemberModal, setIsShowEditFamilyMemberModal] = useState<boolean>(false);
    const [isShowDeleteFamilyMemberModal, setIsShowDeleteFamilyMemberModal] = useState<boolean>(false);
    const [selectedId, setSelectedId] = useState<string>();
    const {colorScheme} = useColorScheme();

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

    const Item = ({item}: { item: FamilyMemberType }) => (
        <View className='bg-listElement m-2 min-h-[50px]' style={styles.item}>
            <CustomTouchableOpacity pressFunction={() => setSelectedId(item.id)} className='flex-1 justify-start'>
                <CustomText style={styles.itemTitle}>{item.name}</CustomText>
            </CustomTouchableOpacity>
            <CustomPressable iconName='edit' className='row justify-center items-center'
                             pressFunction={() => getFamilyMemberFunc(item)}/>
            <CustomPressable iconName='delete' className='row justify-center items-center'
                             pressFunction={() => chooseFamilyMemberFunc(item, setIsShowDeleteFamilyMemberModal)}/>
        </View>
    );

    return (
        <SafeAreaView className='flex-1 justify-center items-center py-[10px]'>
            <CustomText className='text-[30px] mb-[10px] text-black dark:text-white'>Члены семьи</CustomText>
            <CustomPressable title='Добавить члена семьи' className='bg-primary' textClassName='text-white text-[20px]'
                             pressFunction={() => setIsShowAddFamilyMemberModal(true)}
                             style={styles.addFamilyMemberButton}/>
            <SafeAreaProvider style={styles.provider}>
                <SafeAreaView style={styles.container}>
                    <FlatList<FamilyMemberType>
                        className='w-full'
                        data={familyMembers}
                        renderItem={({item}: { item: FamilyMemberType }) => <Item item={item}/>}
                        keyExtractor={(item: FamilyMemberType) => item.id}
                        extraData={selectedId}
                    />
                </SafeAreaView>
            </SafeAreaProvider>
            <ModalWrapper isOpen={isShowAddFamilyMemberModal}>
                <View className='bg-white dark:bg-darkModalBackground' style={styles.modalWrapper}>
                    <ModalWithTextInput title='Введите имя члена семьи' text={familyMemberName}
                                        setText={setFamilyMemberNameFunc}/>
                    <View className='flex-row gap-x-2 w-full justify-between'>
                        <CustomTouchableHighlight name='Добавить' className='bg-primary items-center justify-center' disabled={!familyMemberName}
                                                  textClassName='text-white text-[20px]'
                                                  underlayColor={COLORS[colorScheme].colors.activePrimary}
                                                  pressFunction={addFamilyMemberFunc}/>
                        <CustomTouchableHighlight name='Закрыть' className='bg-closeBtn items-center justify-center'
                                                  textClassName='text-white text-[20px]'
                                                  underlayColor={COLORS[colorScheme].colors.activeSecondary}
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
                                                  underlayColor={COLORS[colorScheme].colors.activePrimary}
                                                  pressFunction={() => updateFamilyMemberFunc({
                                                      ...familyMember,
                                                      name: familyMemberName
                                                  })}/>
                        <CustomTouchableHighlight name='Закрыть' className='bg-closeBtn items-center justify-center'
                                                  textClassName='text-white text-[20px]'
                                                  underlayColor={COLORS[colorScheme].colors.activeSecondary}
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
                                                  underlayColor={COLORS[colorScheme].colors.activeDeleteBtn}
                                                  pressFunction={() => deleteFamilyMemberFC(familyMember)}/>
                        <CustomTouchableHighlight name='Отменить' className='bg-closeBtn items-center justify-center'
                                                  textClassName='text-white text-[20px]'
                                                  underlayColor={COLORS[colorScheme].colors.activeSecondary}
                                                  pressFunction={() => handleCloseModal(setIsShowDeleteFamilyMemberModal)}/>
                    </View>
                </View>
            </ModalWrapper>
        </SafeAreaView>
    )
}

export default Index;

const styles = StyleSheet.create({
    addFamilyMemberButton: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
        height: 40,
        fontSize: 14,
        paddingHorizontal: 20,
        marginVertical: 5
    },
    provider: {
        width: '100%',
    },
    container: {
        flex: 1
    },
    item: {
        padding: 10,
        borderRadius: 10,
        flex: 1,
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