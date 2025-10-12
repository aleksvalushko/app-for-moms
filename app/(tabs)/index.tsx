import {
    FlatList,
    View,
    StyleSheet,
    TouchableOpacity,
    Text,
    Pressable, TouchableHighlight
} from "react-native";
import React, {useState} from "react";
import ModalWrapper from "@/app/modals/ModalWrapper";
import FamilyMember from "@/components/FamilyMember";
import {SafeAreaView, SafeAreaProvider} from "react-native-safe-area-context";
import AntDesign from '@expo/vector-icons/AntDesign';
import DeleteFamilyMember from "@/components/DeleteFamilyMember";

type familyMemberProps = {
    id: string;
    name: string;
}

type ItemProps = {
    item: familyMemberProps;
    onPress: () => void;
    backgroundColor: string;
    textColor: string;
    chooseFamilyMemberForDeleting: (item: familyMemberProps) => void;
};

const Item = ({item, onPress, backgroundColor, textColor, chooseFamilyMemberForDeleting}: ItemProps) => (
    <View style={styles.item}>
        <TouchableOpacity onPress={onPress} style={{backgroundColor, flex: 6}}>
            <Text style={[styles.title, {color: textColor}]}>{item.name}</Text>
        </TouchableOpacity>
        <TouchableHighlight onPress={() => chooseFamilyMemberForDeleting(item)}
                            className='flex-1 justify-center items-center'>
            <View>
                <AntDesign name="edit" size={24} color="white"/>
            </View>
        </TouchableHighlight>
        <TouchableHighlight onPress={() => chooseFamilyMemberForDeleting(item)}
                            className='flex-1 justify-center items-center'>
            <View>
                <AntDesign name="delete" size={24} color="white"/>
            </View>
        </TouchableHighlight>
    </View>
);

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

        setFamilyMembers([...familyMembers, { id: generateRandomId(10), name: newFamilyMember }]);
        handleCloseModal();
    };

    const handleCloseModal = () => {
        setIsShowAddFamilyMemberModal(false);
        setNewFamilyMember('');
    };

    const chooseFamilyMemberForDeleting = (item: familyMemberProps) => {
        setIsShowDeleteFamilyMemberModal(true);
        setDeletingFamilyMember(item);
    };

    const deleteFamilyMember = (item: familyMemberProps) => {
        setIsShowDeleteFamilyMemberModal(false);
        setFamilyMembers(familyMembers.filter(member => member.id !== item.id));
    };

    const renderItem = ({item}: { item: familyMemberProps }) => {
        return (
            <Item
                item={item}
                onPress={() => setSelectedId(item.id)}
                backgroundColor='#6B8FD4'
                textColor='black'
                chooseFamilyMemberForDeleting={() => chooseFamilyMemberForDeleting(item)}
            />
        )
    };

    return (
        <SafeAreaView className='flex-1 justify-center items-center'>
            <Pressable onPress={() => setIsShowAddFamilyMemberModal(true)} style={styles.addFamilyMemberButton}>
                <Text className='text-white'>Добавить члена семьи</Text>
            </Pressable>
            <SafeAreaProvider style={styles.provider}>
                <SafeAreaView style={styles.container}>
                    <FlatList
                        className='w-full'
                        data={familyMembers}
                        renderItem={renderItem}
                        keyExtractor={item => item.id}
                        extraData={selectedId}
                    />
                </SafeAreaView>
            </SafeAreaProvider>
            <ModalWrapper isOpen={isShowAddFamilyMemberModal}>
                <View className='bg-white w-full p-4 rounded-xl'>
                    <FamilyMember newFamilyMember={newFamilyMember} setNewFamilyMember={setNewFamilyMember}/>
                    <View className='flex-row gap-x-2 w-full justify-end'>
                        <TouchableHighlight onPress={addFamilyMember} className='bg-primary'
                                            style={styles.dialogButton} disabled={!newFamilyMember}>
                            <View>
                                <Text style={styles.dialogButtonText}>Добавить</Text>
                            </View>
                        </TouchableHighlight>
                        <TouchableHighlight onPress={handleCloseModal} className='bg-closeBtn'
                                            style={styles.dialogButton}>
                            <View>
                                <Text style={styles.dialogButtonText}>Закрыть</Text>
                            </View>
                        </TouchableHighlight>
                    </View>
                </View>
            </ModalWrapper>
            <ModalWrapper isOpen={isShowDeleteFamilyMemberModal}>
                <View className='bg-white w-full p-4 rounded-xl'>
                    <DeleteFamilyMember name={deletingFamilyMember?.name}/>
                    <View className='flex-row gap-x-2 w-full justify-end'>
                        <TouchableHighlight onPress={() => deleteFamilyMember(deletingFamilyMember)}
                                            className='bg-deleteBtn' style={styles.dialogButton}>
                            <View>
                                <Text style={styles.dialogButtonText}>Удалить</Text>
                            </View>
                        </TouchableHighlight>
                        <TouchableHighlight onPress={() => setIsShowDeleteFamilyMemberModal(false)}
                                            className='bg-closeBtn' style={styles.dialogButton}>
                            <View>
                                <Text style={styles.dialogButtonText}>Отменить</Text>
                            </View>
                        </TouchableHighlight>
                    </View>
                </View>
            </ModalWrapper>
        </SafeAreaView>
    );
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