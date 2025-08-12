import {Text, TextInput, View, StyleSheet} from 'react-native';

type PROPS = {
    newFamilyMember: string;
    setNewFamilyMember: (param: string) => void;
}

const FamilyMember = ({newFamilyMember, setNewFamilyMember}: PROPS) => {

    return (
        <View>
            <Text>Введите имя члена семьи</Text>
            <TextInput
                style={styles.input}
                onChangeText={setNewFamilyMember}
                value={newFamilyMember}
                autoFocus
                placeholder="Например: Екатерина"
                placeholderTextColor="lightgrey"
            />
        </View>
    );
}

const styles = StyleSheet.create({
    input: {
        height: 40,
        borderWidth: 1,
        padding: 10,
        marginTop: 10,
        marginBottom: 10,
    },
});

export default FamilyMember;