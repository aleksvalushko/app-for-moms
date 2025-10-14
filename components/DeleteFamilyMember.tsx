import {StyleSheet, Text, View} from 'react-native';

type PROPS = {
    familyMemberName?: string;
}

const DeleteFamilyMember = ({familyMemberName = ''}: PROPS) => {
    return <View>
            <Text style={styles.container}>Вы действительно хотите удалить <Text style={styles.name}>{familyMemberName}</Text> из списка членов семьи?</Text>
        </View>;
}

export default DeleteFamilyMember;

const styles = StyleSheet.create({
    container: {
        fontSize: 16,
        marginBottom: 20
    },
    name: {
        fontWeight: 600
    },
});