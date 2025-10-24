import {
    FlatList,
    View,
    StyleSheet,
    TouchableOpacity,
    Pressable,
    ListRenderItem
} from "react-native";
import React, {useState} from "react";
import ModalWrapper from "@/app/modals/ModalWrapper";
import ModalWithTextInput from "@/components/ModalWithTextInput";
import {SafeAreaView, SafeAreaProvider} from "react-native-safe-area-context";
import DeleteFamilyMember from "@/components/DeleteFamilyMember";
import CustomTouchableHighlight from "@/components/Buttons/CustomTouchableHighlight";
import CustomIconTouchableHighlight from "@/components/Buttons/CustomIconTouchableHighlight";
import CustomText from "@/components/CustomText";
import {FamilyMemberType} from "@/types";
import {useAppDispatch, useAppSelector} from "@/hooks";
import {useFamilyMembers} from "@/hooks/useFamilyMembers";
import {chooseFamilyMember, setFamilyMemberName} from "@/store/reducers/familyMembersSlice";

type ItemProps = {
    item: FamilyMemberType;
    backgroundColor: string;
    textColor: string;
};

export const Index = () => {
    const [isShowAddFamilyMemberModal, setIsShowAddFamilyMemberModal] = useState<boolean>(false);
    const [isShowEditFamilyMemberModal, setIsShowEditFamilyMemberModal] = useState<boolean>(false);
    const [isShowDeleteFamilyMemberModal, setIsShowDeleteFamilyMemberModal] = useState<boolean>(false);
    const [selectedId, setSelectedId] = useState<string>();

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


    const Item = ({item, backgroundColor, textColor}: ItemProps) => (
        <View style={styles.item}>
            <TouchableOpacity onPress={() => setSelectedId(item.id)} style={{backgroundColor, flex: 6}}>
                <CustomText style={[styles.title, {color: textColor}]}>
                    {item.name}
                </CustomText>
            </TouchableOpacity>
            <CustomIconTouchableHighlight name='edit' className='flex-1 justify-center items-center'
                                          pressFunction={() => getFamilyMemberFunc(item)}/>
            <CustomIconTouchableHighlight name='delete' className='flex-1 justify-center items-center'
                                          pressFunction={() => chooseFamilyMemberFunc(item, setIsShowDeleteFamilyMemberModal)}/>
        </View>
    );

    const RenderItem: ListRenderItem<FamilyMemberType> = ({item}) => {
        return (
            <Item
                item={item}
                backgroundColor='#6B8FD4'
                textColor='black'
            />
        )
    };

    return (
        <SafeAreaView className='flex-1 justify-center items-center'>
            <Pressable onPress={() => setIsShowAddFamilyMemberModal(true)} style={styles.addFamilyMemberButton}>
                <CustomText className='text-white'>Добавить члена семьи</CustomText>
            </Pressable>
            <SafeAreaProvider style={styles.provider}>
                <SafeAreaView style={styles.container}>
                    <FlatList
                        className='w-full'
                        data={familyMembers}
                        renderItem={RenderItem}
                        keyExtractor={item => item.id}
                        extraData={selectedId}
                    />
                </SafeAreaView>
            </SafeAreaProvider>
            <ModalWrapper isOpen={isShowAddFamilyMemberModal}>
                <View className='bg-white w-full p-4 rounded-xl'>
                    <ModalWithTextInput title='Введите имя члена семьи' text={familyMemberName}
                                        setText={setFamilyMemberNameFunc}/>
                    <View className='flex-row gap-x-2 w-full justify-end'>
                        <CustomTouchableHighlight name='Добавить' className='bg-primary' disabled={!familyMemberName}
                                                  pressFunction={addFamilyMemberFunc}/>
                        <CustomTouchableHighlight name='Закрыть' className='bg-closeBtn'
                                                  pressFunction={() => handleCloseModal(setIsShowAddFamilyMemberModal)}/>
                    </View>
                </View>
            </ModalWrapper>
            <ModalWrapper isOpen={isShowEditFamilyMemberModal}>
                <View className='bg-white w-full p-4 rounded-xl'>
                    <ModalWithTextInput title='Введите имя члена семьи' text={familyMemberName}
                                        setText={setFamilyMemberNameFunc}/>
                    <View className='flex-row gap-x-2 w-full justify-end'>
                        <CustomTouchableHighlight name='Сохранить' className='bg-primary' disabled={!familyMemberName}
                                                  pressFunction={() => updateFamilyMemberFunc({
                                                      ...familyMember,
                                                      name: familyMemberName
                                                  })}/>
                        <CustomTouchableHighlight name='Закрыть' className='bg-closeBtn'
                                                  pressFunction={() => handleCloseModal(setIsShowEditFamilyMemberModal)}/>
                    </View>
                </View>

            </ModalWrapper>
            <ModalWrapper isOpen={isShowDeleteFamilyMemberModal}>
                <View className='bg-white w-full p-4 rounded-xl'>
                    <DeleteFamilyMember familyMemberName={familyMemberName ?? ''}/>
                    <View className='flex-row gap-x-2 w-full justify-end'>
                        <CustomTouchableHighlight name='Удалить' className='bg-deleteBtn'
                                                  pressFunction={() => deleteFamilyMemberFC(familyMember)}/>
                        <CustomTouchableHighlight name='Отменить' className='bg-closeBtn'
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
    },
    title: {
        fontSize: 32,
    },
    dialogButton: {
        borderRadius: 5,
        padding: 5,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    dialogButtonText: {
        color: 'white',
    }
});