import {
    FlatList,
    SafeAreaView,
    View,
    StyleSheet,
    TouchableOpacity,
    Text,
    Pressable, TouchableHighlight
} from "react-native";
import {useState} from "react";
import ModalWrapper from "@/app/modals/ModalWrapper";
import FamilyMember from "@/app/components/FamilyMember";
import {SafeAreaProvider} from "react-native-safe-area-context";
import AntDesign from '@expo/vector-icons/AntDesign';
import DeleteFamilyMember from "@/app/components/DeleteFamilyMember";

type familyMemberProps = {
    id: string;
    name: string;
}

type ItemData = {
    id: string;
    name: string;
};

type ItemProps = {
    item: ItemData;
    onPress: () => void;
    backgroundColor: string;
    textColor: string;
};

const Item = ({item, onPress, backgroundColor, textColor}: ItemProps) => (
    <TouchableOpacity onPress={onPress} style={{backgroundColor, flex: 6}}>
        <Text style={[styles.title, {color: textColor}]}>{item.name}</Text>
    </TouchableOpacity>
);

export default function Index() {
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
        setIsShowAddFamilyMemberModal(false);
        setFamilyMembers([...familyMembers, {id: generateRandomId(10), name: newFamilyMember}]);
        setNewFamilyMember('');
    };

    const chooseFamilyMemberForDeleting = (item: familyMemberProps) => {
        setDeletingFamilyMember(item);
        setIsShowDeleteFamilyMemberModal(true);
    };

    const deleteFamilyMember = (item: familyMemberProps) => {
        setIsShowDeleteFamilyMemberModal(false);
        const index = familyMembers.findIndex(elem => elem.id === item?.id);
        if (index >= 0) {
            familyMembers.splice(index, 1);
        }
        console.log(familyMembers)
    };

    const renderItem = ({item}: {item: ItemData}) => {
        const backgroundColor = item.id === selectedId ? '#4371d6' : '#6B8FD4';
        const color = item.id === selectedId ? 'white' : 'black';

        return (
            <View style={[styles.item, {backgroundColor}]}>
                <Item
                    item={item}
                    onPress={() => setSelectedId(item.id)}
                    backgroundColor={backgroundColor}
                    textColor={color}
                />
                <TouchableHighlight onPress={() => chooseFamilyMemberForDeleting(item)} style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                    <View>
                        <AntDesign name="delete" size={24} color="white" />
                    </View>
                </TouchableHighlight>
            </View>
        );
    };

    return (
        <View
            style={{flex: 1, justifyContent: "center", alignItems: "center"}}
        >
            <Pressable onPress={() => setIsShowAddFamilyMemberModal(true)} style={styles.addFamilyMemberButton}>
                <Text>Добавить члена семьи</Text>
            </Pressable>
            <SafeAreaProvider style={styles.provider}>
                <SafeAreaView style={styles.container}>
                    <FlatList
                        className='w-full'
                        data={familyMembers}
                        renderItem={renderItem}
                        keyExtractor={item => item.id}
                    />
                </SafeAreaView>
            </SafeAreaProvider>
            <ModalWrapper isOpen={isShowAddFamilyMemberModal}>
                <View className='bg-white w-full p-4 rounded-xl'>
                    <FamilyMember newFamilyMember={newFamilyMember} setNewFamilyMember={setNewFamilyMember}/>
                    <View className='flex-row gap-x-2 w-full justify-end'>
                        <TouchableHighlight onPress={addFamilyMember} className='bg-primary' style={styles.dialogButton} disabled={!newFamilyMember}>
                            <View>
                                <Text style={styles.dialogButtonText}>Добавить</Text>
                            </View>
                        </TouchableHighlight>
                        <TouchableHighlight onPress={() => setIsShowAddFamilyMemberModal(false)} className='bg-closeBtn' style={styles.dialogButton}>
                            <View>
                                <Text style={styles.dialogButtonText}>Закрыть</Text>
                            </View>
                        </TouchableHighlight>
                    </View>
                </View>
            </ModalWrapper>
            <ModalWrapper isOpen={isShowDeleteFamilyMemberModal}>
                <View className='bg-white w-full p-4 rounded-xl'>
                    <DeleteFamilyMember name={deletingFamilyMember?.name} />
                    <View className='flex-row gap-x-2 w-full justify-end'>
                        <TouchableHighlight onPress={() => deleteFamilyMember(deletingFamilyMember)} className='bg-deleteBtn' style={styles.dialogButton}>
                            <View>
                                <Text style={styles.dialogButtonText}>Удалить</Text>
                            </View>
                        </TouchableHighlight>
                        <TouchableHighlight onPress={() => setIsShowDeleteFamilyMemberModal(false)} className='bg-closeBtn' style={styles.dialogButton}>
                            <View>
                                <Text style={styles.dialogButtonText}>Отменить</Text>
                            </View>
                        </TouchableHighlight>
                    </View>
                </View>
            </ModalWrapper>
        </View>
    );
}

const styles = StyleSheet.create({
    addFamilyMemberButton: {
        backgroundColor: '#4371d6',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
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