import {
    FlatList,
    View,
    StyleSheet,
    Pressable, useColorScheme,
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
import CustomIconTouchableOpacity from "@/components/Buttons/CustomIconTouchableOpacity";
import CustomTouchableOpacity from "@/components/Buttons/CustomTouchableOpacity";

export const Index = () => {
    const [isShowAddFamilyMemberModal, setIsShowAddFamilyMemberModal] = useState<boolean>(false);
    const [isShowEditFamilyMemberModal, setIsShowEditFamilyMemberModal] = useState<boolean>(false);
    const [isShowDeleteFamilyMemberModal, setIsShowDeleteFamilyMemberModal] = useState<boolean>(false);
    const [selectedId, setSelectedId] = useState<string>();
    const colorScheme = useColorScheme();
    const isDarkMode = colorScheme === 'dark';

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
        <View style={styles.item}>
            <CustomTouchableOpacity pressFunction={() => setSelectedId(item.id)} className='flex-1 justify-start'>
                <CustomText style={styles.title}>{item.name}</CustomText>
            </CustomTouchableOpacity>
            <CustomIconTouchableOpacity name='edit' className='w-50 justify-center items-center'
                                        pressFunction={() => getFamilyMemberFunc(item)}/>
            <CustomIconTouchableOpacity name='delete' className='w-50 justify-center items-center'
                                        pressFunction={() => chooseFamilyMemberFunc(item, setIsShowDeleteFamilyMemberModal)}/>
        </View>
    );

    return (
        <SafeAreaView className='flex-1 justify-center items-center'>
            <Pressable onPress={() => setIsShowAddFamilyMemberModal(true)} style={styles.addFamilyMemberButton}>
                <CustomText className='text-white'>Добавить члена семьи</CustomText>
            </Pressable>
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
                <View style={isDarkMode ? styles.darkModalWrapper : styles.lightModalWrapper}>
                    <ModalWithTextInput title='Введите имя члена семьи' text={familyMemberName}
                                        setText={setFamilyMemberNameFunc}/>
                    <View className='flex-row gap-x-2 w-full justify-between'>
                        <CustomTouchableHighlight name='Добавить' variant='primary' disabled={!familyMemberName}
                                                  pressFunction={addFamilyMemberFunc}/>
                        <CustomTouchableHighlight name='Закрыть' variant='secondary'
                                                  pressFunction={() => handleCloseModal(setIsShowAddFamilyMemberModal)}/>
                    </View>
                </View>
            </ModalWrapper>
            <ModalWrapper isOpen={isShowEditFamilyMemberModal}>
                <View style={isDarkMode ? styles.darkModalWrapper : styles.lightModalWrapper}>
                    <ModalWithTextInput title='Введите имя члена семьи' text={familyMemberName}
                                        setText={setFamilyMemberNameFunc}/>
                    <View className='flex-row gap-x-2 w-full justify-end'>
                        <CustomTouchableHighlight name='Сохранить' variant='primary' disabled={!familyMemberName}
                                                  pressFunction={() => updateFamilyMemberFunc({
                                                      ...familyMember,
                                                      name: familyMemberName
                                                  })}/>
                        <CustomTouchableHighlight name='Закрыть' variant='secondary'
                                                  pressFunction={() => handleCloseModal(setIsShowEditFamilyMemberModal)}/>
                    </View>
                </View>
            </ModalWrapper>
            <ModalWrapper isOpen={isShowDeleteFamilyMemberModal}>
                <View style={isDarkMode ? styles.darkModalWrapper : styles.lightModalWrapper}>
                    <CustomText style={styles.modalText}>Вы действительно хотите удалить <CustomText
                        style={styles.familyMemberName}>{familyMemberName}</CustomText> из списка членов
                        семьи?</CustomText>
                    <View className='flex-row gap-x-2 w-full justify-end'>
                        <CustomTouchableHighlight name='Удалить' variant="danger"
                                                  pressFunction={() => deleteFamilyMemberFC(familyMember)}/>
                        <CustomTouchableHighlight name='Отменить' variant='secondary'
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
        backgroundColor: '#4371d6',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
        height: 40,
        paddingHorizontal: 20,
        paddingVertical: 5,
        marginTop: 10,
    },
    provider: {
        width: '100%',
        columnGap: 10,
    },
    container: {
        flex: 1
    },
    item: {
        backgroundColor: '#6B8FD4',
        padding: 10,
        marginVertical: 8,
        borderRadius: 10,
        flex: 1,
        marginHorizontal: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    title: {
        fontSize: 25,
        color: 'white',
        backgroundColor: '#6B8FD4',
    },
    darkModalWrapper: {
        backgroundColor: '#302f2f',
        width: '100%',
        padding: 20,
        borderRadius: 10
    },
    lightModalWrapper: {
        backgroundColor: '#fff',
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