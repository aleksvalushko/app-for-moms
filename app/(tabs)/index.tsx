import {
    FlatList,
    View,
    StyleSheet,
    TouchableOpacity,
    Pressable
} from "react-native";
import React, {useState} from "react";
import ModalWrapper from "@/app/modals/ModalWrapper";
import FamilyMember from "@/components/FamilyMember";
import {SafeAreaView, SafeAreaProvider} from "react-native-safe-area-context";
import DeleteFamilyMember from "@/components/DeleteFamilyMember";
import CustomTouchableHighlight from "@/components/Buttons/CustomTouchableHighlight";
import CustomIconTouchableHighlight from "@/components/Buttons/CustomIconTouchableHighlight";
import CustomText from "@/components/CustomText";

type familyMemberProps = {
    id: string;
    name: string;
}

type ItemProps = {
    item: familyMemberProps;
    backgroundColor: string;
    textColor: string;
};

export const Index = () => {
    const [isShowAddFamilyMemberModal, setIsShowAddFamilyMemberModal] = useState<boolean>(false);
    const [isShowDeleteFamilyMemberModal, setIsShowDeleteFamilyMemberModal] = useState<boolean>(false);
    const [deletingFamilyMember, setDeletingFamilyMember] = useState<familyMemberProps>({id: '', name: ''});
    const [familyMembers, setFamilyMembers] = useState<familyMemberProps[]>([]);
    const [newFamilyMember, setNewFamilyMember] = useState('');
    const [selectedId, setSelectedId] = useState<string>();

    const generateRandomId = (length = 6) => {
        return Math.random().toString(36).substring(2, length + 2);
    }

    const addFamilyMember = () => {
        if (!newFamilyMember) return;

        setFamilyMembers([...familyMembers, {id: generateRandomId(10), name: newFamilyMember}]);
        handleCloseModal();
    };

    const handleCloseModal = () => {
        setIsShowAddFamilyMemberModal(false);
        setNewFamilyMember('');
    };

    const chooseFamilyMemberForDeleting = (item: familyMemberProps) => {
        setDeletingFamilyMember(item);
        setIsShowDeleteFamilyMemberModal(true);
    };

    const deleteFamilyMember = (item: familyMemberProps) => {
        setIsShowDeleteFamilyMemberModal(false);
        setFamilyMembers(familyMembers.filter(member => member.id !== item.id));
    };


    const Item = ({item, backgroundColor, textColor}: ItemProps) => (
        <View style={styles.item}>
            <TouchableOpacity onPress={() => setSelectedId(item.id)} style={{backgroundColor, flex: 6}}>
                <CustomText style={[styles.title, {color: textColor}]}>
                    {item.name}
                </CustomText>
            </TouchableOpacity>
            <CustomIconTouchableHighlight name='edit' className='flex-1 justify-center items-center'
                                          pressFunction={() => setIsShowAddFamilyMemberModal(true)}/>
            <CustomIconTouchableHighlight name='delete' className='flex-1 justify-center items-center'
                                          pressFunction={() => chooseFamilyMemberForDeleting(item)}/>
        </View>
    );

    const RenderItem = ({item}: familyMemberProps) => {
        return (
            <Item
                item={item}
                backgroundColor='#6B8FD4'
                textColor='black'
            />
        )
    };

    return <SafeAreaView className='flex-1 justify-center items-center'>
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
                <FamilyMember newFamilyMember={newFamilyMember} setNewFamilyMember={setNewFamilyMember}/>
                <View className='flex-row gap-x-2 w-full justify-end'>
                    <CustomTouchableHighlight name='Добавить' className='bg-primary' disabled={!newFamilyMember}
                                              pressFunction={addFamilyMember}/>
                    <CustomTouchableHighlight name='Закрыть' className='bg-closeBtn'
                                              pressFunction={handleCloseModal}/>
                </View>
            </View>
        </ModalWrapper>
        <ModalWrapper isOpen={isShowDeleteFamilyMemberModal}>
            <View className='bg-white w-full p-4 rounded-xl'>
                <DeleteFamilyMember familyMemberName={deletingFamilyMember?.name ?? ''}/>
                <View className='flex-row gap-x-2 w-full justify-end'>
                    <CustomTouchableHighlight name='Удалить' className='bg-deleteBtn'
                                              pressFunction={() => deleteFamilyMember(deletingFamilyMember)}/>
                    <CustomTouchableHighlight name='Отменить' className='bg-closeBtn'
                                              pressFunction={() => setIsShowDeleteFamilyMemberModal(false)}/>
                </View>
            </View>
        </ModalWrapper>
    </SafeAreaView>
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
        // position: 'absolute',
        paddingHorizontal: 20,
        paddingVertical: 5,
        marginTop: 10,
        // bottom: 110,
        // right: 10
    },
    provider: {
        width: '100%',
        columnGap: 10,
    },
    container: {
        flex: 1,
        marginBottom: 10
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